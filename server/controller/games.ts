import GameList from "../models/GameList";
import GameMatch from "../models/GameMatch";
import {
  errorResponse,
  generateAccountId15Digit,
  makeNotif,
  mobilePH,
  successResponse,
} from "../utils/logic";
import { Op, FindOptions, Sequelize } from "sequelize";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Wallet from "../models/Wallet";
import stasherAPI from "../api/stasher";
import app from "../app";
import { readFile, writeFile } from "fs/promises";
import {
  ALL,
  DEPOSIT,
  FAILED,
  GAME,
  INITIAL,
  PENDING,
  SUCCESS,
  WITHDRAW,
} from "../constants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import config from "../config/config";
import Cards from "../models/Cards";
const environment = process.env.NODE_ENV || "development";
const BASE_URL = config[environment].base_url;
const BE_BASE_URL = `${BASE_URL}/api/v1`;

interface TransactionsModelAttributes {
  id: number;
  wallet_id: number;
  game_id: number;
  amount: number;
  type: string;
  status: string;
  callbackId: string;
  updatedAt: Date;
  createdAt: Date;
}

type TransactionsAttributes = keyof TransactionsModelAttributes;

const openGameMatch = async (request: any, reply: any) => {
  const game = request.body.game;
  const gameModel = await GameList.findOne({
    attributes: ["id", "name"],
    where: { name: game },
  });
  const { id: gameId } = gameModel;

  const gameMatchModel = GameMatch.create({
    gameId: gameId,
    status: "open",
  });

  return successResponse(
    gameMatchModel,
    "A game match has been created!",
    reply
  );
};

const getGames = async (request: any, reply: any) => {
  interface GamesModelAttributes {
    id: number;
    name: string;
    label: string;
    updatedAt: Date;
    createdAt: Date;
  }

  const options: FindOptions = {
    //  @ts-ignore
    attributes: ["id", "label", "name"] as GamesModelAttributes[],
  };
  const gamesList = await GameList.findAll(options);
  const totalCount = await GameList.count(options);
  const payload = {
    content: gamesList,
    totalCount,
  };

  if (gamesList) {
    return successResponse(
      payload,
      "Get All Games is successfully fetched!",
      reply
    );
  } else {
    return errorResponse("Games not found", reply, "custom");
  }
};

const gameMatch = async (request: any, reply: any) => {
  const gameMatchModel = await GameMatch.findOne({
    attributes: ["id", "status"],
    order: [["id", "DESC"]],
    include: [
      {
        model: GameList,
        attributes: ["id", "name"],
      },
    ],
  });

  return successResponse(
    gameMatchModel,
    "Game match has been successfully fetch!",
    reply
  );
};

const addGameDeposit = async (request, reply) => {
  const authid = request.user.id;
  const { credit, creditType, accountNumber } = request.body;
  // return successResponse({credit, creditType, accountNumber}, "Sending Deposit PAYMAYA", reply);
  if (creditType === "GCASH") {
    const isApiAvailable = await stasherAPI.checkApiAvailability();
    const token = request.token;

    const user = await User.findOne({
      attributes: [
        "id",
        "uuid",
        "accountId",
        "mobile",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "playerName",
        ],
      ],
      include: [
        {
          model: Wallet,
          attributes: ["id", "balance"],
        },
      ],
      where: { id: authid },
    });

    const existingTransaction = await Transaction.findOne({
      attributes: ["id"],
      order: [["id", "DESC"]],
      where: { wallet_id: user.id, status: "INITIAL", type: "deposit" },
    });

    if (!isApiAvailable) {
      const msgErr = "Transaction Failed";
      return errorResponse(msgErr, reply, "custom");
    }

    const playerName = user.get("playerName");

    try {
      let transactionId = 0;
      if (!existingTransaction) {
        const transaction = await Transaction.create({
          //  @ts-ignore
          wallet_id: user.Wallet.id,
          amount: credit,
          type: "deposit",
          status: "INITIAL",
          callbackId: "",
        });
        const { id } = transaction;
        transactionId = id;
      } else {
        transactionId = existingTransaction.id;
        await Transaction.update(
          { amount: credit },
          {
            where: { id: transactionId },
          }
        );
      }

      const cards = await Cards.findOne({
        attributes: ["accountId"],
        where: { userId:user.id  },
      });
      const mobileTrim = mobilePH(accountNumber);

      const payload = {
        accountId: cards.accountId,
        amount: credit,
        fee:0,
        accountName: playerName,
        accountNumber:mobileTrim,
        clientTransactionId: `${transactionId}`,
        clientNotes: token,
        callbackUrl: `${BE_BASE_URL}/games/transactions/callback`,
      };
      
      const depositStasherAccount = await stasherAPI.depositStasherAccount(
        request,
        payload
      );

      await makeNotif(
        authid,
        `Deposit Request Successful!`,
        `You have successfully deposited an amount of ${credit} PHP from your GCash account number ${accountNumber} to your Karera Live wallet.\n This transaction has been completed successfully, and the funds should be added to your Karera Live wallet shortly.`,
        "kyc",
        "info",
        user.uuid
      );

      return successResponse(
        { ...depositStasherAccount },
        "Sending Deposit",
        reply
      );
    } catch (err) {
      return errorResponse(`Error Sending Deposit: ${err}`, reply, "custom");
    }
  } else if (creditType === "PAYMAYA") {
    return successResponse({}, "Sending Deposit PAYMAYA", reply);
  }
};

const addGameWithdrawtest = async (request, reply) => {
  const { credit, creditType, accountNumber, accountId } = request.body;
  const payload = { credit, creditType, accountNumber, accountId }
  return successResponse(
    { ...payload },
    "Sending Withdrawal",
    reply
  );
}

const addGameWithdraw = async (request, reply) => {
  const authid = request.user.id;
  const { credit, creditType, accountNumber, accountId } = request.body;
  if (creditType === "GCASH") {
    const isApiAvailable = await stasherAPI.checkApiAvailability();
    const token = request.token;

    const user = await User.findOne({
      attributes: [
        "id",
        "uuid",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          "playerName",
        ],
      ],
      include: [
        {
          model: Wallet,
          attributes: ["id", "balance"],
        },
      ],
      where: { id: authid },
    });

    const existingTransaction = await Transaction.findOne({
      attributes: ["id"],
      order: [["id", "DESC"]],
      where: { wallet_id: user.id, status: "INITIAL", type: "withdraw" },
    });

    if (!isApiAvailable) {
      const msgErr = "Transaction Failed";
      return errorResponse(msgErr, reply, "custom");
    }

    // let phoneNumber = user.mobile.replace(/^\+63/, "");
    // Check if the number starts with zero
    // if (!phoneNumber.startsWith("0")) {
    //   phoneNumber = "0" + phoneNumber; // Add zero at the beginning if it's missing
    // }

    const playerName = user.get("playerName");

    try {
      let transactionId = 0;
      if (!existingTransaction) {
        const transaction = await Transaction.create({
          //  @ts-ignore
          wallet_id: user.Wallet.id,
          amount: credit,
          type: "withdrawal",
          status: "INITIAL",
          callbackId: "",
        });
        const { id } = transaction;
        transactionId = id;
      } else {
        transactionId = existingTransaction.id;
        await Transaction.update(
          { amount: credit },
          {
            where: { id: transactionId },
          }
        );
      }

      const payload = {
        accountId,
        amount: credit,
        accountName: playerName,
        accountNumber,
        clientTransactionId: `${transactionId}`,
        clientNotes: token,
        callbackUrl: `${BE_BASE_URL}/games/transactions/callback`,
      };

      const withdrawStasherAccount = await stasherAPI.withdrawStasherAccount(
        request,
        payload
      );

      await makeNotif(
        authid,
        `Withdrawal Request Successful!`,
        `You have successfully withdrawn ${credit} PHP from your Karera Live wallet and initiated a transfer to your GCash account number ${accountNumber}.\n This transaction has been completed successfully, and the funds should be available in your GCash account shortly.`,
        "kyc",
        "info",
        user.uuid
      );

      return successResponse(
        { ...withdrawStasherAccount },
        "Sending Withdrawal",
        reply
      );
    } catch (err) {
      return errorResponse(`Error Sending Withdrawal: ${err}`, reply, "custom");
    }
  } else if (creditType === "PAYMAYA") {
    return errorResponse(`Paymaya is not yet available`, reply, "custom");
  }
};

const getGameTransactionsForStasher = async (request, reply) => {
  const authid = request.user.id;
  const { page, size } = request.query;

  const isApiAvailable = await stasherAPI.checkApiAvailability();

  if (!isApiAvailable) {
    const msgErr = "Get All Transaction Failed";
    return errorResponse(msgErr, reply, "custom");
  }

  const user = await User.findOne({
    attributes: ["accountId"],
    where: { id: authid },
  });

  const { accountId } = user;
  const filter = {
    id: accountId,
    page,
    limit: size,
  };
  try {
    const data = await stasherAPI.getTransactionsStasherAccount(
      request,
      filter
    );

    return successResponse(
      { ...data },
      "Game Transactions successfully fetch",
      reply
    );
  } catch (err) {
    return errorResponse(
      `Error on fetching Game Transactions: ${err}`,
      reply,
      "custom"
    );
  }
};

const getGameTransactions = async (request, reply) => {
  const id = request.user.id;
  //   const userRole = request.userRole;

  const { page, size, sort, filter, status } = request.query;

  const [columnName, direction] = sort && sort.split(",");
  const order = [[columnName, direction.toUpperCase()]] as [
    TransactionsAttributes,
    string
  ][];

  const whereConditions = {};
  const whereWalletConditions = {};

  if (filter) {
    // Split the filter string by '&' to get individual filter conditions
    const filterConditions = filter.split("&");

    filterConditions.forEach((condition) => {
      const [columnFilter, valueFilter] = condition.split("=");
      const decodedValue = decodeURIComponent(valueFilter);

      if (columnFilter === "type") {
        if (decodedValue === GAME) {
          whereConditions[columnFilter] = {
            [Op.or]: [{ [Op.eq]: "bet" }, { [Op.eq]: "wonprize" }],
          };
        } else if (decodedValue === DEPOSIT) {
          whereConditions[columnFilter] = { [Op.eq]: `deposit` };
        } else if (decodedValue === WITHDRAW) {
          whereConditions[columnFilter] = { [Op.eq]: `withdrawal` };
        }
      } else if (columnFilter === "status") {
        if (decodedValue === SUCCESS) {
          const bigCaps = decodedValue.toUpperCase();
          whereConditions[columnFilter] = { [Op.like]: `%${bigCaps}%` };
        } else if (decodedValue === PENDING) {
          const bigCaps = INITIAL.toUpperCase();
          whereConditions[columnFilter] = { [Op.like]: `%${bigCaps}%` };
        } else if (decodedValue === FAILED) {
          const bigCaps = decodedValue.toUpperCase();
          whereConditions[columnFilter] = { [Op.like]: `%${bigCaps}%` };
        }
      } else if (columnFilter === "filterRangeDate") {
        const [startDate, endDate] = decodedValue.split(",");
        const startDateTime = `${startDate} 00:00:00`;
        const endDateDateTime = `${endDate} 23:59:59`;
        whereConditions["createdAt"] = {
          [Op.between]: [startDateTime, endDateDateTime],
        };
      } else if (columnFilter === "last30days") {
        if (decodedValue === "1") {
          const startDate = dayjs()
            .subtract(30, "day")
            .startOf("day")
            .format("YYYY-MM-DD");

          const endDate = dayjs().format("YYYY-MM-DD");

          const startDateTime = `${startDate} 00:00:00`;
          const endDateDateTime = `${endDate} 23:59:59`;

          whereConditions["createdAt"] = {
            [Op.between]: [startDateTime, endDateDateTime],
          };
        }
      } else if (columnFilter === "last7days") {
        if (decodedValue === "1") {
          const startDate = dayjs()
            .subtract(7, "day")
            .startOf("day")
            .format("YYYY-MM-DD");

          const endDate = dayjs().format("YYYY-MM-DD");

          const startDateTime = `${startDate} 00:00:00`;
          const endDateDateTime = `${endDate} 23:59:59`;

          whereConditions["createdAt"] = {
            [Op.between]: [startDateTime, endDateDateTime],
          };
        }
      } else {
        whereConditions[columnFilter] = { [Op.like]: `%${decodedValue}%` };
      }
    });
  }

  //  @ts-ignore
  whereWalletConditions["user_id"] = id;
  const newPage = page === 1 ? 0 : page > 1 ? page - 1 : page;
  const offset = newPage * size;
  const options: FindOptions = {
    //  @ts-ignore
    attributes: [
      "id",
      "wallet_id",
      "game_id",
      "amount",
      "type",
      "status",
      "callbackId",
      "createdAt",
      "updatedAt",
    ] as TransactionsAttributes[],
    include: [
      {
        model: Wallet,
        attributes: ["user_id"],
        where: whereWalletConditions,
      },
    ],
    where: whereConditions,
    offset,
    limit: size,
  };

  // Now you can safely check if "updatedAt" is a valid attribute
  if (
    columnName === "updatedAt" &&
    ("updatedAt" as keyof TransactionsModelAttributes)
  ) {
    order.push(["updatedAt", direction.toUpperCase()]);
    order.push(["createdAt", direction.toUpperCase()]); // Secondary sort by createdAt
  }

  options.order = order;
  const transactions = await Transaction.findAll(options);
  const totalCount = await Transaction.count(options);
  const payload = {
    content: transactions,
    totalCount,
  };

  if (transactions) {
    return successResponse(
      payload,
      "Get All Transactions is successfully fetched!",
      reply
    );
  } else {
    return errorResponse("Transactions not found", reply, "custom");
  }
};

const getTransactionsCallback = async (request, reply) => {
  const requestBody = request.body;
  // writeFile("payment-callback-response.txt", JSON.stringify(requestBody));
  if (!requestBody) {
    reply.code(401).send({ message: "Invalid Access 1" });
  }

  const { id, clientTransactionId, status, amount, type, clientNotes } =
    requestBody;

  try {
    const decodedToken = app.jwt.verify(clientNotes);

    if (!decodedToken) {
      reply.code(401).send({ message: "Invalid token" });
    }

    const existingTransaction = await Transaction.findOne({
      attributes: ["wallet_id"],
      where: { id: clientTransactionId },
    });

    if (type === "DEPOSIT") {
      const { wallet_id } = existingTransaction;

      const userWallet = await Wallet.findOne({
        attributes: ["user_id", "balance"],
        where: { id: wallet_id },
      });

      const { user_id, balance } = userWallet;

      await Transaction.update(
        { status, callbackId: id },
        {
          where: { id: clientTransactionId },
        }
      );

      const finalBalance = Number(balance) + Number(amount);

      await Wallet.update(
        { balance: finalBalance },
        {
          where: { user_id },
        }
      );

      const user = await User.findOne({
        attributes: ["uuid"],
        where: { id: user_id },
      });
      const { uuid } = user;

      await makeNotif(
        user_id,
        `Deposit Successfully Completed`,
        `Your deposit of ${Number(
          amount
        )} PHP was added to your account, the total balance of your wallet is now ${finalBalance} PHP`,
        "transactions",
        "info",
        uuid
      );
    } else {
      const { wallet_id } = existingTransaction;

      const userWallet = await Wallet.findOne({
        attributes: ["user_id", "balance"],
        where: { id: wallet_id },
      });
      const { user_id, balance } = userWallet;

      await Transaction.update(
        { status, callbackId: id },
        {
          where: { id: clientTransactionId },
        }
      );

      if (Number(balance) > Number(amount)) {
        const finalBalance = Number(balance) - Number(amount);

        await Wallet.update(
          { balance: finalBalance },
          {
            where: { user_id },
          }
        );

        const user = await User.findOne({
          attributes: ["uuid"],
          where: { id: user_id },
        });
        const { uuid } = user;

        await makeNotif(
          user_id,
          `Withdraw successfully completed`,
          `Your withdraw of ${Number(
            amount
          )} PHP was deducted to your account, the total balance of your wallet is now ${finalBalance} PHP`,
          "transactions",
          "info",
          uuid
        );
      }
    }
  } catch (err) {
    reply.code(401).send({ message: "Invalid Access" });
  }
};

export default {
  getGames,
  openGameMatch,
  gameMatch,
  addGameDeposit,
  addGameWithdraw,
  getGameTransactions,
  getTransactionsCallback,
};

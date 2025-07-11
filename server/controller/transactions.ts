import { successResponse, errorResponse } from "../utils/logic";
import Transaction from "../models/Transaction";
import { FindOptions, OrderItem, Sequelize, Op } from "sequelize";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Wallet from "../models/Wallet";
import { BET, DEPOSIT, WITHDRAW, WITHDRAWAL, WONPRIZE } from "../constants";
dayjs.extend(utc);

const getAllTransactions = async (request: any, reply: any) => {
  const { page, size, sort, filter } = request.query;

  const whereConditions = {};
  if (filter) {
    // Split the filter string by '&' to get individual filter conditions
    const filterConditions = filter.split("&");

    filterConditions.forEach((condition) => {
      const [columnFilter, valueFilter] = condition.split("=");
      const decodedValue = decodeURIComponent(valueFilter);

      if (columnFilter === "callbackId") {
        whereConditions["callbackId"] = { [Op.like]: `%${decodedValue}%` };
      } else if (columnFilter === "createdAt") {
        const [startDateTime, endDateTime] = decodedValue.split(",");
        whereConditions["createdAt"] = {
          [Op.between]: [startDateTime, endDateTime],
        };
      } else if (columnFilter === "type") {
        whereConditions["type"] = { [Op.eq]: decodedValue };
      } else if (columnFilter === "amount") {
        whereConditions["amount"] = { [Op.like]: `%${decodedValue}%` };
      } else if (columnFilter === "status") {
        whereConditions["status"] = { [Op.eq]: decodedValue };
      } else if (columnFilter === "playerName") {
        whereConditions[Op.or] = [
          Sequelize.literal(
            `CONCAT((SELECT firstName FROM users as Users WHERE Users.id = Wallet.user_id), ' ', (SELECT lastName FROM users as Users WHERE Users.id = Wallet.user_id)) LIKE '%${decodedValue}%'`
          ),
        ];
      } else if (columnFilter === "gameId") {
        whereConditions["game_id"] = { [Op.like]: decodedValue };
      }
    });
  }

  const offset = page * size;

  const options: FindOptions = {
    attributes: [
      ["id","transactionId"],
      "game_id",
      "amount",
      "type",
      "status",
      "callbackId",
      "createdAt",
      [
        Sequelize.literal(
          "CONCAT((SELECT firstName FROM users as Users WHERE Users.id = Wallet.user_id), ' ', (SELECT lastName FROM users as Users WHERE Users.id = Wallet.user_id))"
        ),
        "playerName",
      ],
    ],
    include: [
      {
        model: Wallet,
        attributes: ["user_id", "balance"],
      },
    ],
    where: whereConditions,
    offset,
    limit: size,
  };

  const order: OrderItem[] = [];

  if (sort) {
    // Split the filter string by '&' to get individual filter conditions
    const sortConditions = sort.split("&");

    sortConditions.forEach((condition) => {
      const [columnSort, valueFilter] = condition.split("=");
      if (columnSort === "createdAt") {
        order.push(["createdAt", valueFilter.toUpperCase()]);
      } else if (columnSort === "amount") {
        order.push(["amount", valueFilter.toUpperCase()]);
      } else if (columnSort === "playerName") {
        order.push(["playerName", valueFilter.toUpperCase()]);
      } else if (columnSort === "gameId") {
        order.push(["game_id", valueFilter.toUpperCase()]);
      }
    });
  }

  options.order = order;

  const transactions = await Transaction.findAll(options);
  const totalCount = await Transaction.count(options);

  let depositTotal:number = 0; let withdrawTotal = 0;  let betTotal = 0; let wonprize = 0;
  transactions.map(row => {
      // @ts-ignore
    let amount = parseFloat(row.amount).toFixed(2)
    if(row.type === DEPOSIT){
      // @ts-ignore
      depositTotal += amount
    }

    // @ts-ignore
    if(row.type === WITHDRAWAL){
      // @ts-ignore
      withdrawTotal += amount
    }

    // @ts-ignore
    if(row.type === WITHDRAWAL){
      // @ts-ignore
      withdrawTotal += amount
    }

    // @ts-ignore
    if(row.type === BET){
      // @ts-ignore
      betTotal += amount
    }
    
    // @ts-ignore
    if(row.type === WONPRIZE){
      // @ts-ignore
      wonprize += amount
    }
  })

    // @ts-ignore
  const overAllTotal = ((parseFloat(depositTotal).toFixed(2) - parseFloat(withdrawTotal).toFixed(2)) + (parseFloat(betTotal).toFixed(2) - parseFloat(wonprize).toFixed(2))) || 0

  const payload = {
    content: transactions,
    // @ts-ignore
    amountTotal:parseFloat(overAllTotal).toFixed(2),
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

export default { getAllTransactions };

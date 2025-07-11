import { successResponse, errorResponse } from "../utils/logic";

import ReferralCode from "../models/ReferralCode";
import Referral from "../models/Referral";
import User from "../models/User";
import { FindOptions, Op, Sequelize } from "sequelize";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const getAllReferrals = async (request: any, reply: any) => {
  const userId = request.user.id;
  const { page, size, sort, filter } = request.query;

  const whereConditions = {};
  const whereConditionsUser = {};
  whereConditions["inviterId"] = userId;

  if (filter) {
    // Split the filter string by '&' to get individual filter conditions
    const filterConditions = filter.split("&");

    filterConditions.forEach((condition) => {
      const [columnFilter, valueFilter] = condition.split("=");
      const decodedValue = decodeURIComponent(valueFilter);

      if (columnFilter === "role") {
        whereConditionsUser["role"] = { [Op.eq]: decodedValue };
      } else if (columnFilter === "fullName") {
        whereConditionsUser[Op.or] = [
          Sequelize.literal(
            `CONCAT(firstName, ' ', lastName) LIKE '%${decodedValue}%'`
          ),
        ];
      } else if (columnFilter === "mobile") {
        whereConditionsUser["mobile"] = { [Op.like]: `%${decodedValue}%` };
      } else if (columnFilter === "createdAt") {
        const [startDateTime, endDateTime] = decodedValue.split(",");
        console.log({ startDateTime, endDateTime });
        whereConditions["createdAt"] = {
          [Op.between]: [startDateTime, endDateTime],
        };
      }
    });
  }

  const offset = page * size;
  const models = { User, Referral };

  // Load associations
  // @ts-ignore
  User.associate && User.associate(models);
  // @ts-ignore
  Referral.associate && Referral.associate(models);
  // @ts-ignore
  ReferralCode.associate && ReferralCode.associate(models);

  let options: FindOptions = {};
  options = {
    attributes: [
      [
        Sequelize.literal(
          `(SELECT commission FROM users AS Users WHERE Users.id = Referral.inviterId)`
        ),
        "commission",
      ],
      "createdAt",
    ],
    include: [
      {
        model: User,
        attributes: [
          "id",
          "mobile",
          "role",
          [
            Sequelize.fn(
              "CONCAT",
              Sequelize.col("firstName"),
              " ",
              Sequelize.col("lastName")
            ),
            "fullName",
          ],
        ],
        where: whereConditionsUser,
      },
    ],
    where: whereConditions,
    offset,
    limit: size,
  };

  const referrals = await Referral.findAll(options);
  const totalCount = await Referral.count(options);

  const payload = {
    content: referrals,
    totalCount,
  };

  if (referrals) {
    return successResponse(
      payload,
      "Get All Referrals is successfully fetched!",
      reply
    );
  } else {
    return errorResponse("Referrals not found", reply, "custom");
  }
};

export default { getAllReferrals };

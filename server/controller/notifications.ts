import { successResponse, errorResponse } from "../utils/logic";
import Notification from "../models/Notification";
import User from "../models/User";
import { Op, FindOptions } from "sequelize";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { GAME } from "../constants";
dayjs.extend(utc);

interface NotificationsModelAttributes {
  id: number;
  functionality: string;
  message: string;
  module: string;
  reference: string;
  level: string;
  associatedId: number;
  associatedType: string;
  updatedAt: Date;
  createdAt: Date;
}

type NotificationsAttributes = keyof NotificationsModelAttributes;

const getNotifications = async (request: any, reply: any) => {
  const id = request.user.id;
  //   const userRole = request.userRole;

  const { page, size, sort, type, filter, status } = request.query;

  const [columnName, direction] = sort && sort.split(",");
  const order = [[columnName, direction.toUpperCase()]] as [
    NotificationsAttributes,
    string
  ][];

  const whereConditions = {};
  const whereUserConditions = {};

  if (filter) {
    // Split the filter string by '&' to get individual filter conditions
    const filterConditions = filter.split("&");

    filterConditions.forEach((condition) => {
      const [columnFilter, valueFilter] = condition.split("=");
      const decodedValue = decodeURIComponent(valueFilter);

      if (columnFilter === "createdAt") {
        const dateConditions = {
          createdAt: { [Op.substring]: decodedValue },
        };
        whereConditions[Op.or] = dateConditions;
        whereConditions[Op.or] = dateConditions;
      } else if (columnFilter === "updatedAt") {
        const dateConditions = {
          updatedAt: { [Op.substring]: decodedValue },
        };
        whereConditions[Op.or] = dateConditions;
      } else {
        whereConditions[columnFilter] = { [Op.like]: `%${decodedValue}%` };
      }
    });
  }

  //  @ts-ignore
  whereUserConditions["id"] = id;

  let newPage = 0;
  if (type === GAME) {
    newPage = page === 1 ? 0 : page > 1 ? page - 1 : page;
  } else {
    newPage = page * size;
  }
  const offset = newPage * size;

  const options: FindOptions = {
    //  @ts-ignore
    attributes: [
      "id",
      "title",
      "message",
      "type",
      "module",
      "reference",
      "isRead",
      "createdAt",
      "updatedAt",
    ] as NotificationsModelAttributes[],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["uuid"],
        where: whereUserConditions,
      },
    ],
    where: whereConditions,
    offset,
    limit: size,
  };

  // Now you can safely check if "updatedAt" is a valid attribute
  if (
    columnName === "updatedAt" &&
    ("updatedAt" as keyof NotificationsModelAttributes)
  ) {
    order.push(["updatedAt", direction.toUpperCase()]);
    order.push(["createdAt", direction.toUpperCase()]); // Secondary sort by createdAt
  }

  options.order = order;

  const notifications = await Notification.findAll(options);
  const totalCount = await Notification.count(options);
  const totalCountUnread = await Notification.count({
    include: [
      {
        model: User,
        as: "user",
        where: { id: id }, // Filter by userId in the User model
      },
    ],
    where: { isRead: false },
  });

  const payload = {
    content: notifications,
    totalCount,
    totalCountUnread,
  };

  if (notifications) {
    return successResponse(
      payload,
      "Get All Notification is successfully fetched!",
      reply
    );
  } else {
    return errorResponse("Notifications not found", reply, "custom");
  }
};

const getNotificationsCustom = async (request: any, reply: any) => {
  const id = request.user.id;

  const whereUserConditions = {};
  whereUserConditions["id"] = id;

  const options: FindOptions = {
    //  @ts-ignore
    attributes: [
      "id",
      "message",
      "type",
      "module",
      "reference",
      "isRead",
      "createdAt",
      "updatedAt",
    ] as NotificationsModelAttributes[],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["uuid"],
        where: { id }, // Filter by userId in the User model
      },
    ],
    limit: 5,
  };
  const order = [];
  order.push(["createdAt", "desc"]); // Secondary sort by createdAt
  options.order = order;

  const notifications = await Notification.findAll(options);

  const totalCount = await Notification.count({
    include: [
      {
        model: User,
        as: "user",
        where: { id: id }, // Filter by userId in the User model
      },
    ],
    where: { isRead: false },
  });

  const payload = {
    content: notifications,
    totalCount,
  };

  if (notifications) {
    return successResponse(
      payload,
      "Get All Notification Custom is successfully fetched!",
      reply
    );
  } else {
    return errorResponse("Notifications not found", reply, "custom");
  }
};

const readNotification = async (request: any, reply: any) => {
  const notificationId = request.params.id; // Get user ID from URL params
  const { isRead } = request.body;

  const [updatedRows] = await Notification.update(
    { isRead },
    { where: { id: notificationId } }
  );

  if (updatedRows) {
    return successResponse(isRead, "Notification is successfully read!", reply);
  } else {
    return errorResponse("Notifications failed to read", reply, "custom");
  }
};

export default { getNotifications, readNotification, getNotificationsCustom };

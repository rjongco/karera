import schema from "../schema/notifications";
import controllers from "../controller/notifications";

function notificationRoutes(fastify) {
  fastify.get("/notifications", {
    schema: schema.getNotifications,
    handler: controllers.getNotifications,
  });
  fastify.get("/notifications/custom", {
    schema: schema.getNotificationsCustom,
    handler: controllers.getNotificationsCustom,
  });
  fastify.put("/notifications/read/:id", {
    schema: schema.readNotification,
    handler: controllers.readNotification,
  });
}

export default notificationRoutes;

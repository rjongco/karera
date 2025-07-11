import schema from "../schema/user";
import controllers from "../controller/user";

function userRoutes(fastify) {
  fastify.post("/user/logout", {
    schema: schema.logoutUserSchema,
    handler: controllers.logoutUserController,
  });
  fastify.get("/users", {
    schema: schema.getAllUsers,
    handler: controllers.getAllUsers,
  });
  fastify.get("/users/for-options", {
    schema: schema.getAllUsersForOptions,
    handler: controllers.getAllUsersForOptions,
  });
  fastify.post("/users/register", {
    schema: schema.addUser,
    handler: controllers.addUser,
  });
  fastify.put("/users/update/:id", {
    schema: schema.updateUser,
    handler: controllers.updateUser,
  });
  fastify.post("/users/:id/upload-image/:type", {
    handler: controllers.uploadUserImage,
  });
  fastify.delete("/users/delete/:id", {
    schema: schema.deleteUser,
    handler: controllers.deleteUser,
  });
  fastify.delete("/users/restore/:id", {
    schema: schema.restoreUser,
    handler: controllers.restoreUser,
  });
  fastify.get("/user/profile", {
    schema: schema.getUserProfile,
    handler: controllers.getUserProfile,
  });
  fastify.put("/user/profile", {
    schema: schema.updateUserProfile,
    handler: controllers.updateUserProfile,
  });
  fastify.post("/user/generate/referral", {
    schema: schema.generateReferral,
    handler: controllers.generateReferral,
  });
  fastify.post("/user/kyc/finish", {
    schema: schema.kycFinish,
    handler: controllers.kycFinish,
  });
  fastify.delete("/user/remove/profile-picture", {
    handler: controllers.removeUserProfilePicture,
  });
  fastify.put("/users/verifier/actions/:id", {
    schema: schema.approveOrDeactiveVerifier,
    handler: controllers.approveOrDeactiveVerifier,
  });
  fastify.get("/users/check/:id", {
    schema: schema.checkUser,
    handler: controllers.checkUser,
  });
  fastify.post("/users/credit", {
    schema: schema.addCredit,
    handler: controllers.addCredit,
  });
  fastify.get("/user/payment/cards", {
    schema: schema.getPaymentCards,
    handler: controllers.getPaymentCards,
  });
  fastify.post("/user/payment/card", {
    schema: schema.addPaymentCard,
    handler: controllers.addPaymentCard,
  });

  fastify.post("/user/payment/pincode", {
    schema: schema.authPincode,
    handler: controllers.authPincode,
  });
  /*
    All the transactions has to happen here
      So that security will just be concentrated here
      Transfer all the database change/transactions here
      As to make the plugin of payment gateway
  */

  // TODO: Create api to get balance
  fastify.get("/user/balance", {
    schema: schema.getBalance,
    handler: controllers.getBalance,
  });

  fastify.put("/user/balance", {
    schema: schema.addBalance,
    handler: controllers.addBalance,
  });
  fastify.post("/user/create/passcode", {
    schema: schema.createPasscode,
    handler: controllers.createPasscode,
  });

}

export default userRoutes;

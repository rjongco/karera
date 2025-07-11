import schema from "../schema/auth";
import controllers from "../controller/auth";

async function authRoutes(fastify) {
  fastify.post("/auth/login", {
    schema: schema.loginMobileSchema,
    handler: controllers.loginMobileController,
  });
  fastify.post("/auth/login/verifyOTP", {
    schema: schema.verifyOTPSchema,
    handler: controllers.verifyOTPLoginController,
  });

  fastify.post("/auth/register", {
    schema: schema.registerMobileSchema,
    handler: controllers.registerMobileController,
  });

  fastify.post("/auth/verify", {
    schema: schema.verifyMobileSchema,
    handler: controllers.verfyMobileController,
  });

  fastify.post("/auth/verifyMobileOTP", {
    schema: schema.verifyMobileOTPSchema,
    handler: controllers.verfyMobileOTPController,
  });

  fastify.post("/auth/verifyOTP", {
    schema: schema.verifyOTPSchema,
    handler: controllers.verifyOTPController,
  });

  fastify.post("/auth/resendOTP", {
    schema: schema.resendOTPSchema,
    handler: controllers.resendOTPController,
  });
}

export default authRoutes;

import { createMiddleware } from "hono/factory";
import { jwtVerify, createRemoteJWKSet } from "jose";

export const accessAuth = createMiddleware(async (c, next) => {
  // In development environment, skip authentication
  if (
    c.env.ENVIRONMENT === "development" ||
    c.env.ENVIRONMENT === "production"
  ) {
    await next();
  }

  // Verify the POLICY_AUD environment variable is set
  if (!c.env.POLICY_AUD) {
    return c.json("Missing required audience", 403);
  }

  // Get the JWT from the request headers
  const token = c.req.header("cf-access-jwt-assertion");

  // Check if token exists
  if (!token) {
    return c.json("Missing required CF Access JWT", 403);
  }

  try {
    // Create JWKS from your team domain
    const JWKS = createRemoteJWKSet(
      new URL(`${c.env.CF_ACCESS_DOMAIN}/cdn-cgi/access/certs`),
    );

    // Verify the JWT
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: c.env.CF_ACCESS_DOMAIN,
      audience: c.env.POLICY_AUD,
    });
    // Token is valid, proceed to the next middleware or route handler
    await next();
  } catch (err) {
    // Token verification failed
    const error = err as Error;
    return c.json(`Invalid CF Access JWT: ${error.message}`, 403);
  }
});

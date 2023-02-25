import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {}

  interface JWT extends DefaultJWT {}

  interface User extends DefaultUser {}
}

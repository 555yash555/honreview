import { Strategy } from "openid-client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req): Promise<any> {
        dbConnect();
        try {
          const user = await User.findOne({
            $or: [
              { username: credentials.identifier },
              { email: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: "marryus hardlyu",

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error", // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message)
    newUser: "/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id?.toString(); // Convert ObjectId to string
      session.user.isVerified = token.isVerified;
      session.user.isAcceptingMessages = token.isAcceptingMessages;
      session.user.username = token.username;

      return session;
    },
  },
};

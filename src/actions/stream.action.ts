"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("No API key");
  if (!apiSecret) throw new Error("No API secret");

  const client = new StreamClient(apiKey, apiSecret);

  // Generate the user token
  const token = client.generateUserToken({
    user_id: user.id,
    exp: Math.round(Date.now() / 1000) + 3600, // Token expires in 1 hour
    iat: Math.floor(Date.now() / 1000), // Issued at current timestamp
  });

  return token;
};

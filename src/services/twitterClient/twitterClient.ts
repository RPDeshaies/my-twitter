require("dotenv").config();

import TwitterApi from "twitter-api-v2";

const twitterClient = new TwitterApi({
  // Api Key
  appKey: process.env.TWITTER_API_KEY as any,
  // Api Secret
  appSecret: process.env.TWITTER_API_SECRET as any,
  // Access Token
  accessToken: process.env.TWITTER_ACCESS_TOKEN as any,
  // Access Token Secret
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as any,
});
export const twitter = twitterClient.readWrite;

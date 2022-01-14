import prompts from "prompts";
require("dotenv").config();

import TwitterApi from "twitter-api-v2";
import { Tweets } from "./domains/tweets/Tweets";

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
const twitter = twitterClient.readWrite;

(async () => {
  while (true) {
    const categories = Object.keys(Tweets).map((key) => ({
      title: key + " (" + Tweets[key].length + ")",
      value: key,
    }));
    const tweetCategoryResponse = await prompts({
      type: "select",
      name: "value",
      choices: categories,
      message: "Which category do you want to Tweet about?",
    });

    if (!tweetCategoryResponse.value) {
      return;
    }

    const tweets = Tweets[tweetCategoryResponse.value];
    const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];
    const tweetToSend = randomTweet.trim();
    console.log(
      `💭 Tweeting ${tweetToSend.length} characters: \n
---------
${tweetToSend}
---------
`
    );

    const confirmResponse = await prompts({
      type: "confirm",
      name: "value",
      message: "Are you ready to Tweet?",
    });

    if (confirmResponse.value) {
      try {
        const tweetResult = await twitter.v2.tweet(tweetToSend, {});

        console.log(
          `✅ Tweeted: https://twitter.com/RPDeshaies/status/${tweetResult.data.id}`
        );
      } catch (error) {
        console.log(`❌ Error: }`, { trimmedTweet: tweetToSend });
        console.error(error);
      }
    }
  }
})();

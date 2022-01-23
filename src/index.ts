import prompts from "prompts";
import { TweetDirectory } from "./domains/tweets/TweetDirectory";
import { twitter } from "./services/twitterClient/twitterClient";

(async () => {
  while (true) {
    // process.stdout.write("\x1Bc");
    const tweetDirectory = TweetDirectory.get();
    const categories = Object.keys(tweetDirectory).map((key) => ({
      title: key + " (" + tweetDirectory[key].length + ")",
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

    const tweets = tweetDirectory[tweetCategoryResponse.value];
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

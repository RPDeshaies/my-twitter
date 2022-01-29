import prompts from "prompts";
import { TweetDirectory } from "../tweet-directory/TweetDirectory";
import { twitter } from "../../services/twitterClient/twitterClient";

const tweetDirectory = TweetDirectory.get();

export const MyTwitter = {
  async promptCategories() {
    const categories = Object.keys(tweetDirectory).map((key) => ({
      title: key + " (" + tweetDirectory[key].length + ")",
      value: key,
    }));
    while (true) {
      const tweetCategoryResponse = await prompts({
        type: "select",
        name: "value",
        choices: categories,
        message: "Which category do you want to Tweet about?",
      });

      if (!tweetCategoryResponse.value) {
        break;
      }

      await tweetFromCategory(tweetCategoryResponse.value);
    }
  },
};

async function tweetFromCategory(category: string) {
  while (true) {
    process.stdout.write("\x1Bc");
    const tweets = tweetDirectory[category];
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
      type: "select",
      name: "value",
      message: "Are you ready to Tweet?",
      choices: [
        { title: "Another", value: "another" },
        { title: "Yes", value: "yes" },
        { title: "No", value: "no" },
      ],
    });

    if (confirmResponse.value === "no" || !confirmResponse.value) {
      return;
    }
    if (confirmResponse.value === "another") {
      continue;
    }
    if (confirmResponse.value === "yes") {
      try {
        const tweetResult = await twitter.v2.tweet(tweetToSend, {});

        console.log(
          `✅ Tweeted: https://twitter.com/RPDeshaies/status/${tweetResult.data.id}`
        );
      } catch (error) {
        console.log(`❌ Error: }`, { trimmedTweet: tweetToSend });
        console.error(error);
      }
      return;
    }
  }
}

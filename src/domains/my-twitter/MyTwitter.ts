import prompts from "prompts";
import { IFolders, TweetDirectory } from "../tweet-directory/TweetDirectory";
import { twitter } from "../../services/twitterClient/twitterClient";

export const MyTwitter = {
  async promptCategories() {
    const tweetDirectories = TweetDirectory.getAll({
      folder: "tweets",
    });

    const categories = Object.keys(tweetDirectories).map((key) => ({
      title: key + " (" + tweetDirectories[key].length + ")",
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

      await tweetFromCategory(tweetDirectories, tweetCategoryResponse.value);
    }
  },
  async sendRandomTweetEvery(props: { folder: IFolders; delay: number }) {
    const tweetDirectories = TweetDirectory.getAll({
      folder: props.folder,
    });
    console.log(
      `🕐 Sending tweet from ${props.folder} every ${
        props.delay / 60 / 60 / 1000
      } hours`
    );

    const allCategories = Object.keys(tweetDirectories);
    const allTweets = allCategories.reduce((acc, category) => {
      return [...acc, ...tweetDirectories[category]];
    }, [] as Array<string>);
    const allTweetsInRandomOrder = [...allTweets].sort(
      () => 0.5 - Math.random()
    );
    const tweetsToSend = [...allTweetsInRandomOrder];

    await doIt();

    setInterval(async () => {
      await doIt();
    }, props.delay);

    async function doIt() {
      if (tweetsToSend.length === 0) {
        tweetsToSend.push(...allTweetsInRandomOrder);
      }
      const randomTweet = allTweetsInRandomOrder.pop() as string;

      try {
        console.log(
          `💭 Tweeting: \n
---------
${randomTweet}
---------
  `
        );
        const tweetResult = await twitter.v2.tweet(randomTweet, {});

        console.log(
          `✅ Tweeted: https://twitter.com/RPDeshaies/status/${tweetResult.data.id}`
        );
      } catch (error) {
        console.log(`❌ Error: }`, { trimmedTweet: randomTweet });
        console.error(error);
      }
    }
  },
};

async function tweetFromCategory(
  tweetDirectories: Record<string, Array<string>>,
  category: string
) {
  while (true) {
    process.stdout.write("\x1Bc");
    const tweets = tweetDirectories[category];
    const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];
    console.log(
      `💭 Tweeting: \n
---------
${randomTweet}
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
        const tweetResult = await twitter.v2.tweet(randomTweet, {});

        console.log(
          `✅ Tweeted: https://twitter.com/RPDeshaies/status/${tweetResult.data.id}`
        );
      } catch (error) {
        console.log(`❌ Error: }`, { trimmedTweet: randomTweet });
        console.error(error);
      }
      return;
    }
  }
}

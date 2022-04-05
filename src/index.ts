import { MyTwitter } from "./domains/my-twitter/MyTwitter";
import { IFolders } from "./domains/tweet-directory/TweetDirectory";

(async () => {
  try {
    const args = process.argv.slice(2);

    if (args.includes("--interactive")) {
      await MyTwitter.promptCategories();
    } else {
      const folder: IFolders = args.includes("--focus") ? "focus" : "tweets";
      await MyTwitter.sendRandomTweetEvery({
        folder: folder,
        delay: 6.5 /* hours*/ * 60 * 60 * 1000,
        // delay: 24 /* hours*/ * 60 * 60 * 1000,
        // delay: 210 /* minutes */ * 60 * 1000,
      });
    }
  } catch (error) {
    console.error(error);
  }
})();

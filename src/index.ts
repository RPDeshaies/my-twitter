import { MyTwitter } from "./domains/my-twitter/MyTwitter";

(async () => {
  try {
    const args = process.argv.slice(2);

    if (args.includes("--interactive")) {
      await MyTwitter.promptCategories();
    } else {
      await MyTwitter.sendRandomTweetEvery(210 /* minutes */ * 60 * 1000);
    }
  } catch (error) {
    console.error(error);
  }
})();

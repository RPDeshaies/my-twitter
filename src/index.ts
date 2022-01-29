import { MyTwitter } from "./domains/my-twitter/MyTwitter";

(async () => {
  try {
    await MyTwitter.promptCategories();
  } catch (error) {
    console.error(error);
  }
})();

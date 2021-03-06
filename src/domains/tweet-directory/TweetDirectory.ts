import fs from "fs";
import path from "path";

export type IFolders = "tweets" | "focus";

export const TweetDirectory = {
  getAll(props: { folder: IFolders }) {
    const tweetsDirectory: Record<string, Array<string>> = {};
    const files = fs.readdirSync(
      path.join(__dirname, `../../../data/${props.folder}`)
    );

    files.forEach((file) => {
      const categoryName = file.split(".md")[0];

      const tweetsInCategory = fs
        .readFileSync(
          path.join(__dirname, "../../../data/tweets", file),
          "utf8"
        )
        .split("---")
        .map((tweet) => tweet.trim())
        .filter((tweet) => {
          if (tweet.length > 280) {
            throw {
              message: "Tweet is too long",
              length: tweet.length,
              tweet,
            };
          }
          return tweet.length > 0;
        });

      tweetsDirectory[categoryName] = tweetsInCategory;
    });
    return tweetsDirectory;
  },
};

import dotenv from "dotenv";
import twit from "twit";
import BungieNet from "bungienetplatformjs";
import Torch from "platform-torch";
import DatabaseManager from "./DatabaseManager.js";

dotenv.config();
const DATA_PATH = ".";
const DB_TABLE = "DestinyInventoryItemDefinition";
const LANG = "en";

function tweetInventory(items) {

  const twitter = new twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  twitter.post("statuses/update", {
    status: `Xûr is selling ${ items.join(", ") }`
  }, (err, data, resp) => {

    if(err) {
      console.log(`Twitter error: ${ err.message }`);
      return;
    }

    console.log("Success!");

  });

}

function onXur(resp) {

  if(resp.isError) {
    console.log("Xur is unavailable");
    return;
  }

  const hashes = resp.response.data.saleItemCategories[2].saleItems
    .map(si => si.item.itemHash);

  const promises = hashes.map(async h => {
    const item = await dbmngr.cd.getContent(DB_TABLE, h);
    return item.itemName;
  });

  Promise.all(promises).then(names => tweetInventory(names));

}

const platform = new BungieNet.Platform({ apiKey: process.env.BUNGIE_API_KEY });
const dbmngr = new DatabaseManager(platform, DATA_PATH, LANG);

dbmngr.init().then(() => {
  platform.getPublicXurVendor().then(onXur);
});

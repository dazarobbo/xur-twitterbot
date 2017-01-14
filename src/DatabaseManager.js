import fs from "fs";
import mv from "mv";
import path from "path";
import Torch from "platform-torch";

const DB_EXT = ".content";

export default class DatabaseManager {

  constructor(platform, dataDir, lang) {
    this._platform = platform;
    this._dataDir = dataDir;
    this._lang = lang;
    this._manifest = null;
    this.cd = null;
  }

  async init() {

    const r = await this._platform.getDestinyManifest();
    this._manifest = Torch.Manifest.fromResponse(r.response);

    try {
      await this.load();
    }
    catch(err) {
      await this.update();
      return;
    }

    if(this._manifest.worldContentHash(this._lang) !== this.cd.getHash()) {
      await this.update();
    }

  }

  async load() {
    const path = await this.getPath();
    this.cd = new Torch.Manifest.ContentDatabase(path);
  }

  getPath() {
    return new Promise((resolve, reject) => {

      fs.readdir(this._dataDir, (err, files) => {

        if(err) {
          return reject(err);
        }

        const matches = files.filter(f => f.endsWith(DB_EXT));

        if(matches.length > 0) {
          return resolve(path.join(this._dataDir, matches[0]));
        }

        return reject("no database found");

      });

    });
  }

  fetch() {
    return new Promise(async resolve => {
      const f = await this._manifest.downloadWorldContent(this._lang);
      const filename = path.basename(f);
      mv(f, path.join(this._dataDir, filename), { mkdirp: true }, err => resolve());
    });
  }

  async update() {

    try {
      this.cd.db.close();
      const path = await this.getPath();
      fs.unlinkSync(path);
    }
    catch(err) {}

    await this.fetch();
    await this.load();

  }

}

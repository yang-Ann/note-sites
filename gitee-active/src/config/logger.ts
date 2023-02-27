import { defineDirnameInfoConfig } from "../types/defineConfig.js";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const loggerDir = resolve(__dirname, "../logger");


if (!fs.existsSync(loggerDir)) {
  fs.mkdirSync(loggerDir);
}

// 文件地址
export default defineDirnameInfoConfig({
  loggerDir,
  imgErrDir: resolve(loggerDir, "./images"),
  errTrackPath: resolve(loggerDir, "errorStack.log"),
  operPath: resolve(loggerDir, "./operationalProcess.log"),
});
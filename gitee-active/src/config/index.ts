import { defineConfig } from "../types/defineConfig.js";

const envKey = "gitee_pwd";
const password = process.env[envKey];

if (!password) {
  console.error(`没有读取到环境变量 ${envKey} 的值`);
  process.exit(1);
}

export default defineConfig({
  user: "13725402770",
  password,
  loginUrl: "https://gitee.com/login",
  repositoryPagesUrl: "https://gitee.com/Ann-yang/note-sites/pages",
});
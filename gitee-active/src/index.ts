import * as fs from "node:fs";
import { sep } from "node:path";

import { chromium } from "@playwright/test";
import type { Browser, Page, BrowserContext } from "@playwright/test";

import config from "./config/index.js";
import loggerConfig from "./config/logger.js";
import { truncateLog, writeOperInfo, transformationTime } from "./util.js";

const { user, password, loginUrl, repositoryPagesUrl } = config;
const { errTrackPath, imgErrDir } = loggerConfig;

// https://playwright.dev/

let browser: Browser | null = null;
let page: Page | null = null;
let context: BrowserContext | null = null;

const descriptionSelect =
  "body > div.site-content > div.ui.container > div > div.pages_message > div > p.start-service-description";

(async () => {
  try {
    truncateLog();
    const startTime = Date.now();

    writeOperInfo("launch browser");
    browser = await chromium.launch({
      headless: true, // 无头模式
      slowMo: 300, // 操作延时
    });

    writeOperInfo("newContext");
    context = await browser.newContext();

    writeOperInfo("newPage");
    page = await context.newPage();

    writeOperInfo(`goto ${loginUrl}`);
    await page.goto(loginUrl);

    writeOperInfo(`fill ${user} into the "手机／邮箱／个人空间地址"`);
    await page.getByPlaceholder("手机／邮箱／个人空间地址").click();
    await page.getByPlaceholder("手机／邮箱／个人空间地址").fill(user);

    writeOperInfo(`fill ${"*".repeat(password.length)} into the "手机／邮箱／个人空间地址"`);
    await page.getByPlaceholder("请输入密码").click();
    await page.getByPlaceholder("请输入密码").fill(password);

    writeOperInfo(`click "登 录"`);
    await page.getByRole("button", { name: "登 录" }).click();

    writeOperInfo(`waitForTimeout 1000 ms`);
    await page.waitForTimeout(1000);

    writeOperInfo(`goto ${repositoryPagesUrl}`);
    await page.goto(repositoryPagesUrl);

    writeOperInfo(`click "服务"`);
    await page.getByText("服务", { exact: true }).click();

    writeOperInfo(`click "Logo en Gitee Pages"`);
    await page.getByRole("link", { name: "Logo en Gitee Pages" }).click();

    page.once("dialog", async dialog => {
      writeOperInfo(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(err => {
        console.log("dialog.accept error: ", err);
      });
    });

    writeOperInfo(`click "更新"`);
    await page.getByText("更新", { exact: true }).click();

    writeOperInfo(`waitForTimeout 1000`);
    await page.waitForTimeout(1000);

    writeOperInfo(`等待部署完成 -> ${descriptionSelect}`);
    await page.waitForSelector(descriptionSelect, {
      timeout: 1000 * 60 * 10 // 最长等待10分钟
    });

    writeOperInfo("已完成部署, 关闭浏览器");
    writeOperInfo(`用时: ${Date.now() - startTime}ms`);

    await browser.close();
    await context.close();
  } catch (error: unknown) {
    if (error instanceof Error) {
      writeOperInfo(`发生错误, 请查看 ${errTrackPath}`);
      // 报错图片路径
      const imgErrPath = `${imgErrDir + sep + Date.now()}.png`;
      // 记录错误栈信息
      const d = transformationTime();
      fs.writeFileSync(errTrackPath, `${d} >>> ${imgErrPath}\r\n${error.stack}`);
      // 保存网页为图片
      if (page) await page.screenshot({ path: imgErrPath });
    }
  }
})();

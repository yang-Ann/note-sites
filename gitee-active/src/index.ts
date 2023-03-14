import * as fs from "node:fs";
import { sep } from "node:path";

import { chromium } from "@playwright/test";
import type { Browser, Page, BrowserContext } from "@playwright/test";

import config from "./config/index.js";
import loggerConfig from "./config/logger.js";
import { writeOperInfo, transformationTime } from "./util.js";

const { user, password, loginUrl, repositoryPagesUrl } = config;
const { errTrackPath, imgErrDir, operPath } = loggerConfig;

// https://playwright.dev/

fs.truncateSync(operPath);

let browser: Browser | null = null;
let page: Page | null = null;
let context: BrowserContext | null = null;

const pageMessageUrl = "body > div.site-content > div.ui.container > div > div.pages_message > div > p > a";

(async () => {
  try {

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
    
    // await page.getByRole("link", { name: "An/note-sites" }).click();

    writeOperInfo(`waitForTimeout 1000 ms`);
    await page.waitForTimeout(1000);

    writeOperInfo(`goto ${repositoryPagesUrl}`);
    await page.goto(repositoryPagesUrl);

    writeOperInfo(`click "服务"`);
    await page.getByText("服务", { exact: true }).click();

    writeOperInfo(`click "Logo en Gitee Pages"`);
    await page.getByRole("link", { name: "Logo en Gitee Pages" }).click();

    page.once("dialog", dialog => {
      writeOperInfo(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    writeOperInfo(`click "更新"`);
    await page.getByText("更新", { exact: true }).click();

    writeOperInfo(`waitForTimeout 80000`);
    await page.waitForTimeout(80000);

    writeOperInfo(`等待部署完成 url 重新出现: ${pageMessageUrl}`);
    await page.waitForSelector(pageMessageUrl, { timeout: 30000 });

    writeOperInfo("已完成部署, 关闭浏览器");
    const numTime = Date.now() - startTime;
    writeOperInfo(`总用时: ${numTime.toFixed(2)}ms` + "\r\n".repeat(3));

    await browser.close();
    await context.close();

  } catch (error: unknown) {
    if (error instanceof Error) {  
      writeOperInfo(`发生错误, 请查看 ${errTrackPath}` + "\r\n".repeat(3));
      // 报错图片路径
      const imgErrPath = `${imgErrDir + sep + Date.now()}.png`;
      // 记录错误栈信息
      const d = transformationTime("YYYY-MM-DD hh:mm:ss");
      fs.writeFileSync(errTrackPath, `${d} >>> ${imgErrPath}\r\n${error.stack}${"\r\n".repeat(3)}`);
      
      // 保存网页为图片
      if (page) await page.screenshot({ path: imgErrPath });
    }
  }
})();
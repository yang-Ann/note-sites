import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

// 从文件中读取环境变量, https://github.com/motdotla/dotenv
// require("dotenv").config();

// https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  // 一个测试可以运行的最大时间
  timeout: 30 * 1000,
  expect: {
    // expect()等待条件满足的最大时间
    timeout: 5000
  },
  // 在文件中并行运行测试
  fullyParallel: true,
  // 如果您不小心离开了测试，则在CI上的构建失败。只在源代码中
  forbidOnly: !!process.env.CI,
  // 仅在CI上重试
  retries: process.env.CI ? 2 : 0,
  // 选择退出CI的并行测试
  workers: process.env.CI ? 1 : undefined,
  // 详细使用见 https://playwright.dev/docs/test-reporters
  reporter: "html",
  // 所有项目的共享配置 https://playwright.dev/docs/api/class-testoptions
  use: {
    // 每个操作, 如 `click()` 可以花费的最大时间, 默认为0(没有限制)
    actionTimeout: 0,
    // 在 await page.goto("/") 等操作中使用的基本URL
    // baseURL: "http://localhost:3000",

    // 在重试失败的测试时收集跟踪,见 https://playwright.dev/docs/trace-viewer
    trace: "on-first-retry"
  },

  // 为主要浏览器配置项目
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    // 针对移动视口进行测试
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"],
    //   },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: {
    //     ...devices["iPhone 12"],
    //   },
    // },

    // 针对品牌浏览器测试
    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     channel: "msedge",
    //   },
    // },
    // {
    //   name: "Google Chrome",
    //   use: {
    //     channel: "chrome",
    //   },
    // },
  ],

  // 用于测试工件的文件夹，例如截图、视频、跟踪等
  // outputDir: "test-results/",

  // 在开始测试之前运行本地开发服务器
  // webServer: {
  //   command: "npm run start",
  //   port: 3000,
  // },
};

export default config;

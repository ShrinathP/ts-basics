import { test as base, Browser, BrowserContext, Page } from "@playwright/test";
import {
  ChromiumFactory,
  FirefoxFactory,
  WebkitFactory
} from "./browserfactory.js";
import { BrowserFactory } from "./browserfactory.js";

// Separate fixture typings by scope to satisfy Playwright's generic signatures
type WorkerFixtures = {
  browserFactory: BrowserFactory;
  browser: Browser;
};

type TestFixtures = {
  context: BrowserContext;
  page: Page;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  // 1️⃣ Decide WHICH factory (runs once per worker)
  // WORKER SCOPED
  browserFactory: [
    async ({}, use) => {
      const name = process.env.BROWSER || "chromium";

      let factory: BrowserFactory;
      switch (name) {
        case "firefox":
          factory = new FirefoxFactory();
          break;
        case "webkit":
          factory = new WebkitFactory();
          break;
        default:
          factory = new ChromiumFactory();
      }

      await use(factory);
    },
    { scope: "worker" }
  ],

  // INBUILT BROWSER IS WORKER SCOPED
  // 2️⃣ Create browser using factory (worker-scoped like Playwright's built-in)
  browser: [
    async ({ browserFactory }, use) => {
      const browser = await browserFactory.createBrowser().launch();
      await use(browser);
      await browser.close();
    },
    { scope: "worker" }
  ],

  // TEST SCOPED
  // 3️⃣ Create context using factory
  context: async ({ browser, browserFactory }, use) => {
    const context = await browserFactory.createContext().create(browser);
    await use(context);
    await context.close();
  },

    
  // 4️⃣ Create page using factory
  page: async ({ context, browserFactory }, use) => {
    const page = await browserFactory.createPage().create(context);
    await use(page);
  }
});

export { expect } from "@playwright/test";

/*
1. Define Abstract Product Interfaces:  Create an interface or abstract class for each distinct type of product within a family. 
2. Create Concrete Product Classes: Implement the abstract product interfaces
3. Define Abstract Factory Interface: Main interface that declares the creation methods for all abstract products
4. Implement Concrete Factory Classes: Create concrete factory classes, one for each product variant family.
*/

// Step 1 - Abstract Product Interfaces
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";

export interface BrowserInstance {
  launch(): Promise<Browser>;
}

export interface ContextInstance {
  create(browser: Browser): Promise<BrowserContext>;
}

export interface PageInstance {
  create(context: BrowserContext): Promise<Page>;
}

// Step 3 - Abstract Factory - main interface that defines creation methods for all abstract products
export interface BrowserFactory {
  createBrowser(): BrowserInstance;
  createContext(): ContextInstance;
  createPage(): PageInstance;
}

// Step 2: Concrete Product classes
// Chromium Family
/* Browser */
class ChromiumBrowser implements BrowserInstance {
  async launch(): Promise<Browser> {
    return chromium.launch({
      headless: true,
      args: ["--disable-dev-shm-usage"]
    });
  }
}

/* Context */
class ChromiumContext implements ContextInstance {
  async create(browser: Browser): Promise<BrowserContext> {
    return browser.newContext({
      viewport: { width: 1440, height: 900 },
      permissions: ["clipboard-read", "clipboard-write"],
      recordVideo: { dir: "videos/chromium" },
      locale: "en-US"
    });
  }
}

/* Page */
class ChromiumPage implements PageInstance {
  async create(context: BrowserContext) {
    const page = await context.newPage();
    await page.addInitScript(() => {
      console.log("Chromium specific init");
    });
    return page;
  }
}

// Firefox Family (different behaviour)
import { firefox } from "@playwright/test";

/* Browser */
class FirefoxBrowser implements BrowserInstance {
  async launch() {
    return firefox.launch({
      headless: true,
      firefoxUserPrefs: {
        "intl.accept_languages": "en-US"
      }
    });
  }
}

/* Context */
class FirefoxContext implements ContextInstance {
  async create(browser: Browser) {
    return browser.newContext({
      viewport: { width: 1280, height: 800 },
      timezoneId: "UTC"
    });
  }
}

/* Page */
class FirefoxPage implements PageInstance {
  async create(context: BrowserContext) {
    const page = await context.newPage();
    page.setDefaultTimeout(60_000); // Firefox is slower
    return page;
  }
}


// Safari
import { webkit } from "@playwright/test";

/* Browser */
class WebkitBrowser implements BrowserInstance {
  async launch() {
    return webkit.launch();
  }
}

/* Context */
class WebkitContext implements ContextInstance {
  async create(browser: Browser) {
    return browser.newContext({
      viewport: { width: 375, height: 667 }, // iPhone-ish
      userAgent: "Mobile Safari"
    });
  }
}

/* Page */
class WebkitPage implements PageInstance {
  async create(context: BrowserContext) {
    const page = await context.newPage();
    await page.emulateMedia({ colorScheme: "light" });
    return page;
  }
}


// Step 4: Concrete Factories
export class ChromiumFactory implements BrowserFactory {
  createBrowser() { return new ChromiumBrowser(); }
  createContext() { return new ChromiumContext(); }
  createPage() { return new ChromiumPage(); }
}

export class FirefoxFactory implements BrowserFactory {
  createBrowser() { return new FirefoxBrowser(); }
  createContext() { return new FirefoxContext(); }
  createPage() { return new FirefoxPage(); }
}

export class WebkitFactory implements BrowserFactory {
  createBrowser() { return new WebkitBrowser(); }
  createContext() { return new WebkitContext(); }
  createPage() { return new WebkitPage(); }
}


// Client Code
export class TestEnvironment {
  private browser!: Browser;
  private context!: BrowserContext;
  private page!: Page;

  constructor(private factory: BrowserFactory) {}

  async setup() {
    this.browser = await this.factory.createBrowser().launch();
    this.context = await this.factory.createContext().create(this.browser);
    this.page = await this.factory.createPage().create(this.context);
  }

  getPage() {
    return this.page;
  }

  async teardown() {
    await this.browser.close();
  }
}

function getFactory(name: string): BrowserFactory {
  switch (name) {
    case "firefox": return new FirefoxFactory();
    case "webkit": return new WebkitFactory();
    default: return new ChromiumFactory();
  }
}



// Usage
async function runTest() {
  const factory = getFactory(process.env.BROWSER || "chromium");

  const env = new TestEnvironment(factory);
  await env.setup();

  const page = env.getPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });

  await env.teardown();
}

runTest();


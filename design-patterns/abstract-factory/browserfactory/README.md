## While overriding inbuilt browser - we need to retain scope
browser is worker scoped so we need to put scope:worker
Built-in browser is worker-scoped. When you override it, Playwright expects your browser fixture to also be worker-scoped.

Our custom browser fixture depends on browserFactory. If browserFactory stayed test-scoped while browser was worker-scoped (or vice versa), the types wouldn’t align and TS would complain about browserFactory not existing on the worker args.

Making both browserFactory and browser worker-scoped matches Playwright’s built-in browser scope and resolves the type error.


## Why did we split the fixtures then
TypeScript knows which fixtures live on which scope and stops complaining that a worker-scoped fixture (browserFactory) doesn’t exist on the test-scoped args. Without that split, all fixtures were assumed test-scoped, leading to the type error.

without the split at the error i get at browserfactory is - Type at position 1 in source is not compatible with type at position 1 in target.
        The types of 'scope' are incompatible between these types.
          Type '"worker"' is not assignable to type '"test"' this is the error i get
with one fixture like below i get the error - 

type WorkerFixtures = {
  browserFactory: BrowserFactory;
  browser: Browser,
  context: BrowserContext;
  page: Page;
};

// Mixins - used to add functionality to the classes which
// you may or may not control

// ## 1
// A function that returns a function
// A logger that returns a function
function myLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const logger = myLogFunction();
logger("your string");

// ## 2
// Functions creating a Class
function createLoggerClass() {
  return class MyLogfeClass {
    private completeLog: string = "";

    log(str: string) {
      console.log(str);
      this.completeLog += str + "\n";
    }

    dumpLog() {
      return this.completeLog;
    }
  };
}

const Mylogger = createLoggerClass();
const logger2 = new Mylogger();
logger2.log("Foo");
console.log(logger2.dumpLog());

// ## 3
// Functions creating a generic class
function CreateSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }

    get(id: string): T {
      return this.db[id];
    }

    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();
const sdb1 = new StringDatabase();
sdb1.set("a", "hello");

// ## 4
// Create Mixin - add new functionality
// Now i want to add a new functionality

type Constructor<Te> = new (...args: any[]) => Te;
function Dumpable<
  T extends Constructor<{
    getObject(): object;
  }>
>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpable(StringDatabase);
const sdb2 = new DumpableStringDatabase();
sdb2.set("jack", "hello jack");
sdb2.dump();

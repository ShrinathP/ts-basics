// Create a NoSQL style simple in memory database
// ## 1
// Class Implementing interface
interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

class InMemoryDatabase implements Database {
  // ## 2
  // private Record, setting and getting
  // private db: Record<string, string> = {};
  // protected Record to acces in child classes
  protected db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

const myDB = new InMemoryDatabase();
myDB.set("foo", "bar");

// myDB.db["foo"] = "baz"
// you can also set directly the db record value
// to avoid set member visibility, private, protected, public

console.log(myDB.get("foo"));


// ## 3 
// Persistable In memory Database
interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void
}

class PersistentMemoryDB extends InMemoryDatabase implements Persistable{
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB2 = new PersistentMemoryDB();
myDB2.set("foo", "bar");
console.log(myDB2.get("foo"));
console.log(myDB2.saveToString());

// restore from the JSON string
const saved  = myDB2.saveToString();
myDB2.set("foo", "db1 - bar");
console.log(myDB2.get("foo"));

// saved state can be restored here
const myDB3 = new PersistentMemoryDB();
myDB3.restoreFromString(saved);
console.log(myDB3.get("foo"));





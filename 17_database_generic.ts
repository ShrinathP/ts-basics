// Create a NoSQL style simple in memory database
// ## 1
// Class Implementing interface
interface DatabaseGeneric<T, K> {
  get(id:  K): T;
  set(id:  K, value: T): void;
}

type DBKeyType = string | number | symbol;
class InMemoryDatabaseGeneric<T, K extends DBKeyType> implements DatabaseGeneric<T, K> {
  // ## 2
  // private Record, setting and getting
  // private db: Record<string, string> = {};
  // protected Record to acces in child classes
  protected db: Record< K, T> = {} as Record<K, T>;

  get(id:  K): T {
    return this.db[id];
  }
  set(id:  K, value: T): void {
    this.db[id] = value;
  }
}


const myDBB = new InMemoryDatabaseGeneric<number, string>();
myDBB.set("foo", 4);

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

class PersistentMemoryDBGeneric<T, K extends DBKeyType> extends InMemoryDatabaseGeneric<T, K> implements Persistable{
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB2B = new PersistentMemoryDBGeneric<number, string>();
myDB2B.set("foo", 5);
console.log(myDB2B.get("foo"));
console.log(myDB2B.saveToString());

// restore from the JSON string
const savedd  = myDB2B.saveToString();
myDB2B.set("foo", 23);
console.log(myDB2.get("foo"));

// saved state can be restored here
const myDB3B = new PersistentMemoryDBGeneric<number, string>();
myDB3B.restoreFromString(savedd);
console.log(myDB3B.get("foo"));





class Doggy {
  //  ## 1
  // members in constructors
  // instead of
  // public name: string = ""
  // you can add public in constructor args
  constructor(public readonly name: string, public age: number) {

  }
  public readonly foo: number = 2
}

const lgg = new Doggy("LG", 13)
//  ## 2
// readonly member fields
// lgg.name = "Foo"; // to avoid renaming, you can add readonly
// 'public readonly name'
// can also do 
// 'public readonly foo: number = 2' in class
console.log(lgg.name);

// ## 3
// Singleton
// making constructor private and only 1 static instance which is accessible outside
class DogList {
  private doggies: Doggy[] = [];
  static instance: DogList = new DogList();

  private constructor() {}
  
  public addDog(dog: Doggy) {
    this.doggies.push(dog);
  }

  static addDog(dog: Doggy) {
    DogList.instance.doggies.push(dog)
  }

  getDogs() {
    return this.doggies;
  }
}


DogList.addDog(lgg);
console.log(DogList.instance.getDogs());


;
// const dl = new DogList(); // not allowed

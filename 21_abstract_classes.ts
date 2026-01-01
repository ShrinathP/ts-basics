abstract class StreetFighter {
  constructor() {}
  move() {}
  fight() {
    console.log(`${this.name} attacks with ${this.getSpecialAttack()}`);
  }

  // abstract method, doesnt have implementation
  abstract getSpecialAttack(): string;
  // abstract getter
  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return "Hadoken";
  }

  get name(): string {
    return "Ryu";
  }
}

class ChunLi extends StreetFighter {
  getSpecialAttack(): string {
    return "Lightning Kick";
  }

  get name(): string {
    return "Chun-Li";
  }
}

const ryu = new Ryu();
const chunLi = new ChunLi();
console.log(ryu.getSpecialAttack());

ryu.fight();
chunLi.fight();

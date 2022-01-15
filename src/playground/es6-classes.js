class Person {
  constructor(name = 'Anonymous', age = 20) {
    this.name = name;
    this.age = age;
  }
  getDeatils() {
    return `It's ${this.name} and I am ${this.age}.`
  }
  getGreeting() {
    return `Hi. I am ${this.name}`
  }
}

class Traveler extends Person {
  constructor(name, age, location) {
    super(name, age)
    this.location = location
  }
  getGreeting() {
    let desc = super.getDeatils()
    if(!!this.location)
      desc += ` I am visiting from ${this.location}.`
    return desc
  }
}

const me = new Traveler('Manas', 19, 'Khadagda')
console.log(me.getGreeting())

const other = new Traveler()
console.log(other.getGreeting())
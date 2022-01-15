const mutiplier =  {
    numbers: [1, 2 ,3],
    multiplyBy: 2,
    multiply() {
        return this.numbers.map((number) => number * this.multiplyBy);
    }
}
console.log("It's working");
console.log(mutiplier.multiply());
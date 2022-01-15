var object = {
    name: 'Manas',
    age: 19,
    location: 'Khadagda'
}

function getLoaction(location) {
    if(location)
        return <p>Location: {location}</p>;
}

var template = (
    <div>
        <p>Name: {object.name}</p>
        <p>Age: {object.age}</p>
        {getLoaction(object.location)}
    </div>
); // browser don't understand ES6(i.e. var template = <p>Hi there</p>), so we have write like in this format. Babel is used to compile ES6 into browser understable ES5.

let count = 0;

const addOne = () => {
    count++;
    renderCounterApp();
    console.log('One added');
}

const minusOne = () => {
    count--;
    renderCounterApp();
    console.log('One subtracted');
}

const reset = () => {
    count = 0;
    renderCounterApp();
    console.log('Reseted');
}


var appRoot = document.getElementById('app');

const renderCounterApp = () => {
    const template2 = (
        <div>
            <p>Count: {count}</p>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
    ReactDOM.render(template2, appRoot);
}

renderCounterApp();
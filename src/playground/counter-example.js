class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddOne = this.handleAddOne.bind(this)
    this.handleMinusOne = this.handleMinusOne.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.state = {
      count: props.count
    }
  }

  componentDidMount() {
    try {
      const storedCount = localStorage.getItem('count')
      const count = parseInt(storedCount, 10)
      if(!NaN(count)) {
        this.setState(() => ({ count }))
      }
    }
    catch(e) {
      console.log('error')
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.count != this.state.count) {
      const count = JSON.stringify(this.state.count)
      localStorage.setItem('count', count)
    }
  }

  handleAddOne() {
    this.setState((prevState) => {
      return {
        count: ++prevState.count
      }
    })
  }
  handleMinusOne() {
    this.setState((prevState) => {
      return {
        count: --prevState.count
      }
    })
  }
  handleReset() {
    this.setState(() => {
      return {
        count: 0
      }
    })
    this.setState((prevState) => {
      return {
        count: prevState.count + 100
      }
    })
    // this.setState({
    //   count: 0
    // })
    // this.setState({
    //   count: this.state.count + 1
    // })
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    )
  }
}

Counter.defaultProps = {
  count: 10
}

ReactDOM.render(<Counter count={0} />, document.getElementById('app'))
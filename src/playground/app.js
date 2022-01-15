class Indecision extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handlePick = this.handlePick.bind(this)
    this.handleAddOptions = this.handleAddOptions.bind(this)
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.state = {
      options: props.options
    }
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)
      if(options) {
        this.setState(() => ({ options }))
      }
    }
    catch(e) {
      console.log('error')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length != this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option
      })
    }))
  }
  handleAddOptions(option) {
    if (!option)
      return 'Enter valid value to add item!'
    else if (this.state.options.indexOf(option) > -1)
      return 'This option already exists'
    this.setState((prevState) => ({ options: prevState.options.concat(option)}))
  }
  handlePick() {
    alert(this.state.options[Math.floor(Math.random() * this.state.options.length)])
  }
  render() {
    const subtitle = 'Put your life in the hands of a computer'
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0} />
        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleDeleteOption={this.handleDeleteOption} />
        <AddOption handleAddOptions={this.handleAddOptions} />
      </div>
    )
  }
}

const Action = (props) => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions} >What should I do?</button>
    </div>
  )
}

const Option = (props) => {
  return (
    <div>
      {props.option}
      <button
        onClick={() => {
          props.handleDeleteOption(props.option)
        }}
      >
        Remove
      </button>
    </div>
  )
}

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions} >Remove all</button>
      {props.options.length == 0 && <p>Please add an option to get started</p>}
      {
        props.options.map((option) => 
          <Option 
            key={option} 
            option={option} 
            handleDeleteOption={props.handleDeleteOption
            }
          />)
      }
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  )
}

Header.defaultProps = {
  title: 'Default Title'
}

class AddOption extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddOptions = this.handleAddOptions.bind(this)
    this.state = {
      error: undefined
    }
  }
  handleAddOptions(e) {
    e.preventDefault();
    const name = e.target.elements.name.value.trim()
    const error = this.props.handleAddOptions(name)
    this.setState(() => ({ error }))  // we can also write -> return {error: error}
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOptions}>
          <label >Name: </label>
          <input type="text" name="name" id="name" />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<Indecision options={[]} />, document.getElementById('app'))
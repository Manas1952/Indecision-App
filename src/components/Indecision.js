import React from 'react'
import Header from './Header'
import Options from './Options'
import Action from './Action'
import AddOption from './AddOption'
import OptionModal from './OptionModal'

export default class Indecision extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)
      if (options) {
        this.setState(() => ({ options }))
      }
    }
    catch (e) {
      console.log('error')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length != this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }))
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option
      })
    }))
  }
  handleAddOptions = (option) => {
    if (!option)
      return 'Enter valid value to add item!'
    else if (this.state.options.indexOf(option) > -1)
      return 'This option already exists'
    this.setState((prevState) => ({ options: prevState.options.concat(option) }))
  }
  handlePick = () => {
    const randomOption = this.state.options[Math.floor(Math.random() * this.state.options.length)]
    this.setState(() => ({
      selectedOption: randomOption
    }))
  }
  handleModal = () => { // It means it clear the selectedOption so that modal disappear (see OptionModal.js)
    this.setState(() => ({ selectedOption: undefined }))
  }
  render() {
    const subtitle = 'Put your life in the hands of a computer'
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0} />
          <div className="widget">
            <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleDeleteOption={this.handleDeleteOption} />
            <AddOption handleAddOptions={this.handleAddOptions} />
          </div>
        </div>
        <OptionModal handleModal={this.handleModal} selectedOption={this.state.selectedOption} />
      </div>
    )
  }
}

Header.defaultProps = {
  title: 'Indecision'
}
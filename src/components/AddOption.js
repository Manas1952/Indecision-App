import React from 'react'

export default class AddOption extends React.Component {
  state = {
    error: undefined
  }
  handleAddOptions = (e) => {  // we don't need to do write constructor, as long as we write arrow function and writing 'handleAddOptions' as globally
    e.preventDefault();
    const name = e.target.elements.name.value.trim()
    const error = this.props.handleAddOptions(name)
    this.setState(() => ({ error }))  // we can also write -> return {error: error}
    if(!error) {
      e.target.elements.name.value = ''
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.handleAddOptions}>
          <input className="add-option__input" type="text" name="name" id="name" />
          <button className="button">Add Option</button>
        </form>
      </div>
    )
  }
}
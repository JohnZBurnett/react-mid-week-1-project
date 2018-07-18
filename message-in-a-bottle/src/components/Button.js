import React, { Component } from 'react'

class Button extends Component {

  render() {
    return (
      <div>
        <button value={this.props.value} onClick={this.props.onButtonClick}>{this.props.value}</button>
      </div>
    )
  }
}

export default Button

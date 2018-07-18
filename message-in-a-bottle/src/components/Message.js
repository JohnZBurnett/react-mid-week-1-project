import React, { Component } from 'react'
import Button from './Button.js'

class Message extends Component {

  render() {
    return (
      <div>
        <h1>
          {this.props.message}
        </h1>
        <h1>
          {this.props.subtitle}
        </h1>
        <Button value="like" onButtonClick={this.props.onButtonClick}/>
        <Button value="dislike" onButtonClick={this.props.onButtonClick}/>
      </div>
    )
  }
}

export default Message

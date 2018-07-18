import React, { Component } from 'react';

class EmailForm extends Component {
	constructor() {
		super();

		this.state = {
			emailValue: "",
			recipientValue: "",
		}
	}

	handleChange = (event) => {
		if (event.target.id === "recipient-name") {
			this.setState({
				recipientValue: event.target.value,
			})
		} else if (event.target.id === "email") {
			this.setState({
				emailValue: event.target.value,
			})
		}
	}

  render() {
  	return(
  		<div>
	  		<h1>Send an Email:</h1>
	  		<form onSubmit={(event) => this.props.onSubmit(event, this.state)}>
	  	  	  <input type="text" id="recipient-name" onChange={this.handleChange} value={this.state.recipientValue}/>
	  	  	  <input type="email" id="email" onChange={this.handleChange} value={this.state.emailValue}/>
	  	  	  <input type="submit" />
	  	  	</form>
  	  	</div>
  	)
  }

}

export default EmailForm
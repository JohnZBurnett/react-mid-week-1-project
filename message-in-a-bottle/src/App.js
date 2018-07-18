import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form.js';
import Message from './components/Message.js'
import EmailForm from './components/EmailForm.js' 

class App extends Component {
	constructor() {
		super();

		this.state = {
			submitted: false,
			message: "",
			subtitle: "",
			savedMessages: [],
		};
	}

  setSubmittedToTrue = (json) => {
  	console.log(json);
  	this.setState({
  		submitted: true,
  		message: json.message,
  		subtitle: json.subtitle,
  	});
  }

	handleButtonClick = (event) => {
		if(event.target.value === 'like') {
			let obj = {message: this.state.message, subtitle: this.state.subtitle}
			//updated so we dont mutate our state
			let updatedSavedMessages = this.state.savedMessages.slice()
			//push message, subtitle obj into updated
			updatedSavedMessages.push(obj)
			this.setState({
				savedMessages: updatedSavedMessages,
			})
		} else if(event.target.value === 'dislike') {
			this.setState({
				submitted: false,
				message: "",
				subtitle: "",
			})
		}
	}

  generateMessage = () => {
  	if (this.state.submitted) {
  		return(
  		 <Message message={this.state.message} subtitle={this.state.subtitle} onButtonClick={this.handleButtonClick}/>
  		)
  	} else {
  		return (
				<p>"Fill out the form!!!!"</p>
			)
  	}
  }

  handleSubmit = (event, formState) => {

  	const configObj = {
  		headers: {
  			"Accept":"application/json"
  		}
  	}
  	let valCopy = formState.selectValue.slice(0, formState.selectValue.length - 5)
  	console.log(valCopy);

  	let url = `http://localhost:5000${valCopy}${formState.value}`
  	event.preventDefault();
  	fetch(url, configObj).then( request => request.json()).then( json => this.setSubmittedToTrue(json))

  	console.log(this)
  }

  handleEmailSubmit = (event, formState) => {
  	event.preventDefault(); 
  	console.log("in handleEmailSubmit");
  }

	//show the saved messages underneath the form
	displaySavedMessages = () => (
		this.state.savedMessages.map((savedMessage) => (
			<li>Message: {savedMessage.message}{savedMessage.subtitle}</li>
			)
		)
	)

  render() {
    return (
      <div className="App">
      	<Form onSubmit={this.handleSubmit}/>
      	{this.generateMessage()}
				<ul>
					{this.displaySavedMessages()}
				</ul>
		<EmailForm onSubmit={this.handleEmailSubmit}/>
      </div>
    );
  }
}

export default App;

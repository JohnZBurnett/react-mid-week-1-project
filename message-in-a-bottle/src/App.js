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
			savedRecipients: [],
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
			let obj = {checked: false, 
				message: this.state.message, 
				subtitle: this.state.subtitle
			}
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
  	let obj = {
  		name: formState.recipientValue,
  		email: formState.emailValue,
  	};
  	let updatedSavedRecipients = this.state.savedRecipients.slice();
  	updatedSavedRecipients.push(obj); 
  	this.setState({
  		savedRecipients: updatedSavedRecipients
  	})

  	console.log("in handleEmailSubmit");
  }

	//show the saved messages underneath the form
	displaySavedMessages = () => (
		this.state.savedMessages.map((savedMessage, idx) => (
			<li><input type="checkbox" id={idx}/>Message: {savedMessage.message}{savedMessage.subtitle}</li>
			)
		)
	)

	listRecipients = () => (
	  this.state.savedRecipients.map( (recipient) => (
	  	<li><a href={"mailto:" + recipient.email + "?subject=Insults" + "&body=" + this.getAllCheckedInsults()}>{recipient.name}</a></li>
	  ))
	)

	getAllCheckedInsults = () => {
		let checkedMessages = this.state.savedMessages.filter(savedMessage =>  savedMessage.checked)
		let body = checkedMessages.map( checkedMessage => checkedMessage.message + checkedMessage.subtitle + "\n").join(",")
		return body; 
		console.log("BODY:", body)
	}

	handleCheckboxClick = (event) => {
		if (event.target.type === "checkbox") {
			let updatedMessages = this.state.savedMessages.slice();
			updatedMessages[event.target.id].checked = !updatedMessages[event.target.id].checked; 
			this.setState({
				savedMessages: updatedMessages,
			})

		}
	}

  render() {
    return (
      <div className="App">
      	<Form onSubmit={this.handleSubmit}/>
      	{this.generateMessage()}
				<ul onClick={this.handleCheckboxClick}>
					{this.displaySavedMessages()}
				</ul>
		<EmailForm onSubmit={this.handleEmailSubmit}/>
		  <ul>
			{this.listRecipients()}
		  </ul>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form.js';

class App extends Component {
	constructor() {
		super(); 

		this.state = {
			submitted: false,
			message: "", 
			subtitle: ""
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

  generateMessage = () => {
  	if (this.state.submitted) {
  		return(
  		 <Message />
  		)
  	} else {
  		<p>"Fill out the form!!!!"</p>
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

  render() {
    return (
      <div className="App">
      	<Form onSubmit={this.handleSubmit} test="test"/>
      	{this.generateMessage()}
      </div>
    );
  }
}

export default App;

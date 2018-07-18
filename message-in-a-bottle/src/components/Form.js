import React, { Component } from 'react'; 
import endpoints from '../endpoints.js'

class Form extends Component {

	constructor() {
		super(); 

		this.state = {
			value: '',
			selectValue: '',
		};
	}


  generateEndpointOptions = () => (
  	 endpoints.map((endpoint) => (
  		 <option value={endpoint.url}>{endpoint.name}</option>
  		)
  	)
  )

  handleChange = (event) => {
  	if (event.target.id === "endpoints") {
  		this.setState({
  			selectValue: event.target.value,
  		})
  	} else if (event.target.id === "name") {
	  	this.setState({
	  		value: event.target.value,
	  	}) 	
  	}
  }


  render(){
  	return(
  	  <div>
  	  	<form>
  	  	  <select id="endpoints" value={this.state.selectValue} onChange={(event) => this.handleChange(event)}>
  	  	  	{this.generateEndpointOptions()}]
  	  	  </select>
  	  	  <input type="text" id="name" value={this.state.value} onChange={(event) => this.handleChange(event)}/>
  	  	</form>
  	    {console.log("Form")}
  	  </div>
  	)
  }
}

export default Form;
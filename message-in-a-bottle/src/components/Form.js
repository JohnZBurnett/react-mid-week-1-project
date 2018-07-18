import React, { Component } from 'react'; 
import endpoints from '../endpoints.js'

class Form extends Component {


  generateEndpointOptions = () => (
  	 endpoints.map((endpoint) => (
  		 <option value={endpoint.url}>{endpoint.name}</option>
  		)
  	)
  )

  render(){
  	return(
  	  <div>
  	  	<form>
  	  	  <select id="endpoints">
  	  	  	{this.generateEndpointOptions()}
  	  	  </select>
  	  	</form>
  	    {console.log("Form")}
  	  </div>
  	)
  }
}

export default Form;
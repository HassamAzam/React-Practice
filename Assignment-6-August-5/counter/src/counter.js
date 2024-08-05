import React, { Component } from 'react';

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
     
    };
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  decrement = () => {
    if(this.state.count>0)
    {
    this.setState(prevState => ({
      count: prevState.count - 1
    }));
}
  };
setCounter=(input)=>{
    
   this.setState( prevState=>(
        {
            count:Number(input.target.value)
        }
    )
)
}

  render() {
    return (
      <div class ="counter">
        <h1>Welcome to Counter App</h1>
        <p>{this.state.count}</p>
        <div class="buttons">


        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      
        
        
        </div>
        <br></br> <br></br>
        <h2>Set the Value here</h2>
        <input class="setValue" type="number" onChange={this.setCounter}></input>
       
       
        
             
      </div>
    );
  }
}

export default Counter;

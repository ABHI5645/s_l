import React, { Component } from 'react'

export default class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      userName:"",
      email:"",
      phoneNo:"",
      password:"",

    }
    this.handleSubmit=this.handleSubmit.bind(this);

    
  }
  handleSubmit(e){
    e.preventDefault();
    const {userName,email,phoneNo,password}=this.state;
    console.log(userName,email,phoneNo,password);
    
    fetch("http://localhost:8000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userName,
        email,
        phoneNo,
        password,

      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      alert(data, "userRegister");
    });





      


  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>User name</label>
          <input
            type="text"
            className="form-control"
            placeholder="User name"
            onChange={(e)=>this.setState({userName:e.target.value})}
          />
        </div>

       

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>this.setState({email:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="number"
            className="form-control"
            placeholder="PhoneNo"
            onChange={(e)=>this.setState({phoneNo:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>this.setState({password:e.target.value})}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}

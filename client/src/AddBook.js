import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

class AddBook extends Component{
    constructor(props) {
        super(props);
        this.state={
            data:[],
        };
    }

    submitAddBookForm=(e)=>{
        e.preventDefault();
        console.log("Submitting Add Book");
        fetch('/users/newbook',
            {
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                    bookname: e.target.bookname.value,
                }),
            })
            .then(data=>{ return data.text()})
            .then(data=>console.log("Message from server: " + data));
        // .then(data=>data.json())
        // .then(message=>this.setState({data:message}));
    };

    render(){
        return(
            <div>
                <h1>Add New Book Here!</h1>
                <form onSubmit={this.submitAddBookForm}>
                    <input type="text" name='username' placeholder="Enter username" autoFocus/>
                    <input type="password" name='password' placeholder="Enter password" />
                    <input type="text" name='bookname' placeholder="Enter bookname" />
                    <button>Submit</button>
                </form>
                {this.state.data}

            </div>
        );
    }
}

export default AddBook;

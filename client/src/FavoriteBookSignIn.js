import React, { Component } from 'react';

class FavoriteBookSignIn extends Component{

    // Submission event handler for Signing in an existing user
    submitSignin=(e)=>{
        // Prevents default behavior like reloading the page before the function is run
        e.preventDefault();
        // Fetches the '/login' route in the users.js group as a POST method
        fetch('/users/login',
            {
                method: 'POST',
                // Accept tells the server what kind of data the client is expecting.
                // Content-Type tells the server which kind of data the client is sending in the body
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                // Creates a collection for username and password. Because a request can't send a collection, you have to make it a JSON string first
                // e.target is the information being sent from the form input fields by their names give in the input attributes. The value is what was typed.
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            })
        // data on the left side is the raw response data the server sent (res.send)
        // On the right side, use that data parameter with the .json function to change data to a readable JSON collection.
            .then(rawData=>rawData.json())
            // response on the left side is the readable JSON collection.
            // on the right side we're running a function. The first line is console logging
            .then(userAndBookname=>{console.log(userAndBookname);
                // If the server (res.send) has a collection with a username in it, run the function below
                if(userAndBookname.username)
                // This is changing the parent component state to the returned username, returned bookname and isLoggedIn to true
                    return this.props.loggedInUserInfo(userAndBookname.username, userAndBookname.bookname, true);
                // If the server (res.send) DOES NOT have username in it, run the function below
                else
                // This is changing the parent component state to have the username and password to be null (empty) and isLoggedIn to false
                    return this.props.loggedInUserInfo(null, null, false)});

    };

    render(){
        // If the parent component variable (isLoggedIn) is true, render the return below
        if(this.props.isLoggedIn) {
            return (
                <div>
                    {/*It's getting props.email from the parent component. It was populated by the loggedInUserInfo function.*/}
                    <h1>Your books are: {this.props.bookname}</h1>
                </div>
            );
        }
        // If the parent component variable (isLoggedIn) is false, show a sign in form
        else{
            return(
                <div>
                    {/*Form for entering an existing user information. Once you submit the form it runs submitSignin*/}
                    <form onSubmit={this.submitSignin}>
                        <p>
                            <label htmlFor={"username"}>Enter Username:</label>
                            <input id={"username"} type="text" name='username' placeholder="Enter username" autoFocus/>
                        </p>
                        <p>
                            <label htmlFor={"password"}>Enter password:</label>
                            <input id={"password"} type="password" name='password' placeholder="Enter password" />
                        </p>
                        <button>Sign In</button>
                    </form>
                </div>
            );
        }
    }
}

export default FavoriteBookSignIn;

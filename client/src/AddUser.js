import React, {Component} from 'react';

class AddUser extends Component {
    // constructor to save state (component variables) like notice

    constructor(props) {
        super(props);
        this.state = {
            // Notice is available to save the message a server is sending the client
            notice: "",
        };
    }

    // Submission event handler
    submitAddUserForm = (e) => {
        // Prevents default behavior like reloading the page before the function is run
        e.preventDefault();
        // Fetches the '/' route in the users.js group as a POST method
        fetch('/users/', {
            method: 'POST',
            // Accept tells the server what kind of data the client is expecting.
            // Content-Type tells the server which kind of data the client is sending in the body
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            // Creates a collection for username, password, and email. Because a request can't send a collection, you have to make it a JSON string first
            // e.target is the information being sent from the form input fields by their names give in the input attributes. The value is what was typed.
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                bookname: e.target.bookname.value,

            }),
        })
        // data on the left side is the raw response data the server sent (res.send)
        // On the right side, use that data parameter with the .text function to change data to normal text.
            .then(data => data.text())
            // response on the left side is the readable text data.
            // on the right side we're saving the readable text data that's saved in response into the notice state.
            .then(response => this.setState({notice: response}))
            // If an error is thrown anywhere in the fetch or above function, then console the error
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <div>
                <h1>Add User</h1>
                {/*Form for entering a new user information. Once you submit the form it runs submitAddUserForm*/}
                <form onSubmit={this.submitAddUserForm}>
                    <p>
                        <label htmlFor={"username"}>Enter Username:</label>
                        <input id={"username"} type="text" name='username' placeholder="Enter username" autoFocus/>
                    </p>
                    <p>
                        <label htmlFor={"password"}>Enter password:</label>
                        <input id={"password"} type="password" name='password' placeholder="Enter password"/>
                    </p>
                    <p>
                        <label htmlFor={"bookname"}>Enter bookname:</label>
                        <input id={"bookname"} type="text" name='bookname' placeholder="Enter bookname"/>
                    </p>


                    <button>Sign In</button>
                </form>
                {/*The display message received from the server in fetch*/}
                {this.state.notice}
            </div>
        );
    }
}

export default AddUser;

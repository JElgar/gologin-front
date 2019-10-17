import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: '0',
  }


    handleChangeUser = event => {
        this.setState({ username: event.target.value, error: '0' });
        console.log(this.state)
        console.log(this.state.username)
    }
    
    handleChangePass = event => {
        this.setState({ password: event.target.value, error: '0' });
        console.log(this.state)
        console.log(this.state.password)
    }

    handleSubmit = event => {
        // Stop reload
        event.preventDefault();
        this.setState({ error: '0' });

        const user = {
            'username': this.state.username,
            'password': this.state.password,
        };

        console.log(this.state.username);
        console.log(this.state.password);

        axios.post(`http://localhost:8080/api/v1/login`, {
            'username': this.state.username,
            'password': this.state.password
        })
            .then(res => {
                
                console.log(res);
                console.log(res.data);

                // TODO fix 
                // There is definately a better way of handeling this (Probably send an empty user or use a status code thing idk
                // Current this will throw for like every error so umm dont do this
                if(res.err === undefined){
                    console.log("Success i think");
                    //this.state.error = '1';
                    this.setState({ error: '0' });
                }
                else {
                    console.log("There was and error and it was:")
                    console.log(res.error)
                }
            })
    }

    render() {
        return ( 
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username: 
                    <input type= "text" name="username" onChange={this.handleChangeUser}/>
                    Password: 
                    <input type= "text" name="password" onChange={this.handleChangePass}/>
                    <div>
                        {this.state.error === '1' ? (
                        <p>Error</p>
                        ) : null }
                    </div>
            </label>
            <button type="submit"> Send </button>
            </form>
        )
    }

}

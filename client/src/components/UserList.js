import React, { Component } from 'react';
import axios from 'axios';

class UserList extends Component {
    state = {
        error: '',
        users: [],
        isFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('/api/v1/users').then(res => {
            this.setState({ users: res.data });
        })
    }

    toggleForm = () => {
        this.setState((state, props) => {
            return ({ isFormDisplayed: !state.isFormDisplayed })
        })
    }

    handleChange = (e) => {
        const createdUser = { ...this.state.newUser }
        createdUser[e.target.name] = e.target.value
        this.setState({ newUser: createdUser })

    }

    createUser = (e) => {
        e.preventDefault()
        axios
            .post('/api/v1/users', {
                name: this.state.newUser.name,
                email: this.state.newUser.email,
                age: this.state.newUser.age
            }).then(res => {
                const userList = [...this.state.users]
                userList.push(res.data)
                this.setState({
                    newUser: {
                        name: '',
                        email: '',
                        age: ''
                    },
                    isFormDisplayed:false,
                    users: userList
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                
            </div>
        )
    }
}


export default UserList;
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddUser from './AddUser'

class UserList extends Component {
    state = {
        users: [],
        newUser: {
            name: '',
            email: '',
            age: ''
        },
        isFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('api/v1/users').then(res => {
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
                {
                    this.state.users.map((user) => {
                        return (
                            <div key={user._id} className="linkTo" >
                                <Link to={`/users/${user._id}`} style={{paddingTop:'10px'}}>
                                    {user.name}
                                </Link>
                            </div>
                        )
                    })
                }

                <button onClick={this.toggleForm} className="buttonClass">New User?</button>
                {
                    this.state.isFormDisplayed
                        ?
                        <AddUser newUser={this.state.newUser} handleChange={this.handleChange} createUser={this.createUser} />
                        : null
                }

            </div>
        )
    }
}

export default UserList;

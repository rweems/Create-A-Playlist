import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {

    state = {
        user: {
            name: '',
            email: '',
            age: ''
        },
        isFormDisplayed: false

    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.fetchUser(userId)
    }

    fetchUser = async (userId) => {
        try {
            const userResponse = await axios.get(`/api/v1/users/${userId}`)
            this.setState({
                user: userResponse.data,
                //songs: artistResponse.data.songs,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }

    updateUser = (e) => {
        e.preventDefault()
        axios.put(`/api/v1/users/${this.props.match.params.id}`, this.state.user)
            .then(res => {
                this.setState({ user: res.data })
            })
    }


    deleteUser = () => {
        axios.delete(`/api/v1/users/${this.props.match.params.id}`).then(res => {
            res.locaction('back')
        })
    }

    render() {
        return (
            <div>

                <br />

                <button onClick={this.toggleForm} className="buttonClass">Update User?</button>
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.updateUser}>
                            <div>
                                <label htmlFor='name'>Name: </label>
                                <input id='name' type='text'
                                    name='name' onChange={this.handleChange}
                                    value={this.state.user.name}
                                    placeholder='Name' />
                            </div>

                            <div>
                                <label htmlFor='email'>Email: </label>
                                <input id='email' type='text'
                                    name='email'
                                    placeholder='Email'
                                    onChange={this.handleChange}
                                    value={this.state.user.email} />
                            </div>

                            <div>
                                <label htmlFor='age'>Age: </label>
                                <input id='age' type='number'
                                    name='age'
                                    placeholder='Age'
                                    onChange={this.handleChange}
                                    value={this.state.user.age} />
                            </div>
                            <br />
                            <input type='submit' value='Update' />
                        </form> : null
                }

                <div className='form'>
                    <div>
                        Name:{this.state.user.name}
                    </div>

                    <div>
                        Email: {this.state.user.email}
                    </div>

                    <div>
                        Age: {this.state.user.age}
                    </div>

                    <br />
                    <button onClick={this.deleteUser}>Delete</button>
                </div>
                <br />
                <br />
                <br />


            </div>
        );
    }


}




export default User;
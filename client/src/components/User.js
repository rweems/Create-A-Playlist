import React, { Component } from 'react';
import axios from 'axios';
import PlaylistList from './PlaylistList'
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

    toggleForm = () => {
        this.setState((state, props) => {
            return ({ isFormDisplayed: !state.isFormDisplayed })
        })
    }

    handleChange = (e) => {
        const _user = { ...this.state.user }
        _user[e.target.name] = e.target.value
        this.setState({ user: _user })
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
        axios.put(`/api/v1/users/${this.props.match.params.id}/`, this.state.user)
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
                <PlaylistList user={this.state.user.id}/>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button onClick={this.toggleForm} className="buttonClass">Update User?</button>
                <br />
                <br />
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

                            <input type='submit' value='Update' />
                        </form> : null
                }
                <br />
                <br />
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
                    <button onClick={this.deleteUser}>Delete User</button>
                </div>
                <br />
                <br />
                <br />


            </div>
        );
    }


}




export default User;
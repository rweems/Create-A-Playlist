import React, { Component } from 'react';
import axios from 'axios';

class Playlist extends Component {

    state = {
        playlist: {
            playlistName: '',
        },
        isFormDisplayed: false

    }

    componentDidMount() {
        const playlistId = this.props.match.params.id;
        this.fetchUser(playlistId)
    }

    fetchPlaylist = async (playlistId) => {
        try {
            const playlistResponse = await axios.get(`/api/v1/playlists/${playlistId}`)
            this.setState({
                playlist: playlistResponse.data,
                //songs: artistResponse.data.songs,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }

    updatePlaylist = (e) => {
        e.preventDefault()
        axios.put(`/api/v1/playlists/${this.props.match.params.id}`, this.state.user)
            .then(res => {
                this.setState({ user: res.data })
            })
    }


    deletePlaylist = () => {
        axios.delete(`/api/v1/playlists/${this.props.match.params.id}`).then(res => {
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
                        <form onSubmit={this.updatePlaylist}>
                            <div>
                                <label htmlFor='playlistName'>Playlist Name: </label>
                                <input id='playlistName' type='text'
                                    name='playlistName' onChange={this.handleChange}
                                    value={this.state.user.name}
                                    placeholder='Playlist Name' />
                            </div>

                            <br />
                            <input type='submit' value='Update' />
                        </form> : null
                }

                <div className='form'>
                    <div>
                        Playlist Name:{this.state.user.name}
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

export default Playlist;
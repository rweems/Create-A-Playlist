import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router'
import SongList from './SongList';

class Playlist extends Component {

    state = {
        playlist: {
            playlistName: '',
        },
        isFormDisplayed: false

    }

    componentDidMount() {
        const playlistId = this.props.match.params.id;
        this.fetchPlaylist(playlistId)
    }

    toggleForm = () => {
        this.setState((state, props) => {
            return ({ isFormDisplayed: !state.isFormDisplayed })
        })
    }

    handleChange = (e) => {
        const _playlist = { ...this.state.playlist }
        _playlist[e.target.name] = e.target.value
        this.setState({ playlist: _playlist })
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
        axios.put(`/api/v1/playlists/${this.props.match.params.id}/`, this.state.playlist)
            .then(res => {
                this.setState({ playlist: res.data })
            })
    }


    deletePlaylist = () => {
        axios.delete(`/api/v1/playlists/${this.props.match.params.id}/`).then(res => {
            res.redirect('/api/v1/playlists')
        })
    }

    render() {
        return (
            <div>
                <SongList playlist={this.state.playlist.playlistName} id={this.state.playlist.id}/>

                <br />

                <button onClick={this.toggleForm} className="buttonClass">Update Playlist?</button>
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.updatePlaylist}>
                            <div>
                                <label htmlFor='playlistName'>Playlist Name: </label>
                                <input id='playlistName' type='text'
                                    name='playlistName' onChange={this.handleChange}
                                    value={this.state.playlist.playlistName}
                                    placeholder='Playlist Name' />
                            </div>

                            <br />
                            <input type='submit' value='Update' />
                        </form> : null
                }

                <div className='form'>
                    <div>
                        Playlist Name:{this.state.playlist.playlistName}
                    </div>


                    <br />
                    <button onClick={this.deletePlaylist}>Delete</button>
                </div>
                <br />
                <br />
                <br />


            </div>
        );
    }


}

export default Playlist;
import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router'
import SongList from './SongList';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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
                <SongList playlist={this.state.playlist.playlistName} id={this.state.playlist.id} />

                <br />
                <br />
                <br />
                <br />

                <div className='form'>
                    <div>
                        Playlist Name:{this.state.playlist.playlistName}
                    </div>

                </div>
                <br />
                <br />
                <Button variant="outlined" size="medium" onClick={this.toggleForm} className="buttonClass">
                    Update/Delete Playlist?
                </Button>
                <br />
                <br />
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.updatePlaylist}>
                            <div>
                                <InputLabel htmlFor='playlistName'>New Playlist Name: </InputLabel>
                                <Input id='playlistName' type='text'
                                    name='playlistName' onChange={this.handleChange}
                                    value={this.state.playlist.playlistName}
                                    placeholder='Playlist Name' />
                            </div>

                            <br />
                            <Button variant="outlined" color="inherit" size="medium" type='submit' value='Update'>
                                Update
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="outlined" color="secondary" size="medium" onClick={this.deletePlaylist}>
                                Delete
                            </Button>
                        </form> : null
                }
                



            </div>
        );
    }


}

export default Playlist;
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

class PlaylistList extends Component {
    state = {
        error: '',
        playlists: [],
        newPlaylist: {
            playlistName: '',
        },
        isFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('api/v1/playlists/').then(res => {
            this.setState({ playlists: res.data });
        })
    }

    toggleForm = () => {
        this.setState((state, props) => {
            return ({ isFormDisplayed: !state.isFormDisplayed })
        })
    }

    handleChange = (e) => {
        const clonePlaylist = { ...this.state.newPlaylist }
        clonePlaylist[e.target.name] = e.target.value
        this.setState({ newPlaylist: clonePlaylist })

    }

    createPlaylist = (e) => {
        e.preventDefault()
        axios.post('/api/v1/playlists/', this.state.newPlaylist)
            .then(res => {
                const playlistList = [...this.state.playlists]
                playlistList.unshift(res.data)
                this.setState({
                    newPlaylist: {
                        playlistName: ''
                    },
                    isFormDisplayed: false,
                    playlists: playlistList
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Playlists</h1>
                {
                    this.state.playlists.map((playlist) => {
                        return (
                            <div key={playlist.id} className="linkTo">
                                <Link to={`/api/v1/playlists/${playlist.id}`} style={{ paddingTop: '10px' }} name={this.state.playlist}>
                                    {playlist.playlistName}
                                </Link>
                            </div>
                        )
                    })
                }

                <button onClick={this.toggleForm} className="buttonClass">New Playlist?</button>
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.createPlaylist}>
                            <div>
                                <label htmlFor='playlistName'>Playlist Name: </label>
                                <input id='playlistName' type='text'
                                    name='playlistName'
                                    placeholder='Playlist Name'
                                    onChange={this.handleChange}
                                    value={this.state.newPlaylist.playlistName} />
                            </div>
                            <br />
                            <div>
                                <input type='submit' value='Submit' />
                            </div>
                        </form> : null
                }

            </div>
        )
    }
}

export default PlaylistList;

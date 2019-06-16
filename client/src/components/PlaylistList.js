import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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
        axios.get(`/api/v1/playlists/`).then(res => {
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
        const fakePlaylist = { ...this.state.newPlaylist }
        console.log(fakePlaylist)
        fakePlaylist.user = this.props.id
        console.log(fakePlaylist)
        axios.post(`/api/v1/playlists/`, fakePlaylist)
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
                <br />
                <Button variant="outlined" size="medium" onClick={this.toggleForm} className="buttonClass">
                    New Playlist?
                </Button>
                <br />
                <br />
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.createPlaylist}>
                            <div>
                                <InputLabel htmlFor='playlistName'>Playlist Name: </InputLabel>
                                <Input id='playlistName' type='text'
                                    name='playlistName'
                                    onChange={this.handleChange}
                                    value={this.state.newPlaylist.playlistName} />
                            </div>
                            <br />
                            <div>
                                <InputLabel htmlFor='user'>User: </InputLabel>
                                <Input readOnly value={this.props.user} />
                            </div>
                            <br />
                            <div>
                                <Button variant="outlined" type='submit' value='Submit'>
                                    Submit
                                </Button>
                            </div>
                        </form> : null
                }

            </div>
        )
    }
}

export default PlaylistList;

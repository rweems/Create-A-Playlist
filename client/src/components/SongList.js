import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class SongList extends Component {
    state = {
        error: '',
        songs: [],
        newSong: {
            title: '',
            artist: ''
        },
        isFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get(`/api/v1/songs/`).then(res => {
            this.setState({ songs: res.data });
        })
    }

    toggleForm = () => {
        this.setState((state, props) => {
            return ({ isFormDisplayed: !state.isFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneSong = { ...this.state.newSong }
        cloneSong[e.target.name] = e.target.value
        this.setState({ newSong: cloneSong })

    }

    createSong = (e) => {
        e.preventDefault()
        const fakeSong = {...this.state.newSong}
        console.log(fakeSong)
        fakeSong.playlist = this.props.id
        console.log(fakeSong)
        axios.post(`/api/v1/songs/`, fakeSong)
            .then(res => {
                const songList = [...this.state.songs]
                songList.unshift(res.data)
                this.setState({
                    newSong: {
                        title: '',
                        artist: ''
                    },
                    isFormDisplayed: false,
                    songs: songList
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Songs</h1>
                {
                    this.state.songs.map((song) => {
                        return (
                            <div key={song.id} className="linkTo">
                                <Link to={`/api/v1/songs/${song.id}`} style={{ paddingTop: '10px' }} name={this.state.song} title={this.state.newSong.title} artist={this.state.newSong.artist}>
                                    {song.title} - {song.artist}
                                </Link>
                            </div>
                        )
                    })
                }
                <br />

                <Button variant="outlined" size="medium" onClick={this.toggleForm} className="buttonClass">
                    Add Song?
                </Button>
                <br />
                <br />
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.createSong}>
                            <div>
                                <InputLabel htmlFor='title'>Title: </InputLabel>
                                <Input id='title' type='text'
                                    name='title'
                                    onChange={this.handleChange}
                                    value={this.state.newSong.title} />
                            </div>
                            <div>
                                <InputLabel htmlFor='artist'>Artist: </InputLabel>
                                <Input id='artist' type='text'
                                    name='artist'
                                    onChange={this.handleChange}
                                    value={this.state.newSong.artist} />
                            </div>
                            <div>
                            <InputLabel htmlFor='playlists'>Playlist: </InputLabel>
                                <Input readOnly value={this.props.playlist} />
                            </div>
                            <br />
                            <div>
                                <Button variant="outlined" size="medium" type='submit' value='Submit'> Submit</Button>
                            </div>
                        </form> : null
                }

            </div>
        )
    }
}

export default SongList;

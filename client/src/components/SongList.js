import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

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
                                <Link to={`/api/v1/songs/${song.id}`} style={{ paddingTop: '10px' }} name={this.state.song} >
                                    {song.title} - {song.artist}
                                </Link>
                            </div>
                        )
                    })
                }

                <button onClick={this.toggleForm} className="buttonClass">New Song?</button>
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.createSong}>
                            <div>
                                <label htmlFor='title'>Title: </label>
                                <input id='title' type='text'
                                    name='title'
                                    placeholder='Title'
                                    onChange={this.handleChange}
                                    value={this.state.newSong.title} />
                            </div>
                            <div>
                                <label htmlFor='artist'>Artist: </label>
                                <input id='artist' type='text'
                                    name='artist'
                                    placeholder='Artist'
                                    onChange={this.handleChange}
                                    value={this.state.newSong.artist} />
                            </div>
                            <div>
                            <label htmlFor='playlists'>Playlist: </label>
                                <input readOnly value={this.props.playlist} />
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

export default SongList;

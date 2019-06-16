import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router'


class Song extends Component {

    state = {
        song: {
            title: '',
            artist: '',
            picture: []
        },
        isFormDisplayed: false

    }

    componentDidMount() {
        const songId = this.props.match.params.id;
        this.fetchSong(songId)
    }

    toggleForm = () => {
        this.setState((state, props) => {
            return ({ isFormDisplayed: !state.isFormDisplayed })
        })
    }

    handleChange = (e) => {
        const _song = { ...this.state.song }
        _song[e.target.name] = e.target.value
        this.setState({ song: _song })
    }

    fetchSong = async (songId) => {

        try {
            const songResponse = await axios.get(`/api/v1/songs/${songId}`)
            console.log(songResponse)
            this.setState({
                song: songResponse.data,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({
                error: error.message
            })
        }
    }
    

    updateSong = (e) => {
        e.preventDefault()
        axios.put(`/api/v1/songs/${this.props.match.params.id}/`, this.state.song)
            .then(res => {
                this.setState({ song: res.data })
            })
    }


    deleteSong = () => {
        axios.delete(`/api/v1/songs/${this.props.match.params.id}/`).then(res => {
            res.redirect('/api/v1/songs')
        })
    }

    getSongData = () => {
        axios.get(`/api/v1/songs/${this.props.match.params.id}`)
            .then(song => {
                console.log(song)
                const artist = this.state.song.artist
                const title = this.state.song.title
                axios.get(`https://api.deezer.com/search?q=artist:"${artist}"track:"${title}"`)
                    .then(stuff => {
                        console.log(stuff)
                    })
            })
    }

    render() {
        return (
            <div>
                <button onClick={this.getSongData}>Show data</button>
                {this.state.picture}
                <br />
                <br />
                <br />
                <div className='form'>
                    <div>
                        Title: {this.state.song.title}
                    </div>

                    <div>
                        Artist: {this.state.song.artist}
                    </div>
                </div>
                <br />

                <button onClick={this.toggleForm} className="buttonClass">Update Song?</button>
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.updateSong}>
                            <div>
                                <label htmlFor='title'>Title: </label>
                                <input id='title' type='text'
                                    name='title'
                                    placeholder='Title'
                                    onChange={this.handleChange}
                                    value={this.state.song.title} />
                            </div>
                            <div>
                                <label htmlFor='artist'>Artist: </label>
                                <input id='artist' type='text'
                                    name='artist'
                                    placeholder='Artist'
                                    onChange={this.handleChange}
                                    value={this.state.song.artist} />
                            </div>
                            <div>
                                <label htmlFor='playlists'>Playlist: </label>
                                <input readOnly value={this.props.playlist} />
                            </div>
                            <br />
                            <input type='submit' value='Update' />
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={this.deletePlaylist}>Delete</button>
                        </form> : null
                }
                <br />
                <br />
                <br />



            </div>
        );
    }


}

export default Song;
import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

const imgStyle = {
    margin: '10px',
    height: '200px'
}


class Song extends Component {

    state = {
        song: {
            title: '',
            artist: '',
            picture: []
        },
        isFormDisplayed: false,
        redirectToPlaylists: false

    }

    componentDidMount() {

        this.fetchSong(this.props.match.params.id)
            .then(() => {
                axios.get(`https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:"${this.state.song.artist}"`, {
                    headers: {
                        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
                        "X-RapidAPI-Key": "67deb47c2cmsh8ae4bad8892782ep19b745jsn5b8de04a160e"
                    }

                }).then(res => {
                    console.log(res.data['data'])
                    let image = document.getElementById('picture').src = res.data['data'][0]['album']['cover']
                    this.setState({ picture: image })
                })

            })


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

    fetchSong = (songId) => {
        return axios.get(`/api/v1/songs/${songId}`)
            .then(songResponse => {
                console.log(songResponse)
                this.setState({
                    song: songResponse.data,
                })
            })
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
            this.setState({ redirectToPlaylists: true })
        })
    }


    render() {
        if (this.state.redirectToPlaylists) {
            return (<Redirect go={-1} />)
        }

        return (
            <div>
                <div>
                    <img id="picture" src="" style={imgStyle}/>
                </div>
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

                <Button variant="outlined" size="medium" onClick={this.toggleForm} className="buttonClass">
                    Update Song?
                </Button>
                <br />
                <br />
                {
                    this.state.isFormDisplayed
                        ?
                        <form onSubmit={this.updateSong}>
                            <div>
                                <InputLabel htmlFor='title'>Title: </InputLabel>
                                <Input id='title' type='text'
                                    name='title'
                                    onChange={this.handleChange}
                                    value={this.state.song.title} />
                            </div>
                            <br />
                            <div>
                                <InputLabel htmlFor='artist'>Artist: </InputLabel>
                                <Input id='artist' type='text'
                                    name='artist'
                                    placeholder='Artist'
                                    onChange={this.handleChange}
                                    value={this.state.song.artist} />
                            </div>
                            <br />
                            <div>
                                <InputLabel htmlFor='playlists'>Playlist: </InputLabel>
                                <Input readOnly value={this.props.playlist} />
                            </div>

                            <br />
                            <Button variant="outlined" color="inherit" size="medium" type='submit' value='Update'>
                                Update
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="outlined" color="secondary" size="medium" onClick={this.deleteSong}>
                                Delete
                            </Button>
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
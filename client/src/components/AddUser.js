import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class AddUser extends Component {
    state = {}
    render() {
        return (
            <form onSubmit={this.props.createUser}>
                
                <div>
                    <br />
                    <InputLabel htmlFor='name'>Name: </InputLabel>
                    <Input id='name' type='text'
                        name='name'
                        onChange={this.props.handleChange}
                        value={this.props.newUser.name} />
                </div>
                <br />
                <div>
                    <InputLabel htmlFor='email'>Email: </InputLabel>
                    <Input id='email' type='text'
                        name='email'
                        onChange={this.props.handleChange}
                        value={this.props.newUser.email} />
                </div>
                <br />
                <div>
                    <InputLabel htmlFor='age'>Age: </InputLabel>
                    <Input id='age' type='number'
                        name='age'
                        onChange={this.props.handleChange}
                        value={this.props.newUser.age} />
                </div>

                <br />
                <div>
                    <Button variant="outlined" color="inherit" size="medium" type='submit' value='Submit'>
                        Submit
                    </Button>
                </div>
                
            </form>
        );
    }
}


export default AddUser;
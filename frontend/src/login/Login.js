import React from 'react'
import {Button, Icon} from 'semantic-ui-react'
import axios from 'axios'
class LoginPage extends React.Component {
    constructor(){
        super();
        this.state = {
            uuid:""
        }
    }
    onLoginByFacebook = (e) =>{
        axios.get('http://localhost:8095/getUUID')
            .then(function (response) {
                this.setState({
                    uuid:response.data
                })
                console.log(this.state.uuid);
                let url = "http://localhost:8095/login/facebook/"+this.state.uuid;
                window.open (url,"mywindow","menubar=1,resizable=1,width=700,height=500");
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

        /*function authenOnFacebook(uuid) {
            console.log(uuid)
            axios.post('http://localhost:8095/LoginByFacebook')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }*/
    }

    render() {

        return (
            <div>
                <div>
                    <Button color='facebook' onClick={this.onLoginByFacebook}>
                        <Icon name='facebook'/> Facebook
                    </Button>
                    <Button color='google plus'>
                        <Icon name='google plus'/> Google Plus
                    </Button>
                </div>
            </div>)
    }
}

export default LoginPage;
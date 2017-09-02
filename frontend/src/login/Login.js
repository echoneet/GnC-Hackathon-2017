import React from 'react'
import {Button, Icon} from 'semantic-ui-react'
import axios from 'axios'
import { Message } from 'semantic-ui-react'
class LoginPage extends React.Component {
    constructor(){
        super();
        this.state = {
            uuid:""
        }
    }
    onLoginByGoogle = (e) =>{
        let url = "http://localhost:8097/auth/google";
        window.open (url,"mywindow","menubar=1,resizable=1,width=700,height=500");
    }

    onLoginByFacebook = (e) =>{
        let url ="http://localhost:8095/login/facebook";
        window.open (url,"mywindow","menubar=1,resizable=1,width=700,height=500");
    }

    render() {
        let message = "";
        console.log(sessionStorage.getItem("roomSelected"))
        if(sessionStorage.getItem("roomSelected") !==null && sessionStorage.getItem("roomSelected")!== undefined ){
            message = <Message
                icon='id card'
                header='Please login'
                content='You can login with fackbook or google+'
            />
        }
        return (
            <div>
                {message}
                <div>
                    <Button color='facebook' onClick={this.onLoginByFacebook}>
                        <Icon name='facebook'/> Facebook
                    </Button>
                    <Button color='google plus' onClick={this.onLoginByGoogle}>
                        <Icon name='google plus'/> Google Plus
                    </Button>
                </div>
            </div>)
    }
}

export default LoginPage;
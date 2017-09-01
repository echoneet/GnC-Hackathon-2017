import React from 'react'
import {Button, Icon} from 'semantic-ui-react'

class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Button color='facebook'>
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
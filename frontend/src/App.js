import React from 'react';
import {Route, BrowserRouter, Link, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import SearchRoom from './searchRoom/SearchRoom';
import RoomInfo from './rentRoom/RentRoom';
import UploadPayment from './uploadPayment/UploadPayment';
import ReportRentRoom from './reportRentRoom/reportRentRoom';
import SearchRoomByCoordinate from './searchRoomByCoordinate/SearchRoomByCoordinate'
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Login from './login/Login';
import axios from 'axios';
import {Menu, Icon} from 'semantic-ui-react';

class ConfirmAuth extends React.Component {
    componentDidMount() {
        localStorage.setItem("authUUid", this.props.match.params.uuid);
        window.close();
    }

    render() {
        return (
            <div>Login/Register Success</div>
        )
    }
}


class App extends React.Component {
    state = {}

    constructor() {
        super()
        this.state = {
            redirect: ''
        };
    }

    componentDidMount() {
        window.addEventListener("storage", function () {
            var self = this;
            let uuidAuthId = localStorage.getItem("authUUid")
            if (uuidAuthId !== null) {
                axios.post('http://localhost:8099/getUserInfo', {
                    id: uuidAuthId
                })
                    .then(function (response) {
                        localStorage.clear();
                        localStorage.setItem('UserInfo', response.data);
                        if (sessionStorage.getItem("roomSelected") !== null) {
                            self.setState({
                                redirect: <Redirect to="/rentRoom"/>
                            })
                        }
                        else {
                            self.setState({
                                redirect: <Redirect to="/"/>
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }.bind(this), false);
    }

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
        if (name === 'Login') {
            sessionStorage.clear();
        }
    }

    render() {
        let Redirect = this.state.redirect;
        const {activeItem} = this.state
        return (
            <BrowserRouter>
                <div className="App">
                    {Redirect}
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2 className="App-title">Hackathon2017</h2>
                    </div>
                    <div className="App-Detail">
                        <div className="App-Sidebar">
                            <Menu vertical className="Menu">
                                <Menu.Item as={Link} to="/login" name='Login' active={activeItem === 'Login'}
                                           onClick={this.handleItemClick}>
                                    <Icon name='user circle outline'/>
                                    Login/Register
                                </Menu.Item>

                                <Menu.Item>
                                    <Icon name='grid layout'/>
                                    Rent
                                    <Menu.Menu>
                                        <Menu.Item as={Link} to="/"
                                                   name='Search'
                                                   active={activeItem === 'Search'}
                                                   onClick={this.handleItemClick}
                                        >
                                            Search
                                        </Menu.Item>
                                            <Menu.Item as={Link} to="/searchRoomByCoordinate"
                                                name='SearchCoordinate'
                                                active={activeItem === 'SearchCoordinate'}
                                                onClick={this.handleItemClick}
                                            >
                                                SearchByCoordinate
                                            </Menu.Item>
                                        <Menu.Item as={Link} to="/uploadPayment"
                                                   name='uploadPayment'
                                                   active={activeItem === 'uploadPayment'}
                                                   onClick={this.handleItemClick}
                                        >
                                            uploadPayment
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className="App-detail-detail">
                            <Route exact path="/" component={SearchRoom}/>
                            <Route exact path="/searchRoomByCoordinate" component={SearchRoomByCoordinate}/>
                            <Route exact path="/rentRoom" component={RoomInfo}/>
                            <Route exact path="/uploadPayment" component={UploadPayment}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/reportRentRoom" component={ReportRentRoom}/>
                            <Route path="/testReturn/:uuid" component={ConfirmAuth}/>

                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

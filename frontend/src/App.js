import React from 'react';
import {Route, BrowserRouter, Link, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import SearchRoom from './searchRoom/SearchRoom';
import RoomInfo from './rentRoom/RentRoom';
import UploadPayment from './uploadPayment/UploadPayment';
import ReportRentRoom from './reportRentRoom/reportRentRoom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Login from './login/Login';
import axios from 'axios';
import {Menu, Icon} from 'semantic-ui-react';

class ConfirmAuth extends React.Component {
    componentDidMount() {
        console.log(this.props.match.params.uuid)
        axios.post('http://localhost:8095/getUserInfo', {
            id: this.props.match.params.uuid
        })
            .then(function (response) {
                console.log(response.data)
                localStorage.setItem('UserInfo', response.data);
                window.close();
            })
            .catch(function (error) {
                console.log(error);
                window.close();
            });

    }

    render() {
        return (
            <div>loading</div>
        )
    }
}


class App extends React.Component {
    state = {}


    componentDidMount() {
        window.addEventListener("storage", function () {
            let a = localStorage.getItem("eiei");
            console.log(a);
            if (a === "no") {
                window.close();
            }
            //localStorage.clear();
        }, false);
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2 className="App-title">Hackathon2017</h2>
                    </div>
                    <div className="App-Detail">
                        <div className="App-Sidebar">
                            <Menu vertical className="Menu">
                                <Link to="/login">
                                    <Menu.Item name='browse' active={activeItem === 'browse'}
                                               onClick={this.handleItemClick}>
                                        <Icon name='user circle outline'/>
                                        Login/Register
                                    </Menu.Item>
                                </Link>

                                <Menu.Item>
                                    <Icon name='grid layout'/>
                                    Rent
                                    <Menu.Menu>
                                        <Link to="/">
                                            <Menu.Item
                                                name='Search'
                                                active={activeItem === 'Search'}
                                                onClick={this.handleItemClick}
                                            >
                                                Search
                                            </Menu.Item>
                                        </Link>

                                        <Link to="/uploadPayment">
                                            <Menu.Item
                                                name='reviews'
                                                active={activeItem === 'uploadPayment'}
                                                onClick={this.handleItemClick}
                                            >
                                                uploadPayment
                                            </Menu.Item>
                                        </Link>
                                    </Menu.Menu>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className="App-detail-detail">
                            <Route exact path="/" component={SearchRoom}/>
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

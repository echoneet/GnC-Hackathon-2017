import React from 'react';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import logo from './logo.svg';
import SearchRoom from './searchRoom/SearchRoom';
import RoomInfo from './rentRoom/RentRoom';
import UploadPayment from './uploadPayment/UploadPayment';
import ReportRentRoom from './reportRentRoom/reportRentRoom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Login from './login/Login'
import {Menu, Icon} from 'semantic-ui-react'

class App extends React.Component {
    state = {}

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
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

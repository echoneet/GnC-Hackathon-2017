import React, {Component} from 'react';
import {Route,BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import SearchRoom from './searchRoom/SearchRoom';
import RoomInfo from './rentRoom/RentRoom';
import UploadPayment from './uploadPayment/UploadPayment'
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Hackathon2017</h2>
                </div>
                <div>
                    <Route exact path="/" component={SearchRoom}/>
                    <Route exact path="/rentRoom" component={RoomInfo}/>
                    <Route exact path="/uploadPayment" component={UploadPayment}/>
                </div>
            </div>
            </BrowserRouter>
        );
    }
}

export default App;

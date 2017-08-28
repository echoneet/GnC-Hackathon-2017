import React, {Component} from 'react';
//import {Route,Switch} from 'react-router-dom';
import logo from './logo.svg';
import SearchRoom from './searchRoom/searchRoom';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to App</h2>
                </div>
                <SearchRoom/>
            </div>
        );
    }
}

export default App;

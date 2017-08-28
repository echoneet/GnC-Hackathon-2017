import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {DatePicker} from 'antd';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={enUS}>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2 className="aa">Welcome to App test</h2>
                    </div>
                    <p className="App-intro">
                        Hello world!
                    </p>
                    <DatePicker/>
                </div>
            </LocaleProvider>
        );
    }
}

export default App;

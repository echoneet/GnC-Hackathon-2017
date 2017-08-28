import React from 'react';
import axios from 'axios';

class searchRoom extends React.Component{
    constructor(){
        super();
        this.state ={
            minValue: 0,
            maxValue: 1000,
            resultSearchRoom: []
        }
    }
    onChangeSelector = (e) => {
        let value = JSON.parse(e.target.value);
        this.setState({
            minValue:value.min,
            maxValue:value.max
        })
    }

    onSearchRoom = (e) => {
        console.log('test');
        axios.post('http://localhost:8091/searchRoom',{
            min:this.state.minValue,
            max:this.state.maxValue
        })
            .then(function (response) {
                this.setState({
                    resultSearchRoom:response.data
                })
                console.log(this.state.resultSearchRoom);
            }.bind(this))
            .catch(function (error) {
                console.log('test');
                console.log(error);
            });
    }

    render(){
        var resultSearchroom = this.state.resultSearchRoom;
        var resultSearch = [];
        for (var i = 0; i < resultSearchroom.length; i++) {
            console.log(resultSearchroom[i].name)
        }
        resultSearch.push(
            <div>
                ผลการค้นหา
            </div>
        )
        return(
            <div>
                ราคาเดือนละ &nbsp;&nbsp;&nbsp;
                <select onChange={this.onChangeSelector}>
                    <option value='{"max":1000,"min":0}'>0-1,000</option>
                    <option value='{"max":3000,"min":1001}'>1,001-3,000</option>
                    <option value='{"max":6000,"min":3001}'>3,001-6,000</option>
                    <option value='{"max":10000,"min":6001}'>6,001-10,000</option>
                    <option value='{"max":99999999999,"min":1000}'>มากกว่า 10,000</option>
                </select>
                <button onClick={this.onSearchRoom}>ค้นหา</button>
                <div>
                    {resultSearch}
                </div>
            </div>

        )
    }
}

export default searchRoom;
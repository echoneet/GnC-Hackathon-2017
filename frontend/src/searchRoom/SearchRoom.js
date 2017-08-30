import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './SearchRoom.css';
class SearchRoom extends React.Component{
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
        axios.post('http://localhost:8091/SearchRoom',{
            min:this.state.minValue,
            max:this.state.maxValue
        })
            .then(function (response) {
                this.setState({
                    resultSearchRoom:response.data
                })
                //console.log(this.state.resultSearchRoom);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    onClickRoomInfo = (sequenceRoom) =>{
        console.log("Go to rent page");
        console.log(this.state.resultSearchRoom[sequenceRoom-1]);
        window.sessionStorage.setItem("roomSelected",JSON.stringify(this.state.resultSearchRoom[sequenceRoom-1]));

    }

    addCommaToLargeNum = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render(){
        var resultSearchroom = this.state.resultSearchRoom;
        var resultSearch = [];
        var resultInfo =[];
        for (var i = 0; i < resultSearchroom.length; i++) {
            resultInfo.push(
                <Link to="../rentRoom" >
                <tr onClick={() => this.onClickRoomInfo(i)}>
                    <td>
                        {resultSearchroom[i].name}{resultSearchroom[i].location}
                    </td>
                    <td>
                        {resultSearchroom[i].tel}
                    </td>
                    <td>
                        {this.addCommaToLargeNum(resultSearchroom[i].price)}
                    </td>
                </tr>
                </Link>
            );
        }
        if(resultSearchroom.length !== 0){
            resultSearch.push(
                <div>
                    <hr/>
                    ผลการค้นหา
                    <hr/>
                    <table>
                        {resultInfo}
                    </table>
                </div>
            )
        }
        return(
            <div>
                ราคาเดือนละ &nbsp;&nbsp;&nbsp;
                <select onChange={this.onChangeSelector}>
                    <option value='{"max":1000,"min":0}'>0-1,000</option>
                    <option value='{"max":3000,"min":1001}'>1,001-3,000</option>
                    <option value='{"max":6000,"min":3001}'>3,001-6,000</option>
                    <option value='{"max":10000,"min":6001}'>6,001-10,000</option>
                    <option value='{"max":99999999999,"min":10001}'>มากกว่า 10,000</option>
                </select>
                <button onClick={this.onSearchRoom}>ค้นหา</button>
                <div>
                    {resultSearch}
                </div>
            </div>
        )
    }
}

export default SearchRoom;
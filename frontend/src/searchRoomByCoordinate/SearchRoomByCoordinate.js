import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import './SearchRoom.css';
import AlertContainer from 'react-alert'

class SearchRoom extends React.Component{
    constructor(){
        super();
        this.state ={
            lat: 0,
            lng: 0,
            resultSearchRoom: [],
            showSearchRoom:false
        }
    }

    onChangeLat = (e) => {
        this.setState({
            lat: e.target.value
        })
    }
    onChangeLong = (e) => {
        this.setState({
            lng: e.target.value
        })
    }
    onSearchRoom = (e) => {
        this.setState({
            showSearchRoom: true
        })

        axios.get('http://localhost:8098/coordinateExchangeApi/getFromLatLng/'+this.state.lat+'/'+this.state.lng)
            .then(function (response) {
                console.log(response.data)
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
            let tel = [];
            for (var t =0;t<resultSearchroom[i].tel.length;t++){
                if(t !== 0){
                    tel.push(
                        <div key={t}>เบอร์ต่อ: {resultSearchroom[i].tel[t]}</div>
                    )
                }
                else {
                    tel.push(
                        resultSearchroom[i].tel[t]
                    )
                }
            }
            resultInfo.push(

                <tr key={i} onClick={() => this.onClickRoomInfo(i)}>
                    <Link key={i} to="../rentRoom" >
                        <td>
                            <p className="nameRoom">
                                {resultSearchroom[i].name}&nbsp;{resultSearchroom[i].location}
                            </p>
                        </td>
                        <td>
                            Tel:{tel}
                        </td>
                        <td>
                            {this.addCommaToLargeNum(resultSearchroom[i].price)}
                        </td>
                    </Link>
                </tr>

            );
        }
        if(resultSearchroom.length !== 0){
            resultSearch.push(
                <div key={i}>
                    <hr/>
                    ผลการค้นหา
                    <hr/>
                    <table>
                        {resultInfo}
                    </table>
                </div>
            )
        }
        else if(this.state.showSearchRoom) {
            resultSearch.push(
                <div key={i}>
                    <hr/>
                    ผลการค้นหา
                    <hr/>
                    <center>
                        ไม่มีห้องที่ค้นหา
                    </center>
                </div>
            )
        }

        return(
            <div>
                ค้นหาโดย Lat &nbsp;
                <input type="number" onChange={this.onChangeLat}/>
                &nbsp; Long &nbsp;
                <input type="number" onChange={this.onChangeLong}/> &nbsp;&nbsp;&nbsp;
                <button onClick={this.onSearchRoom}>ค้นหา</button>
                <div>
                    {resultSearch}
                </div>
                <div>
                    <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                </div>
            </div>
        )
    }
}

export default SearchRoom;
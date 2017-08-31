import React from 'react';
import axios from 'axios';
class reportRentRoom extends React.Component {
    constructor(){
        super();
        this.state =({
            monthReport : ''
        })
    }
    onChangeMonth = (e) =>{
        this.setState({
            monthReport: e.target.value
        })
    }

    onSearchReport = (e) =>{
        if(this.state.monthReport !== ''){
            console.log(this.state.monthReport)
            axios.post('http://localhost:8094/test',{
                month:this.state.monthReport
            })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div>
                รายงานการจองห้องของเดือน &nbsp;
                <input onChange={this.onChangeMonth} type="Month" />
                <button onClick={this.onSearchReport}>ค้นหา</button>
            </div>
        )
    }
}

export default reportRentRoom;
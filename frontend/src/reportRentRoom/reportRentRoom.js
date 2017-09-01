import React from 'react';
import axios from 'axios';
class reportRentRoom extends React.Component {
    constructor(){
        super();
        this.state =({
            monthReport : '',
            resultReport : [],
            searchReport:false
        })
    }
    onChangeMonth = (e) =>{
        this.setState({
            monthReport: e.target.value
        })
    }

    onSearchReport = (e) =>{
        this.setState({
            searchReport: true
        })
        if(this.state.monthReport !== ''){
            console.log(this.state.monthReport)
            axios.post('http://localhost:8094/test',{
                month:this.state.monthReport
            })
                .then(function (response) {
                    this.setState({
                        resultReport:response.data
                    })
                    console.log(response)
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {
        var resultReport = this.state.resultReport;
        var resultSearch = [];
        var resultInfo =[];
        for (var i = 0; i < resultReport.length; i++){
            resultInfo.push(
                <tr key={i}>
                        <td>
                            {resultReport[i].rentername}
                        </td>
                        <td>
                            {resultReport[i].room}
                        </td>
                        <td>
                            {resultReport[i].rentdate}
                        </td>
                </tr>

            );
        }
        if(resultReport.length !== 0){
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
        else if(this.state.searchReport) {
            resultSearch.push(
                <div key={i}>
                    <hr/>
                    ผลการค้นหา
                    <hr/>
                    <center>
                        ไม่มีรายงานผลการจองห้อง
                    </center>
                </div>
            )
        }
        return (
            <div>
                รายงานการจองห้องของเดือน &nbsp;
                <input onChange={this.onChangeMonth} type="Month" />
                <button onClick={this.onSearchReport}>ค้นหา</button>
                <div>
                    {resultSearch}
                </div>
            </div>
        )
    }
}

export default reportRentRoom;
import React from 'react';
import {Redirect}  from 'react-router'
import './RentRoom.css'
import Slider from 'react-slick';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';


class RentRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            redirect:''
        };
    }

    backToSearchRoom = (e) => {
        this.setState({
            redirect :  <Redirect to="/"/>
        })
    }
    onClickRentRoom = (e) => {
        if(localStorage.getItem("UserInfo") !== undefined && localStorage.getItem("UserInfo") !== null){
            let roomSelected = JSON.parse(window.sessionStorage.getItem("roomSelected"));
            axios.post('http://localhost:8092/RentRoom', {
                id: roomSelected._id,
                renter: localStorage.getItem("UserInfo")
            })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data === 'Reserved') {
                        this.setState({
                            redirect :  <Redirect to="/"/>
                        })
                    }
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            this.setState({
                redirect :  <Redirect to="/login"/>
            })
        }

    }

    addCommaToLargeNum = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        let Redirect = this.state.redirect;
        let roomSelected = JSON.parse(window.sessionStorage.getItem("roomSelected"));
        const images = [
            roomSelected.picture,
            roomSelected.picture,
            roomSelected.picture,
            roomSelected.picture,
            roomSelected.picture
        ];
        const {
            photoIndex,
            isOpen,
        } = this.state;

        var settings = {
            dots: true,
            className: 'center',
            slidesToShow: 3,
            speed: 500
        };

        return (
            <div className="RentRoom">
                {Redirect}
                <div>
                    ชื่อ : {roomSelected.name}
                </div>
                <div>
                    ขนาดห้อง :{roomSelected.roomSize}
                </div>
                <div>
                    ราคา : {this.addCommaToLargeNum(roomSelected.price)}
                </div>
                <div>
                    มัดจำ : {roomSelected.deposit}
                </div>
                <div>
                    Tel : {roomSelected.tel}
                </div>
                <div>
                    รูปห้อง asdsad
                </div>
                {/*<img src={roomSelected.picture}></img>*/}
                <div className='container'>
                    <Slider {...settings}>
                        <div onClick={() => this.setState({isOpen: true})}><img src={roomSelected.picture}/></div>
                        <div onClick={() => this.setState({isOpen: true})}><img src={roomSelected.picture}/></div>
                        <div onClick={() => this.setState({isOpen: true})}><img src={roomSelected.picture}/></div>
                        {isOpen &&
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                            onCloseRequest={() => this.setState({isOpen: false})}
                            onMovePrevRequest={() => this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })}
                            onMoveNextRequest={() => this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })}
                        />
                        }
                    </Slider>
                </div>

                <div>
                    <button onClick={this.onClickRentRoom}>
                        จอง
                    </button>
                    <button onClick={this.backToSearchRoom}>
                        กลับ
                    </button>
                </div>
            </div>



        )
    }
}

export default RentRoom;
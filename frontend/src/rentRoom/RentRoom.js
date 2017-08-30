import React from 'react';
import './RentRoom.css'
import Slider from 'react-slick';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';


class RentRoom extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }
    backToSearchRoom = (e) => {
        window.location = '/';
    }
    onClickRentRoom = (e) => {
        let roomSelected = JSON.parse(window.sessionStorage.getItem("roomSelected"));
        axios.post('http://localhost:8092/RentRoom',{
            id:roomSelected._id
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onClickPicture= (e) => {
        console.log("test");
    }

    render(){
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
            dots:true,
            className: 'center',
            slidesToShow: 3,
            speed: 500
        };

        return(
            <div>
                <div>
                    ชื่อ : {roomSelected.name}
                </div>
                <div>
                    ขนาดห้อง :{roomSelected.roomSize}
                </div>
                <div>
                    ราคา : {roomSelected.price}
                </div>
                <div>
                    มัดจำ : {roomSelected.deposit}
                </div>
                <div>
                    Tel : {roomSelected.tel}
                </div>
                <div>
                    รูปห้อง
                </div>
                {/*<img src={roomSelected.picture}></img>*/}
                <div className='container'>
                    <Slider {...settings}>
                        <div onClick={() => this.setState({ isOpen: true })}><img  src={roomSelected.picture} /></div>
                        <div onClick={() => this.setState({ isOpen: true })}><img  src={roomSelected.picture} /></div>
                        <div onClick={() => this.setState({ isOpen: true })}><img  src={roomSelected.picture} /></div>
                        {isOpen &&
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                            onCloseRequest={() => this.setState({ isOpen: false })}
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
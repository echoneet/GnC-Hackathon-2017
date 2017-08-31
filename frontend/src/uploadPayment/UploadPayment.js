import React from 'react';
import axios from 'axios';

class UploadPayment extends React.Component{

    constructor(){
        super();
        this.state ={
            file:""
        }
    }
    onChangeFile = (e) =>{
        this.setState({
            file: e.target.files
        })
    }


    onClickUpload = (e) =>{
        if(this.fileUpload.files[0] !== undefined) {
            resize(this.fileUpload.files[0], 200, 200, axiospost)

            function resize(file, maxWidth, maxHeight, postToServ) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (event) {
                    var dataUrl = event.target.result;

                    var image = new Image();
                    image.src = dataUrl;
                    image.onload = function () {
                        var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, 0.7);
                        postToServ(resizedDataUrl);
                    };
                };
            }

            function resizeImage(image, maxWidth, maxHeight, quality) {
                var canvas = document.createElement('canvas');

                var width = image.width;
                var height = image.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height * maxWidth / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width * maxHeight / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, width, height);
                return canvas.toDataURL("image/jpeg", quality);
            }
            function axiospost(result) {
                console.log(result)
                axios.post('http://localhost:8093/uploadPayment', {img: result})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        /*let a;
        if(this.fileUpload.files[0] !== undefined) {
            toBase64(this.fileUpload.files[0]);

            function toBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = function () {

                    a = reader.result
                    console.log(a);
                    axiospost(a);
                }
            }

            function axiospost(result) {
                console.log(result)
                axios.post('http://localhost:8093/uploadPayment', {img: result})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }*/


        /*var reader= new FileReader();
        reader.readAsDataURL(this.fileUpload.files[0])
        let a;
        reader.onload = function (axiospost) {

            a = reader.result
            console.log(a);
        }*/


        /*if(this.fileUpload.files[0] !== undefined){
            axios.post('http://localhost:8093/uploadPayment',{img : a})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }*/

    }
    render(){
        return(
            <div>

                <input id="file" type="file" ref={(ref) => this.fileUpload = ref} accept="image/*"></input>
                <button onClick={this.onClickUpload}>Upload</button>
            </div>
        )
    }
}

export default UploadPayment;
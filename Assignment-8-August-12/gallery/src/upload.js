import React, { Component } from "react";
import ImageDisplay from "./image";

export default class Upload extends Component {
  constructor() {
    super();
    this.state = {
      imageArray: [],
      tempImageArray: [],
     
    };
  }

  handleInput = (e) => {
    const files = Array.from(e.target.files);
    this.setState({ tempImageArray: files });
  };

  handleUpload = () => {
    console.log("Inside HandelUPload")
    const { tempImageArray} = this.state;
    console.log(tempImageArray.length)
    if (tempImageArray.length > 0) {
      const newImages = [];
      console.log("NewArray Created")
      tempImageArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          console.log("Pushing")
          if (newImages.length === tempImageArray.length) {
            this.setState((prevState) => ({
              imageArray: [...prevState.imageArray, ...newImages],
              tempImageArray: [],
             
            }));
          }
        };
        reader.readAsDataURL(file);
        console.log("File Read")
      });
    }
  };

  handleDelete = (index) => {
    this.setState((prevState) => ({
      imageArray: prevState.imageArray.filter((picObj, picIndex) => picIndex !== index),
    }));
  };

  clearImages = () => {
    this.setState({
      imageArray: [],
    });
  };

  render() {
    let count=0;
    return (
      <div className="uploadBox">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={this.handleInput}
        />
        <button onClick={this.handleUpload}>Upload</button>
        <button onClick={this.clearImages}>Clear</button>

        <div className="imageGallery">
          {this.state.imageArray.map((imgSrc,index) => (
            <ImageDisplay
              key={count++}
              imgSrc={imgSrc}
              index={index}
              handleDelete={()  => this.handleDelete(index)}
            />
          ))
          
          }
          
        </div>
      </div>
    );
  }
}

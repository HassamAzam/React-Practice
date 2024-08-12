import React, { Component } from "react";
import ImageDisplay from "./image";

export default class Upload extends Component {
  constructor() {
    super();
    this.state = {
      arr: [],
      images: [],
    };
  }

  handleInput = (e) => {
    const files = Array.from(e.target.files);
    this.setState({ images: files });
  };

  handleUpload = () => {
    const { images } = this.state;

    if (images.length > 0) {
      const newImages = [];

      images.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);

          if (newImages.length === images.length) {
            this.setState((prevState) => ({
              arr: [...prevState.arr, ...newImages],
              images: [],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  handleDelete = (index) => {
    this.setState((prevState) => ({
      arr: prevState.arr.filter((picObj, picIndex) => picIndex !== index),
    }));
  };

  clearImages = () => {
    this.setState({
      arr: [],
    });
  };

  render() {
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
          {this.state.arr.map((imgSrc, index) => (
            <ImageDisplay
              key={index}
              imgSrc={imgSrc}
              index={index}
              handleDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import uniqid from "uniqid";
import ImageDisplay from "./image";

export default class Upload extends Component {
  constructor() {
    super();
    this.state = {
      tempImageArray: [],        
      matrices: [],   
      images: [],     
    };
  }

  handleInput = (e) => {
    const files = Array.from(e.target.files).map(file => ({
      file,
      id: uniqid() 
    }));
    this.setState({ images: files });
  };

  handleUpload = async () => {
    const { images } = this.state;

    if (images.length > 0) {
      const newImages = [];
      const newMatrices = [];

      for (const { file, id } of images) {
        const imgSrc = await this.fileToDataURL(file);
        newImages.push({ src: imgSrc, id });

        const matrix = await this.fileToMatrix(file);
        newMatrices.push({ matrix, id });
      }

      this.setState((prevState) => ({
        tempImageArray: [...prevState.tempImageArray, ...newImages],
        matrices: [...prevState.matrices, ...newMatrices],
        images: [],
      }));
    }
  };

  fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  fileToMatrix = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
      };

      reader.onerror = (error) => reject(error);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        resolve(imageData.data);
      };

      reader.readAsDataURL(file);
    });
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      tempImageArray: prevState.tempImageArray.filter((img) => img.id !== id),
      matrices: prevState.matrices.filter((matrix) => matrix.id !== id),
    }));
  };

  clearImages = () => {
    this.setState({
      tempImageArray: [],
      matrices: [],
    });
  };

  rotateMatrix = (id) => {
    const { matrices, tempImageArray } = this.state;
    const matrixEntry = matrices.find((entry) => entry.id === id);
    const imgEntry = tempImageArray.find((entry) => entry.id === id);

    if (!matrixEntry || !imgEntry) return;

    
    const imgSrc = imgEntry.src;

    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = img.width;
      const height = img.height;
      canvas.width = height;
      canvas.height = width;

      ctx.translate(height / 2, width / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, -width / 2, -height / 2);

      const rotatedImgSrc = canvas.toDataURL();
      const newMatrices = matrices.map(entry =>
        entry.id === id
          ? { ...entry, matrix: this.fileToMatrix(new Blob([rotatedImgSrc])) }
          : entry
      );

      this.setState((prevState) => ({
        tempImageArray: prevState.tempImageArray.map((entry) =>
          entry.id === id ? { ...entry, src: rotatedImgSrc } : entry
        ),
        matrices: newMatrices,
      }));
    };
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
          {this.state.tempImageArray.map((imgObj) => (
            <ImageDisplay
              key={imgObj.id}
              imgSrc={imgObj.src}
              id={imgObj.id}
              handleDelete={this.handleDelete}
              rotateMatrix={this.rotateMatrix} 
            />
          ))}
        </div>
      </div>
    );
  }
}

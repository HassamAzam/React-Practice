import React, { Component } from "react";

class ImageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageName: `Uploaded ${props.id}`, 
      showPopup: false, 
    };
  }

  handleUpdate = () => {
    this.setState({ showPopup: true });
  };

  handleNameChange = (e) => {
    this.setState({ imageName: e.target.value });
  };



  handlePopupSubmit = () => {
    if (this.state.imageName.trim() !== "") {
      this.setState({ showPopup: false });
    }
  };

  handleDownload = () => {
    const { imgSrc } = this.props;
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = this.state.imageName; 
    link.click();
  };

  handleRotate = () => {
    const { id, rotateMatrix } = this.props;
    rotateMatrix(id); 
  };

  render() {
    const { imgSrc, id, handleDelete } = this.props;
    const { imageName, showPopup } = this.state;

    return (
      <div className="imageContainer">
        <img src={imgSrc} alt={imageName} />
        <p>{imageName}</p>
        <button onClick={() => handleDelete(id)}>Delete</button>
        <button onClick={this.handleUpdate}>Update</button>
        <button onClick={this.handleDownload}>Download</button>

        {showPopup && (
          <div className="popup">
            <input
              type="text"
              value={imageName}
              onChange={this.handleNameChange}
              placeholder="Enter new image name"
            />
            <button onClick={this.handlePopupSubmit}>Submit</button>
            <button onClick={this.handlePopupClose}>Cancel</button>
            <button onClick={this.handleRotate}>Rotate</button>
          </div>
        )}
      </div>
    );
  }
}

export default ImageDisplay;

import React, { Component } from "react";

class ImageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageName: `Uploaded ${this.props.index}`, 
      showPopup: false, 
    };
  }

  handleUpdate = () => {
    this.setState({ showPopup: true });
  };

  handleNameChange = (e) => {
    this.setState({ imageName: e.target.value });
  };

  handlePopupClose = () => {
    this.setState({ showPopup: false });
  };

  handlePopupSubmit = () => {
    if (this.state.imageName.trim() !== "") {
      this.handlePopupClose(); 
    }
  };

  handleDownload = () => {
    const { imgSrc } = this.props;
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = this.state.imageName; 
    link.click();
  };

  render() {
    const { imgSrc, index, handleDelete } = this.props;
    const { imageName, showPopup } = this.state;

    return (
      <div className="imageContainer">
        <img src={imgSrc} alt={imageName} />
        <p>{imageName}</p>
        <button onClick={() => handleDelete(index)}>Delete</button>
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
          </div>
        )}
      </div>
    );
  }
}

export default ImageDisplay;

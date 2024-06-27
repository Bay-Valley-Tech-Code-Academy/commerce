import React, { useState } from "react";
import "../scss/sellerdashboard.css";
import "../scss/styles.scss";

function SellerDashboard() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const handlePhotoUpload = (e) => {
    const uploadedPhotos = Array.from(e.target.files);
    setPhotos([...photos, ...uploadedPhotos]);
  };

  const handleVideoUpload = (e) => {
    const uploadedVideos = Array.from(e.target.files);
    setVideos([...videos, ...uploadedVideos]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div className="seller-dashboard-container">
      {/* Mobile Dashboard */}
      <div className="mobile-dashboard">
        <div className="col-12">
          <div className="dashboard-website-name">Baylist</div>
          <div className="dashboard-title-container">
            <div className="dashboard-title">Item for Sale</div>
            <a className="save-draft-button">Save Draft</a>
          </div>
          <div className="add-photos-button-container-container">
            <div className="add-photos-button-container">
              <div className="add-photos-button">Add Photos</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="required-forms-container">
              <div className="Required-forms">Required</div>
            </div>
            <div className="seller-input-container">
              <input placeholder="Title" className="seller-input-form" />
              <input placeholder="Price" className="seller-input-form" />
              <input placeholder="Category" className="seller-input-form" />
              <input placeholder="Condition" className="seller-input-form" />
              <input placeholder="Description" className="seller-input-form" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Dashboard */}
      <div className="desktop-dashboard">
        <div className="col-3">
          <div className="listing-header">
            <div className="item-name">Item for sale</div>
            <button className="save-draft-button">Save Draft</button>
          </div>
          <div className="media-upload-container">
            <div className="media-count">
              Photos • {photos.length} / 10, Videos • {videos.length} / 1
            </div>
            <div className="add-media">
              <button type="button" className="add-photo-button">
                <img src="../assets/baylistlogo.png" alt="Add Photos" />
                <b>Add Photos</b> or drag and drop
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                />
              </button>
              <div className="add-videos">
                <button type="button" className="add-video-button">
                  <img src="../assets/baylistlogo.png" alt="Add Videos" />
                  <b>Add Videos</b> or drag and drop
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                </button>
              </div>
            </div>
            <div className="required-section">
              <b>Required</b>
              <label>Step 1/3:</label>
              <div className="description-tip">
                Be as descriptive as possible.
              </div>
              <progress id="file" value="33" max="100">
                {" "}
                33%{" "}
              </progress>
            </div>
            <button className="next-button">Next</button>
          </div>
        </div>

        {/* Preview section */}
        <div className="col-5">
          <div className="preview-section">
            <div className="preview-image-container">Preview</div>
            <div className="preview-details-container">
              <h1>Your listing preview</h1>
              <h3>
                As you create your listing, you can preview how it will appear
                to others.
              </h3>
              <img
                src=""
                alt="Product Image Preview"
                className="preview-image"
              />
            </div>
          </div>
          <div className="seller-info">{/* Seller information section content */}</div>
        </div>

        {/* Listing specs */}
        <div className="listing-section col-3">
          <div className="product-details-container">
            <div className="seller-input-container">
              <div className="listing-title">
                <b>Title</b>
                <input
                  type="text"
                  placeholder="Title"
                  className="seller-input-form"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="listing-price">
                <b>Price</b>
                <input
                  type="text"
                  placeholder="Price"
                  className="seller-input-form"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="listing-duration">
                Listed *however long ago* in *location*
              </div>
              <div className="details-section">
                <b>Details</b>
                <textarea
                  placeholder="Description"
                  className="description-section"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <hr />
              <input
                type="text"
                placeholder="Category"
                className="seller-input-form"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                type="text"
                placeholder="Condition"
                className="seller-input-form"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

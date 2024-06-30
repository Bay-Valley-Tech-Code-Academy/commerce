import React, { useState, useEffect } from "react";
import "../scss/sellerdashboard.css";
import "../scss/styles.scss";

function SellerDashboard() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Collectibles & Art");
  const [condition, setCondition] = useState("New");
  const [location, setLocation] = useState("Location.");

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prevImages => [...prevImages, ...newImages]);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${latitude},${longitude}&format=json`;

          fetch(nominatimUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.length > 0) {
                const firstResult = data[0];
                const city = firstResult.address?.city || firstResult.display_name.split(",")[2].trim();
                const state = firstResult.address?.state || firstResult.display_name.split(",")[4].trim();
                setLocation(`${city}, ${state}.`);
              }
            })
            .catch((error) => {
              console.warn(`Error fetching location data from Nominatim: ${error.message}`);
            });
        },
        (error) => {
          console.warn(`Error getting location: ${error.message}`);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="seller-dashboard-container">
      <div className="desktop-dashboard">
        <div className="listing-column">
          <div className="listing-header">
            <div className="item-name">Item for sale</div>
            <button className="save-draft-button">Save Draft</button>
          </div>
          <div className="media-upload-container">
            <div className="media-count">
              Photos • {uploadedImages.length} of 10
            </div>
            <div className="add-media">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="custom-file-upload">
                Add Photos
              </label>
            </div>
            <div className="required-section">
              <b>Required</b>
              <div className="description-tip">
                Be as descriptive as possible.
              </div>
              <div className="seller-input-container">
                <input
                  type="text"
                  className="seller-input-form"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="number"
                  className="seller-input-form"
                  placeholder="Enter Price ($)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  maxLength="8"
                />
                <textarea
                  className="seller-input-form"
                  placeholder="Enter Detailed Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="category-select"><b>Category</b></label>
                <select
                  id="category-select"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Collectibles and Art">Collectibles & Art</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports & Outdoors">Sports & Outdoors</option>
                  <option value="Toys & Games">Toys & Games</option>
                </select>
                <label htmlFor="condition-select"><b>Condition</b></label>
                <select
                  id="condition-select"
                  name="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Used - Like New">Used - Like New</option>
                  <option value="Used - Good">Used - Good</option>
                  <option value="Used - Fair">Used - Fair</option>
                  <option value="Used - Poor">Used - Poor</option>
                  <option value="For Parts or Not Working">For Parts or Not Working</option>
                </select>
              </div>
            </div>
            <div className="progress-section">
              <hr />
              <div className="progress-bar-container">
                <progress className="progress-bar" id="file" value="50" max="100">
                  50%
                </progress>
              </div>
              <hr />
              <div className="next-button-container">
                <button className="next-button">Next</button>
              </div>
            </div>
          </div>
        </div>
        <div className="preview-container col-8">
          <div className="preview-section">
            <div className="preview-section-image-container">
              {uploadedImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt="Product Image Preview"
                  className="preview-image"
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                />
              ))}
            </div>
            <div className="preview-details-container">
              <h1 className="preview-h1">Your listing preview</h1>
              <h3 className="preview-h3">
                As you create your listing, you can preview how it will appear to others.
              </h3>
            </div>
          </div>
          <div className="listing-section col-3">
            <div className="product-details-container">
              <div className="seller-preview-container">
                <div className="preview-listing-title">
                  <b>Title</b> {title}
                </div>
                <div className="preview-listing-price">
                  ${price}
                </div>
                <div className="preview-listing-duration">
                  Listed (2 seconds ago) in {location}
                </div>
                <div className="preview-listing-details-section">
                  <b>Details</b>
                </div>
                <div className="preview-listing-description-section">
                  {description}
                </div>
                <hr />
                <div className="preview-listing-category-section">
                  <b>Category:</b> {category}
                </div>
                <div className="preview-listing-condition-section">
                  <b>Condition:</b> {condition}
                </div>
              </div>
            </div>
            <hr />
            <div className="seller-info">
              Seller Info
            </div>
            <button className="message-seller-button">Message Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

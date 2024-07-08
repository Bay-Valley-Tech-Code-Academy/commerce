import React, { useState, useEffect, useRef } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index
  const [progress, setProgress] = useState(0); // Progress percentage

  const PROGRESS_WEIGHTS = {
    images: 20,
    title: 20,
    price: 20,
    description: 20,
    category: 10,
    condition: 10,
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "condition":
        setCondition(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    updateProgress();
  }, [uploadedImages, title, price, description, category, condition]);

  const updateProgress = () => {
    let totalProgress = 0;
    if (uploadedImages.length > 0) totalProgress += PROGRESS_WEIGHTS.images;
    if (title) totalProgress += PROGRESS_WEIGHTS.title;
    if (price > 0) totalProgress += PROGRESS_WEIGHTS.price;
    if (description) totalProgress += PROGRESS_WEIGHTS.description;
    if (category) totalProgress += PROGRESS_WEIGHTS.category;
    if (condition) totalProgress += PROGRESS_WEIGHTS.condition;

    setProgress(totalProgress);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (imageUrl) => {
    setUploadedImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image !== imageUrl);
      // Adjust current index if necessary
      if (currentIndex >= updatedImages.length && updatedImages.length > 0) {
        setCurrentIndex(updatedImages.length - 1);
      } else if (updatedImages.length === 0) {
        setCurrentIndex(0);
      }
      return updatedImages;
    });
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? uploadedImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === uploadedImages.length - 1 ? 0 : prevIndex + 1
    );
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
                const city =
                  firstResult.address?.city ||
                  firstResult.display_name.split(",")[2].trim();
                const state =
                  firstResult.address?.state ||
                  firstResult.display_name.split(",")[4].trim();
                setLocation(`${city}, ${state}.`);
              }
            })
            .catch((error) => {
              console.warn(
                `Error fetching location data from Nominatim: ${error.message}`
              );
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
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
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
                  placeholder="Title of Product"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="number"
                  className="seller-input-form"
                  placeholder="Enter Price (USD $)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  maxLength="5"
                />
                <textarea
                  className="seller-input-form"
                  placeholder="Enter Detailed Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="category-select">
                  <b>Category</b>
                </label>
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
                <label htmlFor="condition-select">
                  <b>Condition</b>
                </label>
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
                  <option value="For Parts or Not Working">
                    For Parts or Not Working
                  </option>
                </select>
              </div>
            </div>
            <div className="progress-section">
              <hr />
              <div className="progress-bar-container">
                <progress
                  className="progress-bar"
                  id="file"
                  value={progress}
                  max="100"
                >
                  {progress}%
                </progress>
              </div>
              <hr />
              <div className="next-button-container">
                <button className="next-button">Next</button>
              </div>
            </div>
          </div>
        </div>
        <div className="preview-container">
          <div className="preview-section">
            <div className="preview-section-image-container">
              {uploadedImages.length > 0 && (
              <div className="slideshow-container">
                {/* Left arrow */}
                <button className="prev" onClick={handlePrevImage}>
                  &#10094;
                </button>

                {/* Image display */}
                <div className="image-preview">
                  <img
                    src={uploadedImages[currentIndex]}
                    alt="Product Image Preview"
                    className="preview-image"
                  />
                  <button onClick={() => handleRemoveImage(uploadedImages[currentIndex])}>Remove</button>
                </div>

                {/* Right arrow */}
                <button className="next" onClick={handleNextImage}>
                  &#10095;
                </button>
              </div>
              )}
            </div>
            <div className="preview-details-container">
              {/* Conditionally render the preview details container */}
              {uploadedImages.length === 0 && (
                <div className="preview-details-container">
                  <h1 className="preview-h1">Your listing preview</h1>
                  <h3 className="preview-h3">
                    As you create your listing, you can preview how it will appear to others.
                  </h3>
                </div>
              )}
            </div>
          </div>
          <div className="listing-section col-3">
            <div className="product-details-container">
              <div className="seller-preview-container">
                <div className="preview-listing-title">
                  <b>Title</b> {title}
                </div>
                <div className="preview-listing-price">${price}</div>
                { /* THIS SECTION IS TO BE UPDATED LATER WHEN POSTING IS WORKING ACCURATELY */}
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
            <div className="seller-info">Seller Info</div>
            <button className="message-seller-button">Message Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

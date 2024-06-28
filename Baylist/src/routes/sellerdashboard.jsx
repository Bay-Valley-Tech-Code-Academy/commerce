import "../scss/sellerdashboard.css";
import "../scss/styles.scss";
import React, { useState, useEffect } from "react";

function SellerDashboard() {
  // Assuming a function to get uploaded image URLs (replace with your implementation)
  const getUploadedImageURLs = () => {
    // Logic to retrieve uploaded image URLs from your application state or storage
    return ["image1.jpg", "image2.png"]; // Replace with actual URLs
  };

  // State variables for form data
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("New");
  const [location, setLocation] = useState("Location."); // State for location

  // Update functions for form fields
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };


  // Function to handle location retrieval using Nominatim geocoding API
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
                const city = firstResult.address?.city || firstResult.display_name.split(',')[2].trim();
                const state = firstResult.address?.state || firstResult.display_name.split(',')[4].trim();
                setLocation(`${city}, ${state}.`);
              } else {
                console.warn("No location data found from Nominatim response.");
                // Handle case where no location data is available (e.g., display a fallback message)
              }
            })
            .catch((error) => {
              console.warn(`Error fetching location data from Nominatim: ${error.message}`);
              // Handle API request errors gracefully (e.g., display a fallback message)
            });
        },
        (error) => {
          console.warn(`Error getting location: ${error.message}`);
          // Handle location retrieval error (e.g., permission denied)
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
      // Handle case where geolocation is not supported
    }
  };

  // Get location on component mount
  useEffect(() => {
    getLocation();
  }, []);


  // Get location on component mount (optional)
  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="seller-dashboard-container">
      {/* Desktop Dashboard */}
      <div className="desktop-dashboard">
        <div className="listing-column">
          {/* Listing Header */}
          <div className="listing-header">
            <div className="item-name">Item for sale</div>
            <button className="save-draft-button">Save Draft</button>
          </div>
          {/* Media Upload */}
          <div className="media-upload-container">
            <div className="media-count">
              Photos • {getUploadedImageURLs().length} / 10, Videos • # / 1
            </div>
            <div className="add-media">
              <button type="submit" className="add-photo-button">
                <img src="../assets/baylistlogo.png" alt="Baylist Logo" />
                <b>Add Photos</b> or drag and drop
              </button>
              <div className="add-videos">
                <button type="submit" className="add-video-button">
                  <img src="../assets/baylistlogo.png" alt="Baylist Logo" />
                  <b>Add Videos</b> or drag and drop
                </button>
              </div>
            </div>
            <div className="required-section">
              <b>Required</b>
              <div className="description-tip">
                Be as descriptive as possible.
              </div>
              <div className="seller-input-container">
                <div className="listing-title">
                  <input
                    type="text"
                    className="seller-input-form"
                    placeholder="Title"
                    value={title} // Update title with state variable
                    onChange={handleTitleChange} // Trigger update on change
                  />
                </div>
                <div className="listing-price">
                  <input
                    type="number"
                    className="seller-input-form"
                    placeholder="Enter Price ($)"
                    value={price} // Update price with state variable
                    onChange={handlePriceChange} // Trigger update on change
                    min="0"
                    maxLength="8"
                  />
                </div>
                <div className="details-section">
                  <b>Description</b>
                </div>
                <div className="description-section">
                  <textarea
                    className="seller-input-form"
                    placeholder="Enter Detailed Description"
                    value={description} // Update description with state variable
                    onChange={handleDescriptionChange} // Trigger update on change
                  />
                </div>
                <label htmlFor="listing-category-select"><b>Category</b></label>
                <select
                  id="condition-select"
                  name="category"
                  value={category} // Update category with state variable
                  onChange={handleCategoryChange} // Trigger update on change
                >
                  <option value="Collectibles and Art">Collectibles & Art</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports & Outdoors">Sports & Outdoors</option>
                
                <option value="Toys & Games">Toys & Games</option>
                </select>
                <label htmlFor="listing-condition-select"><b>Condition</b></label>
                <select
                  id="condition-select"
                  name="condition"
                  value={condition} // Update condition with state variable
                  onChange={handleConditionChange} // Trigger update on change
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

        {/* Preview Section */}
        <div className="preview-container col-8">
          <div className="preview-section">
            {/* Preview Image Container */}
            <div className="preview-section-image-container">
              {/* Loop through uploaded image URLs and display them */}
              {getUploadedImageURLs().map((imageUrl) => (
                <img
                  key={imageUrl} // Add a unique key for each image
                  src={imageUrl}
                  alt="Product Image Preview"
                  className="preview-image"
                />
              ))}
            </div>

            {/* Preview Details Container */}
            <div className="preview-details-container">
              <h1 className="preview-h1">Your listing preview</h1>
              <h3 className="preview-h3">
                As you create your listing, you can preview how it will appear
                to others.
              </h3>
            </div>
          </div>

          {/* Preview section listing users given specs */}
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
            {/* Seller Information Section (add your content here) */}
            <div className="seller-info">
              {/* Seller information section content */}
              Seller Info
            </div>
            {/* Call to action button (optional) */}
            <button className="message-seller-button">Message Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

// Assuming a function to get product description (replace with your implementation)
const getProductDescription = () => {
  // Logic to retrieve product description from your application state or user input
  return "This is a detailed description of the awesome product.";
};

import "../scss/sellerdashboard.css";
import "../scss/styles.scss";

function SellerDashboard() {
  // Assuming a function to get uploaded image URLs (replace with your implementation)
  const getUploadedImageURLs = () => {
    // Logic to retrieve uploaded image URLs from your application state or storage
    return ["image1.jpg", "image2.png"]; // Replace with actual URLs
  };

  // Assuming a function to get product details (replace with your implementation)
  const getProductTitle = () => {
    // Logic to retrieve product title from your application state or user input
    return "Product Name";
  };

  const getProductCategory = () => {
    // Logic to retrieve product category from your application state or user input
    return "Electronics";
  };

  const getProductCondition = () => {
    // Logic to retrieve product condition from your application state or user input
    return "New";
  };

  const getProductLocation = () => {
    // Logic to retrieve product location from your application state or user input
    return "San Francisco, CA";
  };

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
              <div className="description-tip">Be as descriptive as possible.</div>
              <div className="seller-input-container">
                <div className="listing-title">
                    <input type="text" className="seller-input-form" placeholder="Title" />
                </div>
                <div className="listing-price">
                    <input type="number" className="seller-input-form" placeholder="Enter Price" />
                </div>
                <div className="details-section">
                    <b>Description</b>
                </div>
                <div className="description-section">
                    <textarea className="seller-input-form" placeholder="Enter Detailed Description"></textarea>
                </div>
                <div className="listing-category">
                    <input type="text" className="seller-input-form" placeholder="Category" />
                </div>
                <div className="listing-condition">
                    <input type="text" className="seller-input-form" placeholder="Condition" />
                </div>
                <div className="listing-condition">
                    <input type="text" className="seller-input-form" placeholder="Condition" />
                </div>
                <div className="listing-condition">
                    <input type="text" className="seller-input-form" placeholder="Condition" />
                </div>
                <div className="listing-condition">
                    <input type="text" className="seller-input-form" placeholder="Condition" />
                </div>
                <div className="listing-condition">
                    <input type="text" className="seller-input-form" placeholder="Condition" />
                </div>
                </div>
            </div>
            <hr />
            <div className="progress-section">
                <div className="progress-bar-container">
                    <progress className="progress-bar" id="file" value="50" max="100">50%</progress>
                </div>
                <hr />
                <div className="next-button-container">
                    <button className="next-button">Next</button>
                </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="col-5">
          <div className="preview-section">
            {/* Preview Image Container */}
            <div className="preview-image-container">
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
              <h1>Your listing preview</h1>
              <h3>
                As you create your listing, you can preview how it will appear
                to others.
              </h3>
            </div>
          </div>
          {/* Seller Information Section (add your content here) */}
          <div className="seller-info">
            {/* Seller information section content */}
          </div>
        </div>

        {/* Listing Specs */}
        <div className="listing-section col-3">
          <div className="product-details-container">
            <div className="seller-input-container">
              <div className="listing-title">
                <b>Title</b>: {getProductTitle()}
              </div>
              <div className="listing-price">Price</div>
              <div className="listing-duration">
                Listed *however long ago* in {getProductLocation()}
              </div>
              
              <div className="details-section">
                <b>Details</b>
              </div>
              <div className="description-section">{getProductDescription()}</div>
              <hr />
              <input
                placeholder="Category"
                className="seller-input-form"
                value={getProductCategory()} // Pre-fill with retrieved category
                readOnly // Make category non-editable (optional)
              />
              <input
                placeholder="Condition"
                className="seller-input-form"
                value={getProductCondition()} // Pre-fill with retrieved condition
                readOnly // Make condition non-editable (optional)
              />
            </div>
          </div>
            {/* Call to action button (optional) */}
            <button className="message-seller-button">Message Seller</button>
        </div>
      </div>
    </div>
  );
}

// Assuming a function to get product description (replace with your implementation)
const getProductDescription = () => {
  // Logic to retrieve product description from your application state or user input
  return "This is a detailed description of the awesome product.";
};

export default SellerDashboard;

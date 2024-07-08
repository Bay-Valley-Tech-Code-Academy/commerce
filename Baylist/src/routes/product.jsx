import fakeProductImage from '../assets/duck-product.jpg'
import "../scss/product.css"

function ProductDetail() {

    return (
<main>
        {/* Column 1 */}
    <div className="container">
        <div className="row">
            <div className="col-4">
                <img src={fakeProductImage} className="product-image"/>
            </div>
        {/* {Column 2} */}
            <div className="col-4">
                <div className="item-name-container">
                    <div className="item-name">Item Name</div>
                </div>    
                <div className="rating-stats-container"> 
                    <div className="rating-count">{25} Reviews</div>
                    <div className="avg-rating"> Avg Rating: {5} Stars</div>
                </div>
                <a href="" className="seller-name-container">
                    <div className="seller-Name">Seller Name</div>
                </a>    
                <div className="price-container">
                    <div className="price">${50}</div>
                </div>    
                <div className="description-container">
                    <div className="description">This is a really super duper long description about this item that is so good. You should definitely buy it, because if you do I get 5% of the profits!!!</div>
                </div>
            </div>
        {/* {Column 3} */}
            <div className="col-3">
                <div className="buying-buttons-container">
                    <div className="shipping-date-container">
                        <div className="shipping-date"> Estimated Shipping Date: June 31</div>
                    </div>
                    <a href="" className="add-to-cart-button-container">
                        <div className="add-to-cart-button">Add To Cart</div>
                    </a>
                    <a href="" className="buy-now-button-container">
                        <div className="buy-now-button">Buy Now</div>
                    </a>
                    <a href="" className="add-to-favorites-button-container">
                        <div className="add-to-favorites-button">Add to Favorites</div>
                    </a>
                </div>    
            </div>
        </div>
        <div className="row">
                    <div className="col-md-12">
                         <div className="user-reviews">User Reviews</div>
                        <div className="review-card-container">
                            <div className="review-card"><p>5 Stars</p> User 1: Yeah I liked it</div>
                            <div className="review-card"><p>4 Stars</p>Charles Brown: Works great, but arrived slightly damaged</div>
                            <div className="review-card"><p>5 Stars</p> User 3: Arrived working fantastic!</div>
                            <div className="review-card"><p>1 Star</p> User 4: Im a hater so 1 star</div>
                        </div>  
                    </div>
        </div>            
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</main>
    );
}
export default ProductDetail;
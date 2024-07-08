import "../scss/search.css"
import fakeProductImage from '../assets/duck-product.jpg'
function Search() {
    return (
            <div className="searched-items-container">
                <div className="searched-item">
                    <img className="searched-item-image" src={fakeProductImage}></img>
                    <div className="searched-item-stats-container">
                        <div className="searched-item-title">Wide Leg Pants</div>
                        <div className="searched-item-rating">Rating</div>
                        <div className="searched-item-price">Price</div>
                    </div>
                </div>
                <div className="searched-item">
                    <img className="searched-item-image" src={fakeProductImage}></img>
                    <div className="searched-item-stats-container">
                        <div className="searched-item-title">Water Bottle</div>
                        <div className="searched-item-rating">Rating</div>
                        <div className="searched-item-price">Price</div>
                    </div>
                </div>
                <div className="searched-item">
                    <img className="searched-item-image" src={fakeProductImage}></img>
                    <div className="searched-item-stats-container">
                        <div className="searched-item-title">Wrench</div>
                        <div className="searched-item-rating">Rating</div>
                        <div className="searched-item-price">Price</div>
                    </div>
                </div>
                <div className="searched-item">
                    <img className="searched-item-image" src={fakeProductImage}></img>
                    <div className="searched-item-stats-container">
                        <div className="searched-item-title">2009 Honda Accord</div>
                        <div className="searched-item-rating">Rating</div>
                        <div className="searched-item-price">Price</div>
                    </div>
                </div>
                <div className="searched-item">
                    <img className="searched-item-image" src={fakeProductImage}></img>
                    <div className="searched-item-stats-container">
                        <div className="searched-item-title">Pokemon Card</div>
                        <div className="searched-item-rating">Rating</div>
                        <div className="searched-item-price">Price</div>
                    </div>
                </div>
                <div className="searched-item">
                    <img className="searched-item-image" src={fakeProductImage}></img>
                    <div className="searched-item-stats-container">
                        <div className="searched-item-title">Apple Headphones</div>
                        <div className="searched-item-rating">Rating</div>
                        <div className="searched-item-price">Price</div>
                    </div>
                </div>
                <div className="searched-item">
                    <img className="searched-item-image" src={fakeProductImage}></img>
                    <div className="searched-item-stats-container">
                        <div className="searched-item-title">Cordless Phone</div>
                        <div className="searched-item-rating">Rating</div>
                        <div className="searched-item-price">Price</div>
                    </div>
                </div>
                <div className="searched-item">
                    <img className="searched-item-image" src={fakeProductImage}></img>
                    <div className="searched-item-stats-container">
                        <div className="searched-item-title">Rubber Duck</div>
                        <div className="searched-item-rating">Rating</div>
                        <div className="searched-item-price">Price</div>
                    </div>
                </div>
                
            </div>
    );
}
export default Search;
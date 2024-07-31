import "../scss/home.css"
import fakeProductImage from '../assets/duck-product.jpg'

function Home() {
    return (
        <div className="home-main">
            <div className="row">
                <div className="seasonal-items-title">Seasonal Deals</div>
                <div className="seasonal-items-container">
                    <div className="seasonal-item">
                        <img className="seasonal-item-image" src={fakeProductImage}></img>
                        <div className="seasonal-item-stats-container">
                            <div className="seasonal-item-title">Rubber Duck</div>
                            <div className="seasonal-item-price">$40</div>
                        </div>
                    </div>
                    <div className="seasonal-item">
                        <img className="seasonal-item-image" src={fakeProductImage}></img>
                        <div className="seasonal-item-stats-container">
                            <div className="seasonal-item-title">Rubber Duck</div>
                            <div className="seasonal-item-price">$40</div>
                        </div>
                    </div>
                    <div className="seasonal-item">
                        <img className="seasonal-item-image" src={fakeProductImage}></img>
                        <div className="seasonal-item-stats-container">
                            <div className="seasonal-item-title">Rubber Duck</div>
                            <div className="seasonal-item-price">$40</div>
                        </div>
                    </div>
                    <div className="seasonal-item">
                        <img className="seasonal-item-image" src={fakeProductImage}></img>
                        <div className="seasonal-item-stats-container">
                            <div className="seasonal-item-title">Rubber Duck</div>
                            <div className="seasonal-item-price">$40</div>
                        </div>
                    </div>
                    <div className="seasonal-item">
                        <img className="seasonal-item-image" src={fakeProductImage}></img>
                        <div className="seasonal-item-stats-container">
                            <div className="seasonal-item-title">Rubber Duck</div>
                            <div className="seasonal-item-price">$40</div>
                        </div>
                    </div>
                    <div className="seasonal-item">
                        <img className="seasonal-item-image" src={fakeProductImage}></img>
                        <div className="seasonal-item-stats-container">
                            <div className="seasonal-item-title">Rubber Duck</div>
                            <div className="seasonal-item-price">$40</div>
                        </div>
                    </div>
                </div>         
            </div>
           <div className="row">
            <p>Search Bar</p>
           </div>
           <div className="row">
                <div className="popular-items-title">Popular Items</div>
                <div className="popular-items-container">
                    <div className="popular-item">
                        <img className="popular-item-image" src={fakeProductImage}></img>
                        <div className="popular-item-stats-container">
                            <div className="popular-item-title">Rubber Duck</div>
                            <div className="popular-item-price">$40</div>
                        </div>
                    </div>
                    <div className="popular-item">
                        <img className="popular-item-image" src={fakeProductImage}></img>
                        <div className="popular-item-stats-container">
                            <div className="popular-item-title">Rubber Duck</div>
                            <div className="popular-item-price">$40</div>
                        </div>
                    </div>
                    <div className="popular-item">
                        <img className="popular-item-image" src={fakeProductImage}></img>
                        <div className="popular-item-stats-container">
                            <div className="popular-item-title">Rubber Duck</div>
                            <div className="popular-item-price">$40</div>
                        </div>
                    </div>
                    <div className="popular-item">
                        <img className="popular-item-image" src={fakeProductImage}></img>
                        <div className="popular-item-stats-container">
                            <div className="popular-item-title">Rubber Duck</div>
                            <div className="popular-item-price">$40</div>
                        </div>
                    </div>
                    <div className="popular-item">
                        <img className="popular-item-image" src={fakeProductImage}></img>
                        <div className="popular-item-stats-container">
                            <div className="popular-item-title">Rubber Duck</div>
                            <div className="popular-item-price">$40</div>
                        </div>
                    </div>
                    <div className="popular-item">
                        <img className="popular-item-image" src={fakeProductImage}></img>
                        <div className="popular-item-stats-container">
                            <div className="popular-item-title">Rubber Duck</div>
                            <div className="popular-item-price">$40</div>
                        </div>
                    </div>
                </div>         
            </div>
        </div>
    );
}
export default Home;
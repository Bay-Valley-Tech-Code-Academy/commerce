import './favorites.scss'; // Import styles
import image from '../assets/duck-product.jpg'; //sample image

    const Favorites = () => {
        return (
            <div className="favorites-container">
                <div className="favorites-tab bg-secondary text-white">Favorites</div>
                <div className="cards-wrapper d-flex flex-wrap bg-light-grey">
                    {/* Card 1 */}
                    <div className="card">
                        <img src={image} className="card-img-top" alt="Item 1"/>
                        <div className="card-body">
                            <h5 className="card-title">Item 1 Title</h5>
                            <p className="card-text">Item 1 description text goes here.</p>
                            <div className="rating">
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="fa fa-star-o">&#9734;</span> {/* Example for 4 stars */}
                            </div>
                            <p className="card-price">$29.99</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card">
                        <img src={image} className="card-img-top" alt="Item 2" />
                        <div className="card-body">
                            <h5 className="card-title">Item 2 Title</h5>
                            <p className="card-text">Item 2 description text goes here.</p>
                            <div className="rating">
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="fa fa-star-o">&#9734;</span> {/* Example for 3 stars */}
                                <span className="fa fa-star-o">&#9734;</span>
                            </div>
                            <p className="card-price">$24.99</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="card">
                        <img src={image} className="card-img-top" alt="Item 3" />
                        <div className="card-body">
                            <h5 className="card-title">Item 3 Title</h5>
                            <p className="card-text">Item 3 description text goes here.</p>
                            <div className="rating">
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="fa fa-star-o text-black">&#9734;</span> {/* Example for 2 stars */}
                                <span className="fa fa-star-o">&#9734;</span>
                                <span className="fa fa-star-o">&#9734;</span>
                            </div>
                            <p className="card-price">$19.99</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="card">
                        <img src={image} className="card-img-top" alt="Item 4" />
                        <div className="card-body">
                            <h5 className="card-title">Item 4 Title</h5>
                            <p className="card-text">Item 4 description text goes here.</p>
                            <div className="rating">
                                <span className="star fa fa-star text-warning">&#9733;</span>
                                <span className="fa fa-star-o">&#9734;</span> {/* Example for 1 star */}
                                <span className="fa fa-star-o">&#9734;</span>
                                <span className="fa fa-star-o">&#9734;</span>
                                <span className="fa fa-star-o">&#9734;</span>
                            </div>
                            <p className="card-price">$14.99</p>
                        </div>
                    </div>
                </div>
                <div className="add-list-button">
                    <button className="btn btn-primary rounded-pill">Add List +</button>
                </div>
            </div>
        );
    }

    export default Favorites;
import './Footer.css'; // Import CSS for styling
import { Link } from 'react-router-dom';
import '../scss/styles.scss' //Import SCSS styling variables

/*The footer is NOT OPTIMIZED for screens smaller than 767px, might need to fix if have time*/

const Footer = () => {
    return (
        <footer className="bg-dark-purple text-center text-white footer-fixed footerstyle">
            {/* Grid container */}
            <div className="container p-4">

                {/* Section: Form */}
                <section>
                    <form action="">
                        {/* Grid row */}
                        <div className="row justify-content-center">
                            {/* Grid column */}
                            <div className="col-auto">
                                <p className="pt-2">
                                    <strong>Sign up for our newsletter</strong>
                                </p>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-md-5 col-12">
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <input type="email" id="form5Example24" className="form-control" placeholder="Enter email" />
                                </div>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-auto">
                                {/* Submit button */}
                                <button type="submit" className="text-white btn btn-outline btn-darkslateblue shadow mb-4">
                                    Subscribe
                                </button>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </form>
                </section>
                {/* Section: Form */}

                {/* Section: Text */}
                <section className="mb-4">
                    <p>
                        My app links for the website are below.
                    </p>
                </section>
                {/* Section: Text */}

                {/* Section: Links */}
                <section>
                    {/* Grid row */}
                    <div className="row justify-content-center">
                        {/* Grid column */}
                        <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ol className="list-unstyled mb-0">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/account">Account</Link>
                                </li>
                                <li>
                                    <Link to="/notifications">Notifications</Link>
                                </li>
                            </ol>
                        </div>
                        {/* Grid column */}

                        {/* Grid column */}
                        <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link to="/cart">Cart</Link>
                                </li>
                                <li>
                                    <Link to="/search">Search</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                                <li>
                                    <Link to="/favorites">Favorites</Link>
                                </li>
                            </ul>
                        </div>
                        {/* Grid column */}

                        {/* Grid column */}
                        <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link to="/checkout">Checkout</Link>
                                </li>
                                <li>
                                    <Link to="/product/:id">ProductDetail</Link>
                                </li>
                                <li>
                                    <Link to="/user/:username">Userpage</Link>
                                </li>
                                <li>
                                    <Link to="/seller-dashboard">SellerDashboard</Link>
                                </li>
                            </ul>
                        </div>
                        {/* Grid column */}
                    </div>
                    {/* Grid row */}
                </section>
                {/* Section: Links */}

            </div>
            {/* Grid container */}

            {/* Copyright */}
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                © 2024 Copyright: Boolean Bandicoots 🦊
            </div>
            {/* Copyright */}
        </footer>
   
    )
}

export default Footer;

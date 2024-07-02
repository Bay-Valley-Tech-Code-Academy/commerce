import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
    const location = useLocation();

    return (
        <div className="gradient-bg d-flex flex-column justify-content-center align-items-center vh-100 position-relative" style={{ width: '100vw' }}>
            <h2 className="text-white">Signup</h2>
            <p className="text-white">Current Pathname: {location.pathname}</p>
            <div className="card p-4" style={{ width: '100%', maxWidth: '400px', background: 'rgba(255, 255, 255, 0.9)' }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="signupFirstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="signupFirstName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="signupLastName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="signupEmail" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="signupPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign up</button>
                </form>
                <button type="button" className="btn btn-link text-primary mt-3" style={{ paddingLeft: 0 }}>Forgot your password? Reset here</button>
            </div>
            <button type="button" className="btn btn-outline-light mt-3">Already have an account? Log in here</button>
            <style jsx>{`
                .gradient-bg {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #E4CCFF, #7322DA);
                    overflow: hidden; /* Ensures circles do not overflow */
                    position: relative;
                }
                .gradient-bg::before,
                .gradient-bg::after {
                    content: '';
                    position: absolute;
                    border-radius: 50%;
                }
                .gradient-bg::before {
                    top: 60%;
                    left: 70%;
                    width: 150px;
                    height: 150px;
                    background-color: #AB6BFF; /* Dark purple color */
                }
                .gradient-bg::after {
                    top: 10%;
                    left: 20%;
                    width: 200px;
                    height: 200px;
                    background-color: #E4CCFF; /* Light purple color */
                }
            `}</style>
        </div>
    );
}

export default Signup;

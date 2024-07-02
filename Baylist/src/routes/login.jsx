import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const location = useLocation();

    return (
        <div className="gradient-bg d-flex flex-column justify-content-center align-items-center vh-100 position-relative" style={{ width: '100vw' }}>
            <h1 className="text-white">Login</h1>
            <p className="text-white">Current Pathname: {location.pathname}</p>
            <div className="card p-4" style={{ width: '100%', maxWidth: '400px', background: 'rgba(255, 255, 255, 0.9)' }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="loginEmail" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="loginPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign in</button>
                </form>
            </div>
            <button type="button" className="btn btn-outline-light mt-3">Don't have an account? Sign up here</button>
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
                    top: 20%;
                    left: 20%;
                    width: 150px;
                    height: 150px;
                    background-color: #E4CCFF; /* Dark purple color */
                }
                .gradient-bg::after {
                    top: 50%;
                    left: 70%;
                    width: 200px;
                    height: 200px;
                    background-color: #AB6BFF; /* Light purple color */
                }
            `}</style>
        </div>
    );
}

export default Login;






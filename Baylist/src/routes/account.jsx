import "../scss/account.css"
import spiderMan from "../assets/literally-spiderman.jpg"
function Account() {

    return (
            <div className="account-page">
                <div className="profile-picture-container">
                    <img src={spiderMan} className="profile-picture"></img>
                </div>
                <div className="account-info-container">
                    <div className="input-group mb-3">
                        <div className="account-info-forms-container">
                            <p className="account-form-label">Name:</p>
                            <div className="account-info-form">
                            <input type="text" className="form-control" placeholder="Name"></input>
                            <button className="btn btn-success" type="button">Change</button>
                            </div>
                            <p className="account-form-label">Email:</p>
                            <div className="account-info-form">
                            <input type="text" className="form-control" placeholder="Email"></input>
                            <button className="btn btn-success" type="button">Change</button>
                            </div>
                            <p className="account-form-label">Password:</p>
                            <div className="account-info-form">
                            <input type="text" className="form-control" placeholder="Password"></input>
                            <button className="btn btn-success" type="button">Change</button>
                            </div>
                            <p className="account-form-label">Shipping Address:</p>
                            <div className="account-info-form">
                            <input type="text" className="form-control" placeholder="Shipping Address"></input>
                            <button className="btn btn-success" type="button">Change</button>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
    );
}
export default Account;
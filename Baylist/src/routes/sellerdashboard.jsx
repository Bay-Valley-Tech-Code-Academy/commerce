import "../scss/sellerdashboard.css"
import "../scss/styles.scss"
function SellerDashboard() {

    return (
        <main>
            <div className="seller-dashboard-container">
                <div className="row">
                    <div className="col-12">
                        <div className="dashboard-website-name">Baylist</div>
                        <div className="dashboard-title-container">
                            <div className="dashboard-title">Item for Sale</div>
                            <a href="" className="save-draft-button">Save Draft</a>
                        </div>   
                        <div className="add-photos-button-container-container">
                        <a href="" className="add-photos-button-container">
                            <div className="add-photos-button">Add Photos</div>
                        </a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="required-forms-container">    
                            <div className="Required-forms">Required</div>
                        </div>
                        <div className="seller-input-container">
                            <input placeholder="Title" className="seller-input-form"></input>
                            <input placeholder="Price" className="seller-input-form"></input>
                            <input placeholder="Category" className="seller-input-form"></input>
                            <input placeholder="Condition" className="seller-input-form"></input>
                            <input placeholder="Description" className="seller-input-form"></input>
                        </div>
                    </div>
                </div>
            </div>
        </main>    
    );
}
export default SellerDashboard;
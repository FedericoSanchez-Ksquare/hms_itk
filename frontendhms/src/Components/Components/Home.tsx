import { Link } from "react-router-dom";
import "../layoutComponent/home.css";
import phone from "../../img/phone.svg";
import bandage from "../../img/bandage_adhesive.svg";
import payment from "../../img/bills.svg";

const Home = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="placeholder1">
          <div className="placeholder2">
            <div className="card-container">
              <div className="card">
                <div className="card_top">
                  <img src={phone} alt="" />
                </div>
                <h1>Contact information:</h1>
                <br />
                <p>Phone: 999-hospital-number</p>
                <p>Email: hospital@hotmail.com</p>
              </div>
              <div className="card">
                <div className="card_top">
                  <img src={bandage} alt="" />
                </div>
                <h1>Schedule an appointment here!</h1>
                <div>
                  <Link to="/dashboard">
                    <button className="btn_dashboard">
                      {" "}
                      Schedule an appoinment
                    </button>
                  </Link>
                </div>
              </div>

              <div className="card">
                <div className="card_top">
                  <img src={payment} alt="" />
                </div>
                <h1>Learn about our payment methods!</h1>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Home;

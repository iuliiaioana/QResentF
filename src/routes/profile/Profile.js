import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import "./Profile.scss";
import "../../styles/shadow.scss"

export default function Profile() {

  let history = useHistory();
  const [userData, setUserData] = useState({
    nume: "",
    prenume: "",
    grupa: "",
  });

  if (localStorage.getItem("status") !== "loggedIn") {
    history.push("/login");
  }
  useEffect(() => {
    let token = JSON.parse(localStorage['token']);
    fetch('http://127.0.0.1:5000/user/' + token.user_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => setUserData(data));
  }, []);

  console.log(userData);

  return (
    <div className="flex-container shadow-dreamy">
      <div className="flex-item column-container">
        <div className="cell-item">
          <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" />
        </div>
        <div className="cell-item">
          <h2>{userData.nume} {userData.prenume}</h2>
          <h3>Automatica si Calculatoare</h3>
          <h4>{userData.grupa}</h4>
        </div>
      </div>
      <div className="flex-item column-container">
        <h3>Other info later</h3>
      </div>
      <div className="flex-item">

      </div>
    </div>
  );
}
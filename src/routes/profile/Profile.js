import * as React from 'react';
import { useHistory } from "react-router-dom";

import "./Profile.scss";
import "../../styles/shadow.scss"

export default function Profile() {

  let history = useHistory();

  if (localStorage.getItem("status") !== "loggedIn") {
    history.push("/login");
  }

  return (
    <div className="flex-container shadow-dreamy">
      <div className="flex-item column-container">
        <div className="cell-item">
          <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" />
        </div>
        <div className="cell-item">
          <h2>Roinita Lucian-Teodor</h2>
          <h3>Automatica si Calculatoare</h3>
          <h4>342C5</h4>
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
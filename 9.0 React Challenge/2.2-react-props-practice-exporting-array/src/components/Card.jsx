import React from "react";
import { contacts } from "../contacts";

function Card(props) {
  return (
    // <div className="card">
    //   <h2>{props.name}</h2>
    //   <img src={props.img} alt="avatar_img" />
    //   <p>{props.tel}</p>
    //   <p>{props.email}</p>
    // </div>

    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <img className="circle-img" src={props.img} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p className="info">{props.tel}</p>
        <p className="info">{props.email}</p>
      </div>
    </div>
  );
}

export default Card;

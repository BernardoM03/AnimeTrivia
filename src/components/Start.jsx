import React from "react";

export default function Start(props) {

    return (
        <div className="start">
            <h1 className="start--header">Anime Trivia</h1>
            <p className="start--desc">Enter the number of trivia questions you would like to answer</p>
            <input className="start--input "type="text" onChange={props.handleChange} placeholder="5" required />
            <button className="start--btn" onClick={props.startQuiz}>Start Here</button>
        </div>
    );
}
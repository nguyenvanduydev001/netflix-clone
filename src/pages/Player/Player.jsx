import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: ""
    })

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTBjMDIzMDg5ZWMyODY4MmQ5ZGExMDM1YTJiNjc4NiIsInN1YiI6IjY2NGFhYzc1NjA0MmRiODBhOTJjOGNjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yhUUTvJs625bU_jOE73YW60UOJx6YPjG7bVb6Wj8ZZE",
        },
    };

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            options
        )
            .then((response) => response.json())
            .then((response) => setApiData(response.results[0]))
            .catch((err) => console.error(err));
    }, [])



    return (
        <div className="player">
            <img src={back_arrow_icon} alt="" onClick={() => { navigate(-2) }} />
            <iframe
                width="90%"
                height="90%"
                src={`https://www.youtube.com/embed/${apiData.key}`}
                title="trailer"
                frameborder="0"
                allowFullScreen
            ></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    );
};

export default Player;

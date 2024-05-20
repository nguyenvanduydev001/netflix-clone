import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCards = ({ title, category }) => {
    const [apiData, setApiData] = useState([]);
    const cradsRef = useRef();

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTBjMDIzMDg5ZWMyODY4MmQ5ZGExMDM1YTJiNjc4NiIsInN1YiI6IjY2NGFhYzc1NjA0MmRiODBhOTJjOGNjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yhUUTvJs625bU_jOE73YW60UOJx6YPjG7bVb6Wj8ZZE",
        },
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cradsRef.current.scrollLeft += event.deltaY;
    };
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
            options
        )
            .then((response) => response.json())
            .then((response) => setApiData(response.results))
            .catch((err) => console.error(err));

        cradsRef.current.addEventListener("wheel", handleWheel);
    }, []);
    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cradsRef}>
                {apiData.map((card, index) => {
                    return (
                        <div className="card" key={index}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                                alt=""
                            />
                            <p>{card.original_title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TitleCards;

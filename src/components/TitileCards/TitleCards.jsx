import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cradsRef = useRef();

  const API_KEY = "REACT_APP_API_KEY";
  const ACCESS_TOKEN = "REACT_APP_ACCESS_TOKEN";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cradsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?api_key=${API_KEY}&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results) {
          setApiData(response.results);
        } else {
          console.error("Error fetching data:", response);
        }
      })
      .catch((err) => console.error(err));

    cradsRef.current.addEventListener("wheel", handleWheel);
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cradsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt=""
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;

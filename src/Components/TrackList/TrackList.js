import classes from "./TrackList.module.css";
import { top50Id } from "../../config";
import React, { useState, useEffect } from "react";
import TrackLi from "./TrackLi";
import Loader from "../LoadingSpinner/Loader";
import { useParams } from "react-router-dom";
import { options } from "../../config";
const TrackList = (props) => {
  const [TracksData, setTracksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const id = props.id ? props.id : params.tracklistId;

  async function fetchTrending() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=100`,
        options
      );
      const data = await response.json();

      setTracksData(data.items);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTrending();
  }, []);

  let colArr = [];
  for (let i = 0; i < 6; i++) {
    const trendingCol = TracksData.slice(i * 5, (i + 1) * 5).map((elem) => {
      return (
        <TrackLi
          key={elem.track.id}
          id={elem.track.id}
          title={elem.track.name}
          imgUrl={
            elem.track.album.images[2] ? elem.track.album.images[2].url : ""
          }
          artists={elem.track.artists
            .map((elem) => {
              return elem.name;
            })
            .join(", ")}
        />
      );
    });
    colArr.push(trendingCol);
  }
  return (
    <section className={classes.trending}>
      {isLoading && <Loader />}
      {!isLoading && (
        <React.Fragment>
          <h3>{props.title}</h3>
          <div className={classes.row}>
            {colArr.map((elem) => {
              return (
                <div className={classes.col}>
                  <ul>{elem}</ul>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
export default TrackList;

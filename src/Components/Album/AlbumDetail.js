import classes from "./AlbumDetail.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlbumLi from "./AlbumLi";
import Loader from "../LoadingSpinner/Loader";
import { options } from "../../config";
const AlbumDetail = () => {
  const [albumData, setAlbumData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const id = params.albumId;

  async function fetchAlbumData() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/albums/?ids=${id}`,
        options
      );
      const data = await response.json();

      setAlbumData(data.albums[0]);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchAlbumData();
  }, []);
  let tracksList = [];
  if (albumData.tracks) {
    tracksList = albumData.tracks.items.map((elem, i) => {
      return (
        <AlbumLi
          key={elem.id}
          id={elem.id}
          serialNo={i + 1}
          title={elem.name}
          artists={elem.artists.map((elem) => elem.name).join(", ")}
          duration={elem.duration_ms}
        />
      );
    });
  }

  return (
    <section className={classes.albumDetailSec}>
      {isLoading && <Loader />}
      {!isLoading && (
        <React.Fragment>
          <div className={classes.row}>
            <img
              className={classes.albumImg}
              alt=""
              src={albumData.images ? albumData.images[1].url : ""}
            />
            <div className={classes.info}>
              <h2 className={classes.heading}>{albumData.name}</h2>
              <p className={classes.label}>{albumData.label}</p>
              <p className={classes.artist}>
                {albumData.artists
                  ? albumData.artists.map((elem) => elem.name).join(", ")
                  : ""}
              </p>
              <p className={classes.stats}>
                {`${albumData.total_tracks} songs `}&#9679;
                {` Released on: ${albumData.release_date}`}
              </p>
            </div>
          </div>
          <div className={classes.tracksSec}>
            <ul>{tracksList}</ul>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
export default AlbumDetail;

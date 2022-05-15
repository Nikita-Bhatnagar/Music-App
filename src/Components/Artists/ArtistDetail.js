import classes from "./ArtistDetail.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackLi from "../TrackList/TrackLi";
import PlayListCard from "../Playlist/PlayListCard";
import Loader from "../LoadingSpinner/Loader";
import { options } from "../../config";
const ArtistDetail = () => {
  const params = useParams();
  const id = params.artistId;
  const [artistDetailsData, setArtistDetailsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [genreData, setGenreData] = useState([]);
  async function fetchartistDetails() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}`,
        options
      );
      const data = await response.json();

      setArtistDetailsData(data.data.artist);
    } catch (err) {
      console.error(err);
    }
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/artists/?ids=${id}`,
        options
      );
      const data = await response.json();

      setGenreData(response.artists[0].genres);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchartistDetails();
  }, []);

  let colArr = [];
  if (artistDetailsData.discography) {
    for (let i = 0; i < 2; i++) {
      const trendingCol = artistDetailsData.discography.topTracks.items
        .slice(i * 5, (i + 1) * 5)
        .map((elem) => {
          return (
            <TrackLi
              key={elem.track.id}
              id={elem.track.id}
              title={elem.track.name}
              imgUrl={
                elem.track.album.coverArt.sources[1]
                  ? elem.track.album.coverArt.sources[1].url
                  : ""
              }
              artists={elem.track.artists.items
                .map((elem) => {
                  return elem.profile.name;
                })
                .join(", ")}
            />
          );
        });
      colArr.push(trendingCol);
    }
  }
  let cardsArr = [];
  if (artistDetailsData.discography) {
    cardsArr = artistDetailsData.discography.singles.items.map((i) => {
      const elem = i.releases.items[0];
      return (
        <PlayListCard
          key={elem.id}
          id={elem.id}
          songType="album"
          imgUrl={elem.coverArt.sources[0].url}
          title={elem.name}
          label={elem.label}
        />
      );
    });
  }
  return (
    <section className={classes.artistDetailSec}>
      {isLoading && <Loader />}
      {!isLoading && (
        <React.Fragment>
          <div className={classes.row}>
            <img
              className={classes.artistImg}
              alt=""
              src={
                artistDetailsData.visuals
                  ? artistDetailsData.visuals.avatarImage.sources[0].url
                  : ""
              }
            />
            <div className={classes.info}>
              <p className={classes.title}>
                {artistDetailsData.profile
                  ? artistDetailsData.profile.name
                  : ""}
              </p>
              <p className={classes.followers}>
                {`${
                  artistDetailsData.stats
                    ? artistDetailsData.stats.followers
                    : ""
                } followers`}
              </p>
              <div className={classes.btnRow}>
                {genreData.map((elem) => {
                  return (
                    <button className={classes.btn} type="button">
                      {elem}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={classes.topTracks}>
            <h3>Top tracks</h3>
            <div className={classes.listrow}>
              {colArr.map((elem) => {
                return (
                  <div className={classes.col}>
                    <ul>{elem}</ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.singles}>
            <h3>Singles</h3>
            <div className={classes.singlesRow}>{cardsArr}</div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
export default ArtistDetail;

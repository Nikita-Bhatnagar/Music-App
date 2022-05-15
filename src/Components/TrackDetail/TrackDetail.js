import classes from "./TrackDetail.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../LoadingSpinner/Loader";
import { options } from "../../config";
const TrackDetail = () => {
  const [lyricsData, setLyricsData] = useState([]);
  const [trackData, setTrackData] = useState({});
  const [displayFullLyrics, setDisplayFullLyrics] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const id = params.trackId;

  async function fetchTrackDetails() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/tracks/?ids=${id}`,
        options
      );
      const data = await response.json();

      setTrackData(data.tracks[0]);
    } catch (err) {
      console.error(err);
    }

    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/track_lyrics/?id=${id}`,
        options
      );
      const data = await response.json();

      setLyricsData(data.lyrics);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchTrackDetails();
  }, []);

  function fullLyricsHandler(event) {
    setDisplayFullLyrics(true);
  }
  const min = (+trackData.duration_ms / 60000).toFixed(0);
  const sec = ((+trackData.duration_ms / 10000) % 60).toFixed(0);
  let artists = "";
  if (trackData.artists) {
    artists = trackData.artists
      .map((elem) => {
        return elem.name;
      })
      .join(", ");
  }
  let lyrics;
  if (lyricsData && lyricsData.lines) {
    if (!displayFullLyrics) {
      lyrics = lyricsData.lines.slice(0, 6).map((elem, i) => {
        return (
          <p className={classes.line} key={i}>
            {elem.words}
          </p>
        );
      });
    } else {
      lyrics = lyricsData.lines.map((elem, i) => {
        return (
          <p className={classes.line} key={i}>
            {elem.words}
          </p>
        );
      });
    }
  } else {
    lyrics = "Lyrics not available";
  }

  return (
    <section className={classes.trackDetailsSec}>
      {isLoading && <Loader />}
      {!isLoading && (
        <React.Fragment>
          {" "}
          <div className={classes.row}>
            <img
              className={classes.trackImg}
              src={trackData.album ? trackData.album.images[1].url : ""}
              alt=""
            />
            <div className={classes.info}>
              <p className={classes.title}>{trackData.name}</p>
              <p className={classes.artists}>{artists}</p>
              <p className={classes.stats}>
                <span className={classes.releaseDate}>
                  {`Release date: ${
                    trackData.album ? trackData.album.release_date : ""
                  } `}{" "}
                  &#9679;
                </span>
                <span
                  className={classes.duration}
                >{`${min} min ${sec} sec`}</span>
              </p>
              <div className={classes.btnRow}>
                <a href={trackData.preview_url} target="_blank">
                  <button type="button" className={classes.btn}>
                    Preview
                  </button>
                </a>
                <a
                  href={
                    trackData.external_urls
                      ? trackData.external_urls.spotify
                      : ""
                  }
                  target="_blank"
                >
                  <button type="button" className={classes.btn}>
                    Listen
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className={classes.lyrics}>{lyrics}</div>
          {!displayFullLyrics && lyricsData && (
            <p className={classes.fullLyrics} onClick={fullLyricsHandler}>
              Read full lyrics
            </p>
          )}
        </React.Fragment>
      )}
    </section>
  );
};
export default TrackDetail;

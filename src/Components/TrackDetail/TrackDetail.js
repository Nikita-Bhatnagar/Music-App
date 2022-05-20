import classes from "./TrackDetail.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../LoadingSpinner/Loader";
import { options } from "../../config";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
const TrackDetail = () => {
  const [lyricsData, setLyricsData] = useState([]);
  const [trackData, setTrackData] = useState({});
  const [displayFullLyrics, setDisplayFullLyrics] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timelinePosition, setTimelinePosition] = useState("0");
  const [muted, setMuted] = useState(false);
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
  const audioRef = useRef();
  const timelineRef = useRef();

  function toggleAudio(event) {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }
  function audioEnded() {
    audioRef.current.pause();
    setIsPlaying(false);
  }
  function changeTimelinePosition() {
    const percentagePosition =
      (100 * audioRef.current.currentTime) / audioRef.current.duration;
    const backgroundSize = `${percentagePosition}% 100%`;
    setTimelinePosition(`${percentagePosition}`);
  }
  function changeSeek() {
    const time = (timelineRef.current.value * audioRef.current.duration) / 100;

    audioRef.current.currentTime = time;
  }
  function toggleSound() {
    setMuted((prevState) => {
      return !prevState;
    });
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
          <div className={classes.audioPlayer}>
            <div className={classes.audioInfo}>
              <div className={classes.audioRow}>
                <img
                  className={classes.audioInfoImg}
                  src={trackData.album ? trackData.album.images[2].url : ""}
                  alt=""
                />
                <div className={classes.info}>
                  <p>{trackData.name}</p>
                  <p>{artists}</p>
                </div>
              </div>
            </div>
            <div className={classes.audioControls}>
              <audio
                ref={audioRef}
                src={trackData.preview_url}
                onEnded={audioEnded}
                onTimeUpdate={changeTimelinePosition}
                muted={muted}
              ></audio>
              <div className={classes.controls}>
                <button className={classes.playBtn} onClick={toggleAudio}>
                  {!isPlaying && <BsPlayCircle className={classes.playerBtn} />}
                  {isPlaying && <BsPauseCircle className={classes.playerBtn} />}
                </button>
                <input
                  style={{ backgroundSize: `${timelinePosition}% 100%` }}
                  type="range"
                  ref={timelineRef}
                  className={classes.timeline}
                  max="100"
                  value={timelinePosition}
                  onChange={changeSeek}
                />
                <button className={classes.soundBtn} onClick={toggleSound}>
                  {!muted && <GiSpeaker className={classes.playerBtn} />}
                  {muted && <GiSpeakerOff className={classes.playerBtn} />}
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
export default TrackDetail;

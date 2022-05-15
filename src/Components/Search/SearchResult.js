import classes from "./SearchResult.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayListCard from "../Playlist/PlayListCard";
import TrackLi from "../TrackList/TrackLi";
import ArtistCard from "../Artists/ArtistCard";
import Loader from "../LoadingSpinner/Loader";
import { options } from "../../config";
const SearchResult = () => {
  const params = useParams();
  const query = params.query;
  const [resultsData, setResultsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  async function fetchSearchResult() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`,
        options
      );
      const data = await response.json();

      setResultsData(data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchSearchResult();
  }, [query]);

  //FOR TRACKS
  let tracks = [];
  if (resultsData.tracks) {
    for (let i = 0; i < 2; i++) {
      let j = resultsData.tracks.items.length;
      const trendingCol = resultsData.tracks.items
        .slice((i * j) / 2, ((i + 1) * j) / 2)
        .map((elem) => {
          return (
            <TrackLi
              key={elem.data.id}
              id={elem.data.id}
              title={elem.data.name}
              imgUrl={
                elem.data.albumOfTrack.coverArt.sources[1]
                  ? elem.data.albumOfTrack.coverArt.sources[1].url
                  : ""
              }
              artists={elem.data.artists.items
                .map((elem) => {
                  return elem.profile.name;
                })
                .join(", ")}
            />
          );
        });
      tracks.push(trendingCol);
    }
  }

  //FOR PLAYLISTS
  let playlist = [];
  if (resultsData.playlists) {
    playlist = resultsData.playlists.items.map((elem) => {
      return (
        <PlayListCard
          key={elem.data.uri.slice(17)}
          id={elem.data.uri.slice(17)}
          owner={elem.data.owner.name}
          title={elem.data.name}
          imgUrl={elem.data.images.items[0].sources[0].url}
          description={elem.data.description}
        />
      );
    });
  }

  //FOR ARTISTS
  let artists = [];
  if (resultsData.artists) {
    artists = resultsData.artists.items.map((elem) => {
      return (
        <ArtistCard
          key={elem.data.uri.slice(15)}
          id={elem.data.uri.slice(15)}
          a_name={elem.data.profile.name}
          img={
            elem.data.visuals.avatarImage
              ? elem.data.visuals.avatarImage.sources[1].url
              : "https://us.123rf.com/450wm/razihusin/razihusin1604/razihusin160400004/56945441-women-singing-under-spotlight.jpg?ver=6"
          }
        />
      );
    });
  }

  //FOR ALBUMS
  let albums = [];
  if (resultsData.albums) {
    albums = resultsData.albums.items.map((elem) => {
      return (
        <PlayListCard
          key={elem.data.uri.slice(14)}
          id={elem.data.uri.slice(14)}
          songType="album"
          imgUrl={elem.data.coverArt.sources[0].url}
          title={elem.data.name}
          label={elem.data.artists.items.map((elem) => elem.profile.name)}
        />
      );
    });
  }
  let i = 0;
  return (
    <section className={classes.resultsSec}>
      {isLoading && <Loader />}
      {!isLoading && (
        <React.Fragment>
          <div className={classes.sec}>
            <h3 className={classes.heading}>Songs</h3>
            <div className={classes.listrow}>
              {tracks.map((elem) => {
                return (
                  <div key={i++} className={classes.col}>
                    <ul>{elem}</ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.sec}>
            <h3 className={classes.heading}>PlayLists</h3>
            <div className={classes.row}>{playlist}</div>
          </div>
          <div className={classes.sec}>
            <h3 className={classes.heading}>Artists</h3>
            <div className={classes.row}>{artists}</div>
          </div>
          <div className={classes.sec}>
            <h3 className={classes.heading}>Albums</h3>
            <div className={classes.row}>{albums}</div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
export default SearchResult;

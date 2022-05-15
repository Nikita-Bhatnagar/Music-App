import classes from "./Playlist.module.css";
import React, { useState, useEffect } from "react";
import Loader from "../LoadingSpinner/Loader";
import { options } from "../../config";
import PlayListCard from "./PlayListCard";
const Playlist = (props) => {
  const [playlistData, setPlaylistData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPlayList() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://spotify23.p.rapidapi.com/search/?q=bollywood&type=playlists&offset=0&limit=50&numberOfTopResults=5",
        options
      );
      const data = await response.json();

      setPlaylistData(data.playlists.items);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchPlayList();
  }, []);

  const ownedBySpotify = playlistData.filter((elem) => {
    if (elem.data.owner.name === "Spotify") return elem;
  });
  const ownedByCommunity = playlistData.filter((elem) => {
    if (elem.data.owner.name !== "Spotify") return elem;
  });
  let cardsData = props.owner === "Spotify" ? ownedBySpotify : ownedByCommunity;
  cardsData = [...cardsData.splice(0, 5)];
  const cards = cardsData.map((elem) => {
    const id = elem.data.uri.slice(17);

    return (
      <PlayListCard
        key={id}
        id={id}
        owner={elem.data.owner.name}
        title={elem.data.name}
        imgUrl={elem.data.images.items[0].sources[0].url}
        description={elem.data.description}
      />
    );
  });
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={classes.playlist}>
          <h3 className={classes.playListName}>
            {props.owner === "Spotify"
              ? "Recommended Playlists"
              : "From the community"}
          </h3>
          <div className={classes.row}>{cards}</div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Playlist;

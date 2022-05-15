import Header from "../../Components/Header/Header";
import Artists from "../../Components/Artists/Artists";
import TrackList from "../../Components/TrackList/TrackList";
import classes from "./Wrapper.module.css";
import Playlist from "../../Components/Playlist/Playlist";
import TrackDetail from "../../Components/TrackDetail/TrackDetail";
import ArtistDetail from "../../Components/Artists/ArtistDetail";
import AlbumDetail from "../../Components/Album/AlbumDetail";
import SearchResult from "../../Components/Search/SearchResult";
import { Routes, Route } from "react-router-dom";
import React from "react";
const Wrapper = () => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Artists />
              <Playlist owner="Spotify" />
              <TrackList id="37i9dQZEVXbLZ52XmnySJg" title="Trending Top 50" />
              <Playlist owner="community" />
              <TrackList id="37i9dQZF1DWUH2AzNQzWua" title="Old Classics" />
            </React.Fragment>
          }
        />
        <Route path="/track/:trackId" element={<TrackDetail />} />
        <Route path="/tracklist/:tracklistId" element={<TrackList />} />
        <Route path="artist/:artistId" element={<ArtistDetail />} />
        <Route path="/album/:albumId" element={<AlbumDetail />} />
        <Route path="/search/:query" element={<SearchResult />} />
      </Routes>
    </div>
  );
};
export default Wrapper;

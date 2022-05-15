import classes from "./PlayListCard.module.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlayListCard = (props) => {
  const listType = props.songType === "album" ? "album" : "tracklist";

  return (
    <Link to={`/${listType}/${props.id}`} replace="true">
      <div className={classes.card}>
        <img src={props.imgUrl} alt="" className={classes.cardImg} />
        <p className={classes.name}>{props.title}</p>
        <p className={classes.description}>
          {props.songType === "album"
            ? props.label
            : props.owner === "Spotify"
            ? props.description
            : props.owner}
        </p>
      </div>
    </Link>
  );
};
export default React.memo(PlayListCard);

import classes from "./TrackLi.module.css";
import { Link } from "react-router-dom";
const TrackLi = (props) => {
  return (
    <li className={classes.trendingListItem}>
      <Link to={`/track/${props.id}`}>
        <div className={classes.row}>
          <img src={props.imgUrl} alt="" className={classes.trendingImg} />
          <div className={classes.info}>
            <p className={classes.title}>{props.title}</p>
            <p className={classes.artists}>{props.artists}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default TrackLi;

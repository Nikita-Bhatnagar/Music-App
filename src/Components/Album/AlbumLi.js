import classes from "./AlbumLi.module.css";
import { Link } from "react-router-dom";
const AlbumLi = (props) => {
  const min = (+props.duration / 60000).toFixed(0);
  const sec = ((+props.duration / 1000) % 60).toFixed(0);
  return (
    <li>
      <Link to={`/track/${props.id}`}>
        <div className={classes.row}>
          <div className={classes.col}>
            <p className={classes.title}>
              <span className={classes.serialNo}>{props.serialNo}</span>
              {props.title}
            </p>
          </div>
          <div className={classes.col}>
            <p>{props.artists}</p>
          </div>
          <div className={`${classes.col} ${classes.col3}`}>
            <p>{`${min} min ${sec} sec`}</p>
          </div>
        </div>
      </Link>
      <hr className={classes.horizontalLine} />
    </li>
  );
};
export default AlbumLi;

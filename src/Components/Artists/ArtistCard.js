import classes from "./ArtistCard.module.css";
import { Link } from "react-router-dom";
const ArtistCard = (props) => {
  const followers = (+props.followers / 1000000).toFixed(1);
  return (
    <Link to={`/artist/${props.id}`}>
      <div className={classes.artistCard}>
        <img src={props.img} alt={props.name} className={classes.artistImg} />
        <p className={classes.artistName}>{props.a_name}</p>
        {props.followers && (
          <p className={classes.followers}>{followers}M followers</p>
        )}
      </div>
    </Link>
  );
};
export default ArtistCard;

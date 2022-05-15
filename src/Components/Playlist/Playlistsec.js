import { playListIds } from "../../config";
import classes from "./Playlistsec.module.css";
import PlayListCard from "./PlayListCard";
function Playlistsec() {
  const playlists = playListIds.map((elem) => {
    return <PlayListCard id={elem} key={elem} />;
  });
  return (
    <div className={classes.playlistSec}>
      <h3>Recommended playlists</h3>
      <div className={classes.row}>{playlists}</div>
    </div>
  );
}
export default Playlistsec;

import classes from "./Artists.module.css";
import ArtistCard from "./ArtistCard";
import Loader from "../LoadingSpinner/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { artistIds } from "../../config";
import { options } from "../../config";
const Artists = () => {
  const [artistData, setArtistData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ids = artistIds.join(",");

  async function fetchArtists() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/artists/?ids=${ids}`,
        options
      );
      const data = await response.json();

      setArtistData(data.artists);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchArtists();
  }, []);

  const artists = artistData.map((elem) => {
    return (
      <ArtistCard
        key={elem.id}
        id={elem.id}
        a_name={elem.name}
        img={elem.images[0].url}
        followers={elem.followers.total}
      />
    );
  });

  return (
    <section className={classes.artists}>
      <h3>Top Artists</h3>
      {isLoading && <Loader />}
      {!isLoading && <div className={classes.row}>{artists}</div>}
    </section>
  );
};
export default Artists;

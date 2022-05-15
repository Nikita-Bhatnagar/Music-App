import herosectionimg from "../../images/bgImg.jpg";
import classes from "./heroSection.module.css";
import { useRef } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const query = searchInputRef.current.value;

    if (query.trim() !== "") navigate(`search/${query}`);
    searchInputRef.current.value = "";
  }
  return (
    <div className={classes.heroSection}>
      <div className={`${classes.col} ${classes.imgCol}`}>
        <img src={herosectionimg} alt="" className={classes.heroSecImg} />
      </div>
      <div className={classes.col}>
        <h1 className={classes.heading}>Music is life itself . . .</h1>
        <hr className={classes.hr} />
        <p className={classes.quote}>
          Music expresses feeling and thought, without language; it was below
          and before speech, and it is above and beyond all words.
        </p>
        <p className={classes.para}>We've got the music !!!</p>
        <div className={classes.search}>
          <HiSearch className={classes.searchIcon} />
          <form onSubmit={submitHandler}>
            <input
              type="search"
              className={classes.searchInput}
              ref={searchInputRef}
              placeholder="Search for albums, artists, tracks and more..."
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;

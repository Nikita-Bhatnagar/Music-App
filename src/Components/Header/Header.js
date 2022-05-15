import Navbar from "../Navbar/Navbar";
import HeroSection from "../HeroSection/HeroSection";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <div className={classes.header}>
      <Navbar />
      <HeroSection />
    </div>
  );
};
export default Header;

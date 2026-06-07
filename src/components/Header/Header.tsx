// import CSS module
import styles from "./Header.module.css";
import logoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/">
                <img src={logoImage} alt="logo" />
            </Link>
        </header>
    );
};

export default Header;
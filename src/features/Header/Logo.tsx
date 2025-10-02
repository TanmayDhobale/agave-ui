import { Link } from "@tanstack/react-router";
import AgaveLogo from "../../assets/agave.png";
import styles from "./logo.module.css";

export default function Logo() {
  return (
    <Link to="/" className={styles.logoLink}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src={AgaveLogo}
          alt="Agave Validator Dashboard"
        />
        <div className={styles.logoText}>
          <div className={styles.logoTitle}>Agave</div>
          <div className={styles.logoSubtitle}>Validator Dashboard</div>
        </div>
      </div>
    </Link>
  );
}

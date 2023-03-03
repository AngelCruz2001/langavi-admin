import styles from "./Navbar.module.scss";

import { ProfileCircle } from "@/components";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ProfileCircle />
    </nav>
  );
};

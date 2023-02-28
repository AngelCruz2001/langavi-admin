import styles from "./Sidebar.module.scss";
import { ProfileBox } from "../profile/ProfileBox";
import { motion } from "framer-motion";
import { fadeInChild, toogleRotate } from "@/utils/motion";



export const SidebarTitle = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div className={styles.title} variants={fadeInChild()}>
      <motion.div
        variants={toogleRotate()}
        initial={false}
        animate={isOpen ? "hello" : ""}
      >
        <ProfileBox />
      </motion.div>
      <p>Langavi Admin</p>
    </motion.div>
  );
};

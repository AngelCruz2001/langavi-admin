import styles from "./Sidebar.module.scss";
import { ProfileBox } from "../profile/ProfileBox";
import { motion } from "framer-motion";
import { fadeInChild } from '@/utils/motion';
export const SidebarTitle = () => {
  
  return (
    <motion.div className={styles.title} variants={fadeInChild()}>
      <ProfileBox />
      <p>Langavi Admin</p>
    </motion.div>
  );
};

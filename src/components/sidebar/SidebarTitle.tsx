import styles from "./Sidebar.module.scss";
import { ProfileBox } from "../profile/ProfileBox";
import { motion } from "framer-motion";
import { fadeInChild, toogleRotate } from "@/utils/motion";
import Image from "next/image";



export const SidebarTitle = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div className={styles.title} variants={fadeInChild()}>
      <motion.div
        variants={toogleRotate()}
        initial={false}
        animate={isOpen ? "hello" : ""}
      >
        {/* <ProfileBox /> */}
        <Image alt='L' src='https://www.langavi.com/_next/image?url=%2Flogo.webp&w=640&q=75' width={80} height={80} />
      </motion.div>
      <p>Langavi Admin</p>
    </motion.div>
  );
};

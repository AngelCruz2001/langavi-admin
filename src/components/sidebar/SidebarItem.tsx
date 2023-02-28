import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import { useMemo } from "react";
import { Svg } from "@/components";
import { motion } from "framer-motion";

interface ISidebarItemProps {
  iconName: string;
  label: string;
  path: string;
}

export const SidebarItem: React.FC<ISidebarItemProps> = ({
  iconName,
  label,
  path,
}) => {
  const router = useRouter();

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleClick = () => {
    router.push(`${path}`);
  };

  const isActive = useMemo(
    () => router.pathname === path,
    [router.pathname, path]
  );

  return (
    <motion.div
      className={`${styles.sidebarItem} ${
        isActive ? styles.sidebarItemActive : ""
      }`}
      variants={item}
      onClick={handleClick}
    >
      <Svg iconName={iconName} />
      <p className={styles.label}>{label}</p>
    </motion.div>
  );
};

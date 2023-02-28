import styles from "./Profile.module.scss";

export const ProfileCircle = () => {
  const initial = "A";

  const handleOpenProfileSettings = () => {
    console.log("Open profile settings");
  };

  return (
    <span className={styles.profileCircle} onClick={handleOpenProfileSettings}>
      {initial}
    </span>
  );
};

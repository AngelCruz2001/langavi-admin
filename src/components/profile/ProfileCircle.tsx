import { useState } from "react";
import styles from "./Profile.module.scss";
import { BehindBox, Button } from "@/components";
import { useRouter } from "next/router";

interface IProfileCircleProps {
  initial?: string;
}

export const ProfileCircle = ({ initial = "A" }: IProfileCircleProps) => {
  const [showSettings, setShowSettings] = useState(true);
  const router = useRouter();

  const handleOpenProfile = () => {
    console.log("Open profile");
    setShowSettings(!showSettings);
  };

  const handleLogOut = () => {
    console.log("Log out");
    router.push("/login");
  };

  return (
    <div>
      <span className={styles.profileCircle} onClick={handleOpenProfile}>
        {initial}
      </span>

      <BehindBox
        show={showSettings}
        setShow={setShowSettings}
        noPadding
        customStyles={{
          zIndex: 5,
          position: "fixed",
        }}
      >
        <Button
          onClick={handleLogOut}
          withIcon
          iconName="logout"
          variant="danger"
        >
          Cerrar sesión
        </Button>
      </BehindBox>
    </div>
  );
};

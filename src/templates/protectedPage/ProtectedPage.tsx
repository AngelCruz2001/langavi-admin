import { Sidebar } from "@/components/sidebar";
import styles from "./ProtectedPage.module.scss";
import { useState } from "react";

interface IProtectedPageProps {
  children: React.ReactNode;
}

export const ProtectedPage: React.FC<IProtectedPageProps> = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <h1>Please Log in first</h1>;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

import BackBtn from "../../backBtn/BackBtn";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className={styles.container}>
      <Sidebar />
     
        <BackBtn />
  

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Container;

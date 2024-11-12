import styles from "./Container.module.css";
import BackBtn from "../../backBtn/BackBtn";

const Container = ({ Children }: any) => {
  return (
    <div className={styles.container}>
      <BackBtn />
      {Children}
    </div>
  );
};

export default Container;

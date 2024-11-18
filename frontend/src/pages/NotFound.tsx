import React from "react";
import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.bg_image}>
        <div className={styles.nav_button}>
          {" "}
          <Button
            text={"Voltar a Home"}
            stylesType={"regular"}
            onClick={() => {
              navigate("/");
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

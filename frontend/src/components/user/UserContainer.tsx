import React from "react";
import NewTabBtn from "../newTabBtn/NewTabBtn";
import { IResponsibleResponse } from "../../interfaces/IResponsibleResponse";
import { Avatar } from "@mui/material";
import styles from "./UserContainer.module.css";
import { IEmployeeResponse } from "../../interfaces/IEmployeeResponse";
import { IPeopleTEAResponse } from "../../interfaces/IPeopleTEAResponse";

type UserContainerProps = {
  user: IResponsibleResponse | IEmployeeResponse | IPeopleTEAResponse;
  userPath: string;
  redirect: boolean;
  description: string;
};

const UserContainer = ({
  user,
  userPath,
  redirect,
  description,
}: UserContainerProps) => {
  return (
    <div className={styles.user_container}>
      <div className={styles.user_content}>
        <Avatar
          alt={user.nome}
          src={`${import.meta.env.VITE_API_URL}/images/${userPath}/${
            user.foto
          }`}
          sx={{ width: 55, height: 55 }}
        />
        <div className={styles.user_container_text}>
          <h2 className={styles.title}>{user.nome}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div>
        {redirect ? (
          <NewTabBtn link={`/${userPath}/${user.id}`}></NewTabBtn>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserContainer;

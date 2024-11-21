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
  active?: boolean;
};

const UserContainer = ({
  user,
  userPath,
  redirect,
  description,
  active,
}: UserContainerProps) => {
  return (
    <div
      className={`${styles.user_container} ${active ? "" : styles.desactive}`}
    >
      <div
        className={`${styles.user_content} ${active ? "" : styles.desactive}`}
      >
        <div>
          <Avatar
            alt={user.nome}
            src={`${import.meta.env.VITE_API_URL}/images/${userPath}/${
              user.foto
            }`}
            sx={{ width: 55, height: 55 }}
            className={`${styles.photo} ${active ? "" : styles.desactive}`}
          />
        </div>

        <div className={styles.user_container_text}>
          <h2 className={`${styles.title} ${active ? "" : styles.desactive}`}>
            {user.nome}
          </h2>
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

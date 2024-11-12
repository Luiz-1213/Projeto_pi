// Importações do React
import { useState, useEffect, useContext } from "react";
// Interfaces
import { IEmployeeResponse } from "../interfaces/IEmployeeResponse";
import { IPeopleTEAResponse } from "../interfaces/IPeopleTEAResponse";
import { IResponsibleResponse } from "../interfaces/IResponsibleResponse";
// Services
import { getAllResponsible } from "../services/responsavelService";
import { getAllEmployee } from "../services/funcionarioService";
import { getAllPeopleTEA } from "../services/pessoaTeaService";
// Context
import { Context } from "../context/UserContext";
// Componentes
import Button from "../components/button/Button";
import Container from "../components/layouts/container/Container";
import UserContainer from "../components/user/UserContainer";
// Estilos
import styles from "./Registered.module.css";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { normalizeKinship } from "../utils/masks";

const Registered = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(Context);
  const [isActiveTab, setIsActiveTab] = useState<string>("responsavel");
  const [responsible, setResponsible] = useState<IResponsibleResponse[]>([]);
  const [employee, setEmployee] = useState<IEmployeeResponse[]>([]);
  const [peopleTea, setPeopleTea] = useState<IPeopleTEAResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (isActiveTab === "responsavel" && responsible.length === 0) {
        response = await getAllResponsible();
        setResponsible(response.data as IResponsibleResponse[]);
      } else if (isActiveTab === "funcionario" && employee.length === 0) {
        response = await getAllEmployee();
        setEmployee(response.data as IEmployeeResponse[]);
      } else if (isActiveTab === "pessoatea" && peopleTea.length === 0) {
        response = await getAllPeopleTEA();
        setPeopleTea(response.data as IPeopleTEAResponse[]);
      }

      if (response !== undefined && response!.status === "error") {
        useToast(response!.msgError as string, "error");
      }
    };

    fetchData();
  }, [isActiveTab]);

  // Navegar para o local de criação
  const handleNavigation = () => {
    navigate(`/${isActiveTab}/create`);
  };

  return (
    <Container
      Children={
        <div className={styles.container_bg}>
          <div className={styles.actions_container}>
            <div className={styles.nav_actions_content}>
              <Button
                text={"Responsável"}
                stylesType={`${
                  isActiveTab === "responsavel" ? "regular" : "not_active"
                }`}
                onClick={() => setIsActiveTab("responsavel")}
              ></Button>
              <Button
                text={"Pessoa TEA"}
                stylesType={`${
                  isActiveTab === "pessoatea" ? "regular" : "not_active"
                }`}
                onClick={() => setIsActiveTab("pessoatea")}
              ></Button>
              {userRole === "administrador" && (
                <Button
                  text={"Funcionario"}
                  stylesType={`${
                    isActiveTab === "funcionario" ? "regular" : "not_active"
                  }`}
                  onClick={() => setIsActiveTab("funcionario")}
                ></Button>
              )}
            </div>
            <Button
              text={"Criar novo"}
              stylesType={"regular"}
              onClick={handleNavigation}
            ></Button>
          </div>
          {isActiveTab === "responsavel" && (
            <h1>Listagem de Responsáveis cadastrados</h1>
          )}
          {isActiveTab === "pessoatea" && (
            <h1>Listagem de Pessoas TEA cadastrados</h1>
          )}
          {isActiveTab === "funcionario" && (
            <h1>Listagem de Funcionários cadastrados</h1>
          )}
          <div className={styles.list_container}>
            {isActiveTab === "responsavel" &&
              responsible.map((user) => (
                <UserContainer
                  key={user.id}
                  user={user}
                  userPath={user.tipoUsuario}
                  redirect={true}
                  description={normalizeKinship(user.parentesco)}
                />
              ))}
            {isActiveTab === "pessoatea" &&
              peopleTea.map((user) => (
                <UserContainer
                  key={user.id}
                  user={user}
                  userPath={"pessoatea"}
                  redirect={true}
                  description={user.diagnostico}
                />
              ))}
            {userRole === "administrador" && isActiveTab === "funcionario" ? (
              employee.map((user) => (
                <UserContainer
                  key={user.id}
                  user={user}
                  userPath={isActiveTab}
                  redirect={true}
                  description={user.cargo}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      }
    ></Container>
  );
};

export default Registered;

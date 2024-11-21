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

// Dropdown
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";

const Registered = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(Context);
  const [isActiveTab, setIsActiveTab] = useState<string>("responsavel");
  const [responsible, setResponsible] = useState<IResponsibleResponse[]>([]);
  const [employee, setEmployee] = useState<IEmployeeResponse[]>([]);
  const [peopleTea, setPeopleTea] = useState<IPeopleTEAResponse[]>([]);
  let [menuTitle, setMenuTitle] = useState<string>("Escolha uma opção");

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

  function Styles() {
    return (
      <style>{`
    .CustomMenuSimple--listbox {
      font-family:Open-sans, Helvetica;
      font-size: 0.875rem;
      box-sizing: border-box;
      padding: 6px;
      margin: 12px 0;
      min-width: 200px;
      border-radius: 12px;
      overflow: auto;
      outline: 0;
      background-color: #FDFDFD;
      border: 1px solid  #FDFDFD;
      color:  #333;
      box-shadow: 0px 4px 6px rgba(0,0,0, 0.05)
      
    }

    .CustomMenuSimple--item {
      list-style: none;
      padding: 8px;
      border-radius: 8px;
      cursor: default;
      user-select: none;
    }

    .CustomMenuSimple--item:last-of-type {
      border-bottom: none;
    }

    .CustomMenuSimple--item:focus {
      outline: 1.5px solid  #6194fa;
      background-color:  #FDFDFD;
    }


    .TriggerButtonSimple {
      display: none;
      width: 200px;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      color:  #6194fa;
      transition: all 150ms ease;
      cursor: pointer;
      background-color:  #fff;
      border: 1px solid  #6194fa;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

      &:hover {
        background-color: #6194fa;
        color: #FFF
      }

      &:active {
        background:  #FDFDFD;
      }

      &:focus-visible {
        box-shadow: 0 0 0 4px cyan[200]};
        outline: none;
      }
    }


    .CustomMenuSimple {
      z-index: 1;
    }

    @media (max-width: 800px) {
      .TriggerButtonSimple {
        display: block}
  }
    `}</style>
    );
  }

  return (
    <Container
      children={
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
                  text={"Funcionário"}
                  stylesType={`${
                    isActiveTab === "funcionario" ? "regular" : "not_active"
                  }`}
                  onClick={() => setIsActiveTab("funcionario")}
                ></Button>
              )}
            </div>
            <Dropdown>
              <MenuButton className="TriggerButtonSimple">
                {menuTitle}
              </MenuButton>
              <Menu
                className="CustomMenuSimple"
                slotProps={{
                  listbox: { className: "CustomMenuSimple--listbox" },
                }}
              >
                <MenuItem
                  className="CustomMenuSimple--item"
                  onClick={() => {
                    setIsActiveTab("responsavel");
                    setMenuTitle("Responsável");
                  }}
                >
                  Responsável
                </MenuItem>
                <MenuItem
                  className="CustomMenuSimple--item"
                  onClick={() => {
                    setIsActiveTab("pessoatea");
                    setMenuTitle("Pessoa Tea");
                  }}
                >
                  Pessoa Tea
                </MenuItem>
                {userRole === "administrador" && (
                  <MenuItem
                    className="CustomMenuSimple--item"
                    onClick={() => {
                      setIsActiveTab("funcionario");
                      setMenuTitle("Funcionário");
                    }}
                  >
                    Funcionário
                  </MenuItem>
                )}
              </Menu>
              <Styles />
            </Dropdown>
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
                  description={
                    user.ativo ? user.telefone : "Usuário desativado"
                  }
                  active={user.ativo}
                />
              ))}
            {isActiveTab === "pessoatea" &&
              peopleTea.map((user) => (
                <UserContainer
                  key={user.id}
                  user={user}
                  userPath={"pessoatea"}
                  redirect={true}
                  description={
                    user.ativo ? user.diagnostico : "Usuário desativado"
                  }
                  active={user.ativo}
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
                  active={true}
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

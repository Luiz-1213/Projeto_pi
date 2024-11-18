// React
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; //react router dom
// Services
import {
  getEmployeebyId,
  removeEmployee,
} from "../../services/funcionarioService";
//  interfaces
import { IEmployeeResponse } from "../../interfaces/IEmployeeResponse";
// Toast de notificações
import useToast from "../../hooks/useToast";
// Componentes
import Container from "../../components/layouts/container/Container";
import Avatar from "@mui/material/Avatar";
import Button from "../../components/button/Button";
// Estilos
import styles from "../UserDetails.module.css";
import { normalizeDate } from "../../utils/masks";

const EmployeeDetails = () => {
  // Constante e useState
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<IEmployeeResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  // Busca os dados do empregado
  useEffect(() => {
    const fetchEvents = async (id: string) => {
      setIsLoading(true);
      try {
        let employee = await getEmployeebyId(id);
        // Tratamento de erro
        if (employee && employee.status === "error") {
          useToast(employee.msgError as string, employee.status); //Exibe o erro da api
          navigate("/registered"); // se houver erro volta para os registrados
        } else if (employee && employee.data) {
          setEmployee(employee.data as IEmployeeResponse);
        }
      } catch {
        useToast("Erro ao buscar", "error"); //para erro genericos
        navigate("/registered"); // se houver erro volta para os registrados
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents(id as string);
  }, [id]);

  // Navegar para o local de edição
  const handleNavigation = () => {
    navigate(`/funcionario/edit/${employee?.id}`);
  };

  const deleteEmplyoee = async () => {
    // Dispara o evento de delete
    const data = await removeEmployee(id as string);
    useToast(data.message as string, data.status);
    if (data && data.status === "sucess") {
      navigate("/registered");
    }
  };
  return (
    <Container
      children={
        <>
          {/* Fica em carregamento */}
          {isLoading ? (
            <p>Carregando</p>
          ) : (
            // Depois de carregar
            <div className={styles.container_bg}>
              <h1 className={styles.sub_title}>Informações de Funcionário</h1>
              <div className={styles.content}>
                <div className={styles.photo}>
                  <Avatar
                    alt={employee?.nome}
                    src={`${import.meta.env.VITE_API_URL}/images/funcionario/${
                      employee?.foto
                    }`}
                    sx={{ width: 70, height: 70 }}
                  />
                </div>
                <div className={styles.data}>
                  <p>
                    Nome: <span>{employee?.nome}</span>
                  </p>
                  <p>
                    CPF: <span>{employee?.cpf}</span>
                  </p>
                  <p>
                    Data de Nascimento:
                    <span>
                      {normalizeDate(employee?.dataNascimento as string)}
                    </span>
                  </p>
                </div>
              </div>
              <h2 className={styles.sub_title}>informações de Contato</h2>
              <div className={styles.content}>
                <div className={styles.data}>
                  <p>
                    Telefone: <span>{employee?.telefone}</span>
                  </p>
                  <p>
                    Email: <span>{employee?.email}</span>
                  </p>
                  <p className={styles.full_width}>
                    Endereço: <span>{employee?.endereco}</span>
                  </p>
                </div>
              </div>
              <h2 className={styles.sub_title}>informações de Contrato</h2>
              <div className={styles.data}>
                <p>
                  Cargo: <span>{employee?.cargo}</span>
                </p>
                <p>
                  Horario de Trabalho: <span>{employee?.horarioTrabalho}</span>
                </p>
              </div>
              <div className={styles.actions_container}>
                <Button
                  text={"Editar"}
                  stylesType={"regular"}
                  onClick={handleNavigation}
                ></Button>
                <Button
                  text={"Remover"}
                  stylesType={"danger"}
                  onClick={deleteEmplyoee}
                ></Button>
              </div>
            </div>
          )}
        </>
      }
    ></Container>
  );
};

export default EmployeeDetails;

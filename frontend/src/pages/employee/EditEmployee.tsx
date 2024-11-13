//React
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Services
import {
  editEmployee,
  getEmployeebyId,
} from "../../services/funcionarioService";
// Tipagem
import {
  IEmployee,
  IEmployeeResponse,
} from "../../interfaces/IEmployeeResponse";
// Toast De Notificação
import useToast from "../../hooks/useToast";
// Componentes
import Container from "../../components/layouts/container/Container";
import EmployeeForm from "../../components/form/EmployeeForm";
// Estilos
import styles from "../AddPagesStyles.module.css";

const EditEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<IEmployeeResponse>();
  const { id } = useParams();

  // Buscar os dados do atual Funcionario
  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const employee = await getEmployeebyId(id);
        if (employee && employee.status === "error") {
          useToast(employee.msgError as string, employee.status);
          navigate("/employee");
        } else if (employee && employee.data) {
          setEmployee(employee.data as IEmployeeResponse);
        }
      } catch {
        useToast("Erro ao buscar o Funcionario", "error");
      }
    };
    fetchData(id as string);
  }, [id]);

  // Função para dispara a edição
  const handleEdit = async (data: any) => {
    try {
      const response = await editEmployee(data, id as string);
      if (response && response.status === "error") {
        useToast(response.msgError as string, response.status);
      } else {
        useToast(response.message as string, response.status);
        navigate("/registered");
      }
    } catch {
      useToast("Erro ao Criar", "error");
      navigate("/registered");
    }
  };

  let defaultValues = {
    foto: undefined,
    email: employee?.email,
    nome: employee?.nome,
    cpf: employee?.cpf,
    endereco: employee?.endereco,
    telefone: employee?.telefone,
    cargo: employee?.cargo,
    dataNascimento: employee?.dataNascimento,
    horarioTrabalho: employee?.horarioTrabalho,
    qtdCadastroEvento: employee?.qtdCadastroEvento,
    voluntario: employee?.voluntario,
  };

  return (
    <Container
      Children={
        <div className={styles.container_bg}>
          <h1>Edição de funcionário</h1>
          <p>
            Altere os campos que forem necessarios, mas lembre de deixar todos
            preenchidos!
          </p>
          {!employee ? (
            <p>Carregando dados...</p>
          ) : (
            <EmployeeForm
              onSubmit={handleEdit}
              initialValues={defaultValues as IEmployee}
              isEditing={true}
              btnText={"Editar"}
              userPhoto={employee.foto}
            />
          )}
        </div>
      }
    ></Container>
  );
};

export default EditEmployee;

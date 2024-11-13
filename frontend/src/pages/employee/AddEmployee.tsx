//React
import { useNavigate } from "react-router-dom";
// Services
import { createEmployee } from "../../services/funcionarioService";
// Tipagem
// Toast De Notificação
import useToast from "../../hooks/useToast";
// Componentes
import Container from "../../components/layouts/container/Container";
import EmployeeForm from "../../components/form/EmployeeForm";
// Estilos
import styles from "../AddPagesStyles.module.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  // Função para dispara a criação do funcionario
  const handleCreate = async (data: any) => {
    try {
      const response = await createEmployee(data);
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
    email: "",
    nome: "",
    cpf: "",
    endereco: "",
    telefone: "",
    cargo: "",
    dataNascimento: "",
    horarioTrabalho: "",
    qtdCadastroEvento: 0,
    voluntario: 0,
  };

  return (
    <Container
      Children={
        <div className={styles.container_bg}>
          <h1>Criação de funcionário</h1>
          <p>Preencha todos os dados para realizar o cadastro do Funcionário</p>
          <EmployeeForm
            onSubmit={handleCreate}
            initialValues={defaultValues}
            isEditing={false}
            btnText={"Criar"}
          />
        </div>
      }
    ></Container>
  );
};

export default AddEmployee;

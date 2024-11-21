//React router
import { useNavigate } from "react-router-dom";
// Services
import { createResponsible } from "../../services/responsavelService";
// Toast De Notificação
import useToast from "../../hooks/useToast";
// Componentes
import Container from "../../components/layouts/container/Container";
import ResponsibleForm from "../../components/form/ResponsibleForm";
// Estilos
import styles from "../AddPagesStyles.module.css";


const AddResponsible = () => {
  const navigate = useNavigate();

  // Função para dispara a criação do responsavel e tratar a resposta
  const handleCreate = async (data: FormData) => {
    try {
      const response = await createResponsible(data);
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

  // Definindo Valores padrão do formulario
  let defaultValues = {
    id: 0,
    foto: undefined,
    nome: "",
    cpf: "",
    email: "",
    dataNascimento: "",
    endereco: "",
    senha: undefined,
    confirmasenha: undefined,
    genero: "Feminino",
    telefone: "",
    observacao: "",
    contatoEmergencia: "",
    horarioDisponivel: "",
  };

  return (
    <Container
      children={
        <div className={styles.container_bg}>
          <h1>Criação de Responsável</h1>
          <p>Preencha todos os dados para realizar o cadastro do Responsável</p>
          <ResponsibleForm
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

export default AddResponsible;

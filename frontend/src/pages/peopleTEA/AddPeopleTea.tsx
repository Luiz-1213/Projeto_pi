//React
import { useNavigate } from "react-router-dom";
// Services
import { createPeopleTea } from "../../services/pessoaTeaService";
// Tipagem
import { IPeopleTEA } from "../../interfaces/IPeopleTEAResponse";
// Toast De Notificação
import useToast from "../../hooks/useToast";
// Componentes
import Container from "../../components/layouts/container/Container";
import PeopleTea from "../../components/form/PeopleTeaForm";
// Estilos
import styles from "../AddPagesStyles.module.css";

const AddPeopleTea = () => {
  const navigate = useNavigate();
  // Função para dispara a criação de pessoa TEA
  const handleCreate = async (data: any) => {
    try {
      const response = await createPeopleTea(data);
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
    nome: "",
    cpf: "",
    dataNascimento: "2000/01/01",
    endereco: "",
    genero: "Feminino",
    observacao: "",
    autorizacaoTratamento: 0,
    diagnostico: "",
    grauTEA: "Leve",
    comunicacao: "",
    idadeDiagnostico: 0,
    medicacao: "",
    frequenciaUsoMedicacao: "",
    responsavel: 0,
  };

  return (
    <Container
      children={
        <div className={styles.container_bg}>
          <h1>Criação de Pessoa TEA</h1>
          <p>Preencha todos os dados para realizar o cadastro do Pessoa TEA</p>
          <PeopleTea
            onSubmit={handleCreate}
            initialValues={defaultValues as IPeopleTEA}
            isEditing={false}
            btnText={"Criar"}
          />
        </div>
      }
    ></Container>
  );
};

export default AddPeopleTea;

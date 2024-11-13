//React
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Services
import {
  editResponsible,
  getResponsibleById,
} from "../../services/responsavelService";
// Tipagem
import {
  IResponsible,
  IResponsibleResponse,
} from "../../interfaces/IResponsibleResponse";
// Toast De Notificação
import useToast from "../../hooks/useToast";
// Componentes
import Container from "../../components/layouts/container/Container";
import ResponsibleForm from "../../components/form/ResponsibleForm";
// Estilos
import styles from "../AddPagesStyles.module.css";

const EditResponsible = () => {
  const navigate = useNavigate();
  const [responsible, setResponsible] = useState<IResponsibleResponse>();
  const { id } = useParams();

  // Criando obejto com os dados para edição
  let defaultValues = {
    id: responsible?.id,
    foto: undefined,
    nome: responsible?.nome,
    cpf: responsible?.cpf,
    email: responsible?.email,
    dataNascimento: responsible?.dataNascimento,
    endereco: responsible?.endereco,
    genero: responsible?.genero,
    parentesco: responsible?.parentesco,
    telefone: responsible?.telefone,
    observacao: responsible?.contatoEmergencia,
    contatoEmergencia: responsible?.contatoEmergencia,
    horarioDisponivel: responsible?.horarioDisponivel,
  };

  // Buscar os dados do responsavel
  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const resposible = await getResponsibleById(id);
        if (resposible && resposible.status === "error") {
          useToast(resposible.msgError as string, resposible.status);
          navigate("/resposible");
        } else if (resposible && resposible.data) {
          setResponsible(resposible.data as IResponsibleResponse);
        }
      } catch {
        useToast("Erro ao buscar o Funcionario", "error");
      }
    };
    fetchData(id as string);
  }, [id]);

  // Função para dispara a edição
  const handleEdit = async (data: FormData) => {
    try {
      const response = await editResponsible(data, id as string);
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
  return (
    <Container
      Children={
        <div className={styles.container_bg}>
          <h1>Edição de Responsável</h1>
          <p>
            Altere os campos que forem necessários, mas lembre de deixar todos
            preenchidos!
          </p>
          {!responsible ? (
            <p>Carregando dados...</p>
          ) : (
            <ResponsibleForm
              onSubmit={handleEdit}
              initialValues={defaultValues as IResponsible}
              isEditing={true}
              userPhoto={responsible.foto}
              btnText={"Editar"}
            />
          )}
        </div>
      }
    ></Container>
  );
};

export default EditResponsible;

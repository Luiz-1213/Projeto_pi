//React
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Services
import {
  editPeopleTea,
  getPeopleTeaAndResponsible,
} from "../../services/pessoaTeaService";
// Tipagem
import {
  IPeopleTEA,
  IPeopleTEAResponse,
} from "../../interfaces/IPeopleTEAResponse";
// Toast De Notificação
import useToast from "../../hooks/useToast";
// Componentes
import Container from "../../components/layouts/container/Container";
import PeopleTeaForm from "../../components/form/PeopleTeaForm";
// Estilos
import styles from "../AddPagesStyles.module.css";

const EditPeopleTea = () => {
  const navigate = useNavigate();
  const [peopleTea, setPeopleTea] = useState<IPeopleTEAResponse>();
  const { id } = useParams();

  // Buscar os dados da Pessoa TEA atual
  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const resposible = await getPeopleTeaAndResponsible(id);
        if (resposible && resposible.status === "error") {
          useToast(resposible.msgError as string, resposible.status);
          navigate("/registered");
        } else if (resposible && resposible.data) {
          setPeopleTea(resposible.data.usuario as IPeopleTEAResponse);
        }
      } catch {
        useToast("Erro ao buscar o Funcionario", "error");
      }
    };
    fetchData(id as string);
  }, [id]);

  // Função que dispara a edição
  const handleEdit = async (data: any) => {
    try {
      const response = await editPeopleTea(data, id as string);
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
    nome: peopleTea?.nome,
    cpf: peopleTea?.cpf,
    dataNascimento: peopleTea?.dataNascimento,
    endereco: peopleTea?.endereco,
    genero: peopleTea?.genero,
    observacao: peopleTea?.observacao,
    autorizacaoTratamento: peopleTea?.autorizacaoTratamento,
    diagnostico: peopleTea?.diagnostico,
    grauTEA: peopleTea?.grauTEA,
    comunicacao: peopleTea?.comunicacao,
    idadeDiagnostico: peopleTea?.idadeDiagnostico,
    medicacao: peopleTea?.medicacao,
    frequenciaUsoMedicacao: peopleTea?.frequenciaUsoMedicacao,
    responsavel: peopleTea?.responsavel,
  };

  return (
    <Container
      Children={
        <div className={styles.container_bg}>
          <h1>Edição de Pessoa TEA</h1>
          <p>
            Altere os campos que forem necessarios, mas lembre de deixar todos
            preenchidos!
          </p>
          {!peopleTea ? (
            <p>Carregando dados...</p>
          ) : (
            <PeopleTeaForm
              onSubmit={handleEdit}
              initialValues={defaultValues as IPeopleTEA}
              isEditing={true}
              userPhoto={peopleTea.foto}
              btnText={"Editar"}
            />
          )}
        </div>
      }
    ></Container>
  );
};

export default EditPeopleTea;

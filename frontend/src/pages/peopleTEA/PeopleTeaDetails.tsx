// React
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; //react router
// Services
import { getPeopleTeaAndResponsible } from "../../services/pessoaTeaService";
// tipos e interfaces
import { IPeopleTEAResponse } from "../../interfaces/IPeopleTEAResponse";
import { typeShortResponsible } from "../../interfaces/IResponsibleResponse";
// Utils
import { calculateAge } from "../../utils/calculateAge"; //transformar data em idade
// Toast de notificação
import useToast from "../../hooks/useToast";
// Componetes
import Container from "../../components/layouts/container/Container";
import Avatar from "@mui/material/Avatar";
import Button from "../../components/button/Button";
// estilos
import styles from "../UserDetails.module.css";
import { normalizeDate } from "../../utils/masks";

const PeopleTeaDetails = () => {
  const navigate = useNavigate();
  const [peopletea, setPeopletea] = useState<IPeopleTEAResponse>();
  const [responsible, setResponsible] = useState<typeShortResponsible>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  // Buscar os dados
  useEffect(() => {
    const fetchEvents = async (id: string) => {
      setIsLoading(true); // seta estado de loading
      try {
        let people = await getPeopleTeaAndResponsible(id);
        // tratamento de erros da api
        if (people && people.status === "error") {
          useToast(people.msgError as string, people.status);
          navigate("/registered");
        } else if (people && people.data) {
          setPeopletea(people.data.usuario as IPeopleTEAResponse);
          setResponsible(people.data.responsavel as typeShortResponsible);
        }
      } catch {
        //tratamento de erros genericos
        useToast("Erro ao buscar", "error");
        navigate("/registered");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents(id as string);
  }, [id]);

  // Navegar para o local de edição
  const handleNavigation = () => {
    navigate(`/pessoatea/edit/${peopletea?.id}`);
  };

  return (
    <Container
      children={
        <>
          {isLoading ? (
            <p>Carregando</p>
          ) : (
            <div className={styles.container_bg}>
              <h1 className={styles.sub_title}>Informações da Pessoa TEA</h1>
              <div className={styles.content}>
                <div className={styles.photo}>
                  <Avatar
                    alt={peopletea?.nome}
                    src={`${import.meta.env.VITE_API_URL}/images/pessoatea/${
                      peopletea?.foto
                    }`}
                    sx={{ width: 70, height: 70 }}
                  />
                </div>
                <div className={styles.data}>
                  <p className={styles.full_width}>
                    Nome: <span>{peopletea?.nome}</span>
                  </p>
                  <p>
                    Idade:
                    <span>
                      {calculateAge(peopletea?.dataNascimento as string)} anos
                    </span>
                  </p>
                  <p>
                    Data de Nascimento:{" "}
                    <span>
                      {normalizeDate(peopletea?.dataNascimento as string)}
                    </span>
                  </p>
                  <p>
                    CPF: <span>{peopletea?.cpf}</span>
                  </p>
                  <p>
                    Gênero:
                    <span>{peopletea?.genero}</span>
                  </p>
                </div>
              </div>
              <h2 className={styles.sub_title}>informações de Contato</h2>
              <div className={styles.content}>
                <div className={styles.data}>
                  <p>
                    Responsável: <span>{responsible?.nome}</span>
                  </p>
                  <p className={styles.full_width}>
                    Endereço: <span>{responsible?.endereco}</span>
                  </p>
                  <p>
                    Telefone: <span>{responsible?.telefone}</span>
                  </p>
                  <p>
                    Telefone de Emergência:
                    <span>{responsible?.contatoEmergencia}</span>
                  </p>
                  <p className={styles.full_width}>
                    <Link to={`/responsavel/${responsible?.id}`}>
                      Ver detalhes do responsavel
                    </Link>
                  </p>
                </div>
              </div>
              <h2 className={styles.sub_title}>informações de Médicas</h2>
              <div className={styles.data}>
                <p>
                  Diagnóstico: <span>{peopletea?.diagnostico}</span>
                </p>
                <p>
                  Grau: <span>{peopletea?.grauTEA}</span>
                </p>
                <p>
                  Idade do Diagnóstico:{" "}
                  <span>{peopletea?.idadeDiagnostico} anos</span>
                </p>
                <p>
                  Medicação: <span>{peopletea?.medicacao}</span>
                </p>
                <p className={styles.full_width}>
                  Observações Médicas: <span>{peopletea?.observacao}</span>
                </p>
              </div>
              <div className={styles.actions_container}>
                <Button
                  text={"Editar"}
                  stylesType={"regular"}
                  onClick={handleNavigation}
                ></Button>
                <Button
                  text={peopletea?.ativo ? "Desativar" : "Ativar"}
                  stylesType={peopletea?.ativo ? "danger" : "save"}
                  // onClick={deleteResponsavel}
                ></Button>
              </div>
            </div>
          )}
        </>
      }
    ></Container>
  );
};

export default PeopleTeaDetails;

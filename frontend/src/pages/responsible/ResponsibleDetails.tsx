// React
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; //react router
//services
import {
  getResponsibleAndDependent,
  toggleResponsible,
} from "../../services/responsavelService";
// types e interfaces
import { IResponsibleResponse } from "../../interfaces/IResponsibleResponse";
import { typeShortPeopleTea } from "../../interfaces/IPeopleTEAResponse";
//Toast de notificação
import useToast from "../../hooks/useToast";
// Componentes
import Container from "../../components/layouts/container/Container";
import Avatar from "@mui/material/Avatar";
import Button from "../../components/button/Button";
// Estilos
import styles from "../UserDetails.module.css";
import { normalizeDate } from "../../utils/masks";
import Loader from "../../components/loader/Loader";

const ResponsibleDetails = () => {
  const navigate = useNavigate();
  const [responsible, setResponsible] = useState<IResponsibleResponse>();
  const [dependents, setDependents] = useState<typeShortPeopleTea[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  // Buscar responsavel
  useEffect(() => {
    const fetchEvents = async (id: string) => {
      setIsLoading(true); // Seta carregamento
      try {
        let responsible = await getResponsibleAndDependent(id);
        // Tratamento de erros da api
        if (responsible && responsible.status === "error") {
          useToast(responsible.msgError as string, responsible.status);
          navigate("/registered");
        } else if (responsible && responsible.data) {
          // Seta os dados
          setResponsible(responsible.data as IResponsibleResponse);
          setDependents(responsible.data.PessoaTEA as typeShortPeopleTea[]);
        }
      } catch {
        // Erros genericos
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
    navigate(`/responsavel/edit/${responsible?.id}`);
  };

  const handleToggleResponsible = async () => {
    //Dispara o evento de delete
    const data = await toggleResponsible(id as string);
    useToast(data.message as string, data.status);
    if (data && data.status === "sucess") {
      navigate("/registered");
    }
  };
  return (
    <Container
      children={
        <>
          {/* Quando estive carregando */}
          {isLoading ? (
            <Loader />
          ) : (
            // Depois de carregado
            <div className={styles.container_bg}>
              <h1 className={styles.sub_title}>Informações de Responsável</h1>
              <div className={styles.content}>
                <div className={styles.photo}>
                  <Avatar
                    alt={responsible?.nome}
                    src={`${import.meta.env.VITE_API_URL}/images/responsavel/${
                      responsible?.foto
                    }`}
                    sx={{ width: 70, height: 70 }}
                  />
                </div>
                <div className={styles.data}>
                  <p>
                    Nome: <span>{responsible?.nome}</span>
                  </p>
                  <p>
                    CPF: <span>{responsible?.cpf}</span>
                  </p>
                  <p>
                    Data de Nascimento:
                    <span>
                      {normalizeDate(responsible?.dataNascimento as string)}
                    </span>
                  </p>
                  <p>
                    Gênero: <span>{responsible?.genero}</span>
                  </p>
                </div>
              </div>
              <h2 className={styles.sub_title}>Informações de Dependente</h2>
              {dependents?.map((dependent: typeShortPeopleTea) => (
                <div className={styles.content} key={dependent.id}>
                  <div className={styles.photo}>
                    <Avatar
                      alt={dependent?.nome}
                      src={`${import.meta.env.VITE_API_URL}/images/pessoatea/${
                        dependent?.foto
                      }`}
                      sx={{ width: 70, height: 70 }}
                    />
                  </div>
                  <div className={styles.data}>
                    <p>
                      Nome: <span>{dependent?.nome}</span>
                    </p>
                    <p>
                      Data de Nascimento:
                      <span>
                        {normalizeDate(dependent?.dataNascimento as string)}
                      </span>
                    </p>
                    <p>
                      Diagnostico: <span>{dependent?.diagnostico}</span>
                    </p>
                    <p>
                      <Link to={`/pessoatea/${dependent?.id}`}>
                        Ver detalhes do dependente
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
              <h2 className={styles.sub_title}>Informações de Contato</h2>
              <div className={styles.data}>
                <p>
                  Endereço: <span>{responsible?.endereco}</span>
                </p>
                <p>
                  Telefone: <span>{responsible?.telefone}</span>
                </p>
                <p>
                  Telefone de Emergência:
                  <span>{responsible?.contatoEmergencia}</span>
                </p>
                <p>
                  Email: <span>{responsible?.email}</span>
                </p>
                <p className={styles.full_width}>
                  Disponibilidade: <span>{responsible?.horarioDisponivel}</span>
                </p>
              </div>
              <div className={styles.actions_container}>
                <Button
                  text={"Editar"}
                  stylesType={"regular"}
                  onClick={handleNavigation}
                ></Button>
                <Button
                  text={responsible?.ativo ? "Desativar" : "Ativar"}
                  stylesType={responsible?.ativo ? "danger" : "save"}
                  onClick={handleToggleResponsible}
                ></Button>
              </div>
            </div>
          )}
        </>
      }
    ></Container>
  );
};

export default ResponsibleDetails;

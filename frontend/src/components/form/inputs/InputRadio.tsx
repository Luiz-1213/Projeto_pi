import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import styles from "./InputRadio.module.css";
import { getAllResponsible } from "../../../services/responsavelService";
import { IResponsibleResponse } from "../../../interfaces/IResponsibleResponse";
import { Avatar } from "@mui/material";

// Componente para selecionar responsável
const InputRadio = () => {
  const [responsibles, setResponsibles] = useState<IResponsibleResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let response;

      response = await getAllResponsible();
      setResponsibles(response.data as IResponsibleResponse[]);
    };

    fetchData();
  }, []);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.input_radio_container}>
      <h2 className={styles.title}>Selecionando Responsável</h2>
      <p className={styles.sub_title}>
        Selecione o responsável pela pessoaTEA, certifique-se de que ele já foi
        cadastrado!
      </p>
      <Controller
        name="responsavel"
        control={control}
        rules={{ required: "Selecione um responsável" }}
        render={({ field }) => (
          <div className={styles.option_container}>
            {responsibles.map((responsible) => (
              <label key={responsible.id} className={styles.option_item}>
                <Avatar
                  src={`${import.meta.env.VITE_API_URL}/images/responsavel/${
                    responsible.foto
                  }`}
                  sx={{ width: 35, height: 35 }}
                />
                <span>{responsible.nome}</span>
                <input
                  type="radio"
                  value={responsible.id}
                  checked={field.value === responsible.id}
                  onChange={() => field.onChange(responsible.id)}
                />
              </label>
            ))}
          </div>
        )}
      />
      {errors.selectedResponsible && (
        <p className="error">{errors.selectedResponsible.message as string}</p>
      )}
    </div>
  );
};

export default InputRadio;

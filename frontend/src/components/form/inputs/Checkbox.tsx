import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import styles from "./InputRadio.module.css";
import { getAllResponsible } from "../../../services/responsavelService";
import { IResponsibleResponse } from "../../../interfaces/IResponsibleResponse";
import { Avatar } from "@mui/material";

// Componente para selecionar responsável
const Checkbox = () => {
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
    getValues,
    setValue,
  } = useFormContext();

  useEffect(() => {
    console.log("Valores iniciais:", getValues("responsaveis"));
  }, []);

  return (
    <div className={styles.input_radio_container}>
      <h2 className={styles.title}>Adicionar responsáveis</h2>
      <p className={styles.sub_title}>
        Selecione os responsáveis que participaram do evento!
      </p>
      <Controller
        name="responsaveis"
        control={control}
        rules={{ required: "Selecione pelo menos um responsável" }}
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
                  type="checkbox"
                  value={responsible.id}
                  checked={field.value?.includes(responsible.id) || false}
                  onChange={() => {
                    const currentValues = getValues("responsaveis") || [];
                    const isChecked = currentValues.includes(responsible.id);

                    if (isChecked) {
                      // Remover o ID se estiver selecionado
                      setValue(
                        "responsaveis",
                        currentValues.filter(
                          (item: number) => item !== responsible.id
                        )
                      );
                    } else {
                      // Adicionar o ID se não estiver selecionado
                      setValue("responsaveis", [
                        ...currentValues,
                        responsible.id,
                      ]);
                    }
                  }}
                />
              </label>
            ))}
          </div>
        )}
      />
      {errors.responsaveis && (
        <p className="error">{errors.responsaveis.message as string}</p>
      )}
    </div>
  );
};

export default Checkbox;

// hooks e bibliotecas de validação
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// interfaces
import { IFeedbackResponse } from "../../interfaces/IFeedbackResponse";
import { IFeedbackFormSchema } from "../../interfaces/IFeedbackFormSchema";

// Componentes
import Button from "../../components/button/Button";
import { Rating } from "@mui/material";

// Styles
import styles from "./FeedForm.module.css";

// Typando com zod
const FeedbackFormSchema = z.object({
  assuntoFeedback: z.string().min(1, "O assunto é obrigatório"),
  descricaoFeedback: z.string().min(8, "Quantidade minima é de 8 caracteres"),
});

// Typando o retorno dos inputs
type FeedbackFormSchema = z.infer<typeof FeedbackFormSchema>;

// Tipando as props do formulario
type FeedbackFormProps = {
  onSubmit: (data: IFeedbackFormSchema) => void;
  feedbackData?: IFeedbackResponse;
  btnText: string;
};

const FeedbackForm = ({
  onSubmit,
  feedbackData,
  btnText,
}: FeedbackFormProps) => {
  const [value, setValue] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormSchema>({
    resolver: zodResolver(FeedbackFormSchema),
  });

  // Função de retornar os dados ao componente pai
  function sendFeedback(data: FeedbackFormSchema) {
    const Feedback: IFeedbackFormSchema = {
      ...data,
      satisfacao: value,
    };
    onSubmit(Feedback);
  }

  return (
    <form
      className={styles.feedback_form}
      onSubmit={handleSubmit(sendFeedback)}
    >
      <div className="form-control">
        <label htmlFor="assuntoFeedback">
          Assunto:{" "}
          {errors.assuntoFeedback && (
            <span className={styles.error}>
              {errors.assuntoFeedback?.message}
            </span>
          )}
        </label>
        <input
          type="text"
          {...register("assuntoFeedback")}
          placeholder="Digite seu título ou assunto"
          className={errors.assuntoFeedback ? "input_error" : ""}
          defaultValue={feedbackData?.assuntoFeedback || ""}
        />
      </div>
      <div className="form-control">
        <label htmlFor="descricaoFeedback">
          descrição:{" "}
          {errors.descricaoFeedback && (
            <span className={styles.error}>
              {errors.descricaoFeedback?.message}
            </span>
          )}
        </label>
        <textarea
          {...register("descricaoFeedback")}
          placeholder="Descreva seu feedback..."
          className={errors.descricaoFeedback ? "input_error" : ""}
          defaultValue={feedbackData?.descricaoFeedback || ""}
        />
      </div>
      <div className={styles.form_control_rating}>
        <p>Satisfação</p>
        <Rating
          name="satisfacao"
          defaultValue={feedbackData?.satisfacao}
          precision={0.5}
          onChange={(_event: React.SyntheticEvent, newValue: number | null) => {
            if (newValue !== null) {
              setValue(newValue);
            }
          }}
        />
      </div>

      <Button type="submit" text={btnText} stylesType="save" />
    </form>
  );
};
export default FeedbackForm;

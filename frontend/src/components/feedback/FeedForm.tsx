// hooks e bibliotecas de validação
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// interfaces

import { IFeedbackFormSchema } from "../../interfaces/IFeedbackFormSchema";

// Componentes
import Button from "../../components/button/Button";
import { Rating } from "@mui/material";

// Styles
import styles from "./FeedForm.module.css";
import FormControl from "../form/inputs/FormControl";

// Typando com zod
const FeedbackFormSchema = z.object({
  assuntoFeedback: z
    .string()
    .min(1, "O assunto é obrigatório")
    .max(25, "O limite é de 25 caracteres"),
  descricaoFeedback: z
    .string()
    .min(8, "Quantidade minima é de 8 caracteres")
    .max(200, "O limite é de 200 caracteres"),
  satisfacao: z.number().min(0).max(5),
});

// Typando o retorno dos inputs
// Tipando o schema do formulário com Zod
type FeedbackFormSchema = z.infer<typeof FeedbackFormSchema>;

type FeedbackFormProps = {
  onSubmit: (data: IFeedbackFormSchema) => void;
  btnText: string;
  initialValues: IFeedbackFormSchema; // Certifique-se de que FeedbackResponse tem todos os campos do formulário
};

const FeedbackForm = ({
  onSubmit,
  initialValues,
  btnText,
}: FeedbackFormProps) => {
  const [value, setValue] = useState<number>(initialValues.satisfacao || 0); // Inicialize com o valor correto
  const methods = useForm<FeedbackFormSchema>({
    defaultValues: initialValues, // Passe os valores iniciais corretamente
    resolver: zodResolver(FeedbackFormSchema),
  });

  useEffect(() => {
    // Atualiza o valor de 'satisfacao' no formulário quando o valor for alterado
    methods.setValue("satisfacao", value);
  }, [value, methods]);

  // Função para enviar os dados ao componente pai
  function sendFeedback(data: FeedbackFormSchema) {
    const feedback: IFeedbackFormSchema = {
      ...data,
      satisfacao: value,
    };
    onSubmit(feedback);
  }

  return (
    <FormProvider {...methods}>
      <form
        className={styles.feedback_form}
        onSubmit={methods.handleSubmit(sendFeedback)}
      >
        <FormControl
          name="assuntoFeedback"
          label="Assunto:"
          inputType="text"
          placeholder="Digite seu título ou assunto"
        />
        <FormControl
          name="descricaoFeedback"
          label="Descrição:"
          inputType="textarea"
          placeholder="Descreva seu feedback..."
        />

        <div className={styles.form_control_rating}>
          <p>Satisfação</p>
          <Rating
            name="satisfacao"
            value={value} // Use 'value' em vez de 'defaultValue'
            precision={0.5}
            onChange={(
              _event: React.SyntheticEvent,
              newValue: number | null
            ) => {
              if (newValue !== null) {
                setValue(newValue);
              }
            }}
          />
        </div>

        <Button type="submit" text={btnText} stylesType="save" />
      </form>
    </FormProvider>
  );
};

export default FeedbackForm;

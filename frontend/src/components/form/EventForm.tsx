// UserForm.tsx
import Button from "../button/Button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormControl from "./inputs/FormControl";
import styles from "./FormStyles.module.css";
import Checkbox from "./inputs/Checkbox";

const EventForm = ({ onSubmit, initialValues, btnText }: any) => {
  // Definindo o schema Zod
  const eventSchema = z.object({
    assunto: z.string().min(1, "O assunto é obrigatório"),
    descricao: z.string().min(5, "A breve descrição do evento é obrigatória"),
    dataEvento: z.string().date(),
    horario: z.string().min(1, "O Horário  é obrigatório"),
    local: z.string().min(1, "O local é obrigatório"),
    responsaveis: z
      .number()
      .array()
      .min(1, "O evento precisa de pelo menos um responsável"),
  });
  // Typando o retorno dos inputs
  type eventSchemaForm = z.infer<typeof eventSchema>;
  const methods = useForm<eventSchemaForm>({
    defaultValues: {
      assunto: initialValues.assunto || "",
      descricao: initialValues.descricao || "",
      dataEvento: initialValues.dataEvento || "",
      horario: initialValues.horario || "",
      local: initialValues.local || "",
      responsaveis:
        initialValues.Responsaveis!.map((item: any) => item.id) || [],
    },
    resolver: zodResolver(eventSchema),
  });

  console.log(methods.formState.errors);
  const handleSubmit = (data: eventSchemaForm) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form_container}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <FormControl
          name="assunto"
          label="Assunto:"
          inputType={"text"}
          placeholder="Digite o título do evento"
        />
        <FormControl
          name="descricao"
          label="Descrição:"
          inputType={"text"}
          placeholder="Ex: Reunião de replanejamento"
        />
        <FormControl
          name="dataEvento"
          label="Data do Evento:"
          inputType={"date"}
        />
        <FormControl name="horario" label="Horário:" inputType={"time"} />
        <FormControl
          name="local"
          label="Local do Evento:"
          inputType={"text"}
          placeholder="Ex: Sede da ONG"
        />
        <div className={styles.full_width}>
          <Checkbox />
        </div>

        <div className={styles.full_width}>
          <Button text={btnText} stylesType={"save"}></Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EventForm;

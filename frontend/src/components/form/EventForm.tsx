// Zod e react hook form
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Componentes
import Button from "../button/Button";
import FormControl from "./inputs/FormControl";
import Checkbox from "./inputs/Checkbox";
// Estilos
import styles from "./FormStyles.module.css";
import { IEventResponse } from "../../interfaces/IEventResponse";

// Tipagem da Props do Compoennte
type EventFormProps = {
  onSubmit: (data: IEventResponse) => void;
  initialValues: IEventResponse;
  btnText: string;
};

const EventForm = ({ onSubmit, initialValues, btnText }: EventFormProps) => {
  // Definindo o schema Zod
  const eventSchema = z.object({
    assunto: z
      .string()
      .min(1, "O assunto é obrigatório")
      .max(25, "O assunto deve ter até 25 caracteres"),
    descricao: z.string().min(5, "A breve descrição do evento é obrigatória"),
    dataEvento: z.string().date("A data do Evento é obrigatória"),
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
    defaultValues: initialValues,
    resolver: zodResolver(eventSchema),
  });

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

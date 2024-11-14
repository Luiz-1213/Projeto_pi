// Importações od React
import { useEffect } from "react";
// Zod e react hook form
import * as z from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Tipos e Interfaces
import { IPeopleTEA } from "../../interfaces/IPeopleTEAResponse";
// Mask e validações
import { normalizeCPF } from "../../utils/masks";
import validateCPF from "../../utils/validateCPF";
// Compoentes
import Button from "../button/Button";
import FileInput from "./inputs/FileInput";
import FormControl from "./inputs/FormControl";
import InputRadio from "./inputs/InputRadio";
// Estilos
import styles from "./FormStyles.module.css";

// Tipagem da Props do Compoennte
type peopleFormProps = {
  onSubmit: (data: FormData) => void;
  initialValues: IPeopleTEA;
  isEditing: boolean;
  btnText: string;
  userPhoto?: string;
};

const PeopleTeaForm = ({
  onSubmit,
  initialValues,
  isEditing,
  btnText,
  userPhoto,
}: peopleFormProps) => {
  // Definindo o schema Zod
  const peopleTeaSchema = z.object({
    foto: isEditing
      ? z.optional(
          z
            .instanceof(FileList)
            .refine(
              (list) => {
                if (!list || list.length === 0) return true;
                const file = list.item(0);
                if (!file) return false;
                const validTypes = ["image/jpeg", "image/png"];
                return validTypes.includes(file.type);
              },
              {
                message: "A foto deve ser um arquivo JPG ou PNG",
              }
            )
            .transform((list) => (list ? list.item(0) : null))
        )
      : z
          .instanceof(FileList)
          .refine(
            (list) => {
              if (!list || list.length === 0) return false;
              const file = list.item(0);
              if (!file) return false;
              const validTypes = ["image/jpeg", "image/png"];
              return validTypes.includes(file.type);
            },
            {
              message: "A foto deve ser um arquivo JPG ou PNG",
            }
          )
          .transform((list) => list.item(0)),
    nome: z.string().min(1, "O nome é obrigatório"),
    cpf: z
      .string()
      .min(11, "O CPF é obrigatório")
      .refine((cpf) => validateCPF(cpf), {
        message: "CPF inválido",
      }),
    dataNascimento: z.string().date(),
    endereco: z.string().min(1, "O endereço é obrigatório"),
    genero: z.string(),
    diagnostico: z.string().min(1, "O diagnostico é obrigatório"),
    grauTEA: z.string().min(1, "não pode estar vazio"),
    comunicacao: z.string().min(1, "não pode estar vazio"),
    observacao: z.string().min(1, "não pode estar vazio"),
    idadeDiagnostico: z.coerce
      .number()
      .min(0, "A idade não pode ser negativa")
      .max(100, "A idade de diagnostico não pode passar de 100 anos"),
    autorizacaoTratamento: z.coerce.number(),
    medicacao: z.string().min(1, "não pode estar vazio"),
    frequenciaUsoMedicacao: z.string().min(1, "não pode estar vazio"),
    responsavel: z.number(),
  });

  // Typando o retorno dos inputs
  type peopleSchemaForm = z.infer<typeof peopleTeaSchema>;

  const methods = useForm<peopleSchemaForm>({
    defaultValues: initialValues,
    resolver: zodResolver(peopleTeaSchema),
  });

  // Conversão em formData e envio
  const handleSubmit = (data: peopleSchemaForm) => {
    data.autorizacaoTratamento = Number(data.autorizacaoTratamento);

    const formData = new FormData();
    (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
      const value = data[key];

      if (key === "foto" && value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "string" || typeof value === "number") {
        formData.append(key, value.toString());
      }
    });

    onSubmit(formData);
  };

  // Mascaras
  const cpfValue = methods.watch("cpf");
  useEffect(() => {
    methods.setValue("cpf", normalizeCPF(cpfValue));
  }, [cpfValue]);

  return (
    <FormProvider {...methods}>
      {/* Componente de formulario */}
      <form
        className={styles.form_container}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <div className={styles.full_width}>
          <FileInput
            name={"foto"}
            label={"Adicione uma foto:"}
            imgUrl={`${import.meta.env.VITE_API_URL}/images/pessoatea/`}
            previewPhoto={userPhoto as string}
          ></FileInput>
        </div>

        <FormControl
          name="nome"
          label="Nome:"
          inputType={"text"}
          placeholder="Digite o nome completo"
        />
        <div className="form-control">
          <label>CPF:</label>
          <input
            type={"text"}
            {...methods.register("cpf")}
            placeholder={"Digite seu cpf"}
            className={methods.formState.errors.cpf ? "input_error" : ""}
            onChange={(e) => {
              methods.register("cpf").onChange(e);
              methods.trigger("cpf");
            }}
          />
          {methods.formState.errors.cpf && (
            <span className="error">
              {methods.formState.errors.cpf.message as any}
            </span>
          )}
        </div>
        <FormControl
          name="dataNascimento"
          label="Data de Nascimento:"
          inputType={"date"}
        />
        <FormControl
          name="endereco"
          label="Endereço completo:"
          inputType={"text"}
          placeholder="Endereço com Rua, n°, bairro e Cidade"
        />
        <FormControl
          name="genero"
          label="Qual o genêro da Pessoa TEA?"
          inputType={"text"}
          Component="select"
        >
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
          <option value="Outro">Outro</option>
        </FormControl>

        <p className={styles.sub_title}>Informações Médicas</p>

        <FormControl
          name="diagnostico"
          label="Informe o Diagnóstico:"
          inputType={"text"}
          placeholder="Informe todos os diagnostico dentro do espectro TEA"
        />

        <FormControl
          name="grauTEA"
          label="Qual o grau do diagnóstico"
          Component="select"
        >
          <option value="Leve">Leve</option>
          <option value="Moderado">Moderado</option>
          <option value="Grave">Grave</option>
        </FormControl>
        <FormControl
          name="comunicacao"
          label="Informe o nível de Comunicação:"
          inputType={"text"}
          placeholder="Ex: silábico, pré-silábico, etc..."
        />
        <FormControl
          name="observacao"
          label="Observações médicas:"
          inputType={"text"}
          placeholder="Ex: alergias, cuidados especiais, etc.."
        />
        <FormControl
          name="idadeDiagnostico"
          label="Qual foi a idade de Diagnóstico?"
          inputType={"number"}
          placeholder="Ex: 6 anos"
        />
        <FormControl
          name="medicacao"
          label="Faz uso de medicação?"
          inputType={"text"}
          placeholder="Ex: Aripiprazol e Fluoxetina"
        />
        <FormControl
          name="frequenciaUsoMedicacao"
          label="Qual o horário de uso da medicação?"
          inputType={"text"}
          placeholder="Ex: 'Ao jantar' ou 'Não faz uso' "
        />
        <FormControl
          name="autorizacaoTratamento"
          label="Autoriza Tratamento?"
          Component="select"
        >
          <option value={1}>Sim</option>
          <option value={0}>Não</option>
        </FormControl>
        <InputRadio />
        <div className={styles.full_width}>
          <Button text={btnText} stylesType={"save"}></Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PeopleTeaForm;

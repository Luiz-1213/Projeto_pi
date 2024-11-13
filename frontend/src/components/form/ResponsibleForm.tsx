//React router
import { useEffect } from "react";
// React Hook Form
import { useForm, FormProvider } from "react-hook-form";
// Zod
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Componentes
import Button from "../button/Button";
import FormControl from "./inputs/FormControl";
import FileInput from "./inputs/FileInput";

// Mascaras e padronizações
import validateCPF from "../../utils/validateCPF";
import { normalizeCPF, normalizePhoneNumber } from "../../utils/masks";
// Estilos
import styles from "./FormStyles.module.css";
import { IResponsible } from "../../interfaces/IResponsibleResponse";

// Componente Props
type responsibleFormProps = {
  onSubmit: (data: FormData) => void;
  initialValues: IResponsible;
  isEditing: boolean;
  btnText: string;
  userPhoto?: string;
};

const ResponsibleForm = ({
  onSubmit,
  initialValues,
  isEditing,
  btnText,
  userPhoto,
}: responsibleFormProps) => {
  // Esquema do zod
  const responsibleSchema = z
    .object({
      foto: isEditing
        ? z.optional(
            z
              .instanceof(FileList)
              .refine(
                (list) => {
                  if (!list || list.length === 0) return true;
                  const file = list.item(0);
                  if (!file) return false;
                  const validTypes = ["image/jpg", "image/png"];
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
                const validTypes = ["image/jpg", "image/png"];
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
      email: z.string().email("E-mail inválido"),
      dataNascimento: z.string().date(),
      endereco: z.string().min(1, "O endereço é obrigatório"),
      genero: z.string(),
      parentesco: z.string().min(1, "O parentesco é obrigatório"),
      telefone: z.string().min(1, "O telefone é obrigatório"),
      senha: isEditing
        ? z.string().optional()
        : z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
      confirmasenha: isEditing
        ? z.string().optional()
        : z
            .string()
            .trim()
            .min(8, "A cofirmacao deve ter no minimo 8 caracteres"),
      observacao: z.string().optional(),
      contatoEmergencia: z
        .string()
        .min(1, "O telefone de emergência é obrigatório"),
      horarioDisponivel: z
        .string()
        .min(10, "O horario de trabalho é obrigatório"),
    })
    .refine((data) => data.senha === data.confirmasenha, {
      message: "As senhas não coincidem",
      path: ["confirmasenha"],
    });

  // Typando o retorno dos inputs
  type responsibleSchemaForm = z.infer<typeof responsibleSchema>;

  const methods = useForm<responsibleSchemaForm>({
    defaultValues: initialValues,
    resolver: zodResolver(responsibleSchema),
  });

  // Converter em formData e envio
  const handleSubmit = (data: responsibleSchemaForm) => {
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
  const phoneValue = methods.watch("telefone");
  const phoneEmergencyValue = methods.watch("contatoEmergencia");
  const cpfValue = methods.watch("cpf");

  useEffect(() => {
    methods.setValue("telefone", normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  useEffect(() => {
    methods.setValue(
      "contatoEmergencia",
      normalizePhoneNumber(phoneEmergencyValue)
    );
  }, [phoneEmergencyValue]);

  useEffect(() => {
    methods.setValue("cpf", normalizeCPF(cpfValue));
  }, [cpfValue]);

  // Componente de input
  return (
    <FormProvider {...methods}>
      <form
        className={styles.form_container}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <div className={styles.full_width}>
          <FileInput
            name={"foto"}
            label={"Adicione uma foto:"}
            imgUrl={`${import.meta.env.VITE_API_URL}/images/responsavel/`}
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
          name="genero"
          label="Qual o genêro do responsável?"
          inputType={"text"}
          Component="select"
        >
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
          <option value="Outro">Outro</option>
        </FormControl>
        <FormControl
          name="email"
          label="E-mail:"
          inputType={"email"}
          placeholder="Digite o e-mail"
        />
        <FormControl
          name="endereco"
          label="Endereço completo:"
          inputType={"text"}
          placeholder="Endereço com Rua, n°, bairro e Cidade"
        />
        <FormControl
          name="telefone"
          label="Telefone:"
          inputType={"text"}
          placeholder="Ex: (19) 98877-6655"
        />
        <FormControl
          name="contatoEmergencia"
          label="Contato de Emergência:"
          inputType={"text"}
          placeholder="Ex: (19) 98877-6655"
        />
        <FormControl
          name="parentesco"
          label="Qual o parentesco com a pessoa TEA"
          inputType={"text"}
          Component="select"
        >
          <option value="mae">Mãe</option>
          <option value="pai">Pai</option>
          <option value="avo">Avô ou Avó</option>
          <option value="tio">Tio ou Tia</option>
          <option value="responsavel-legal">Responsável</option>
          <option value="outro">Outro</option>
        </FormControl>
        <FormControl
          name="horarioDisponivel"
          label="Disponibilidade:"
          inputType={"text"}
          placeholder="Horário que se encontra disponivel"
        />
        {!isEditing && (
          <>
            <div className="form-control">
              <label>Senha:</label>
              <input
                type={"password"}
                {...methods.register("senha")}
                placeholder={"Digite a senha do funcionario"}
                className={methods.formState.errors.senha ? "input_error" : ""}
                onChange={(e) => {
                  methods.register("senha").onChange(e);
                  methods.trigger("senha");
                }}
              />
              {methods.formState.errors.senha && (
                <span className="error">
                  {methods.formState.errors.senha?.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label>Confirme a Senha:</label>
              <input
                type={"password"}
                {...methods.register("confirmasenha")}
                placeholder={"Confirme a senha do funcionario"}
                className={
                  methods.formState.errors.confirmasenha ? "input_error" : ""
                }
                onChange={(e) => {
                  methods.register("confirmasenha").onChange(e);
                  methods.trigger("confirmasenha");
                }}
              />
              {methods.formState.errors.confirmasenha && (
                <span className="error">
                  {methods.formState.errors.confirmasenha.message as any}
                </span>
              )}
            </div>
          </>
        )}
        <FormControl
          name="observacao"
          label="Observações:"
          inputType={"text"}
          placeholder="Alguma observação..."
        />
        <div className={styles.full_width}>
          <Button text={btnText} stylesType={"save"}></Button>
        </div>
      </form>
    </FormProvider>
  );
};
export default ResponsibleForm;

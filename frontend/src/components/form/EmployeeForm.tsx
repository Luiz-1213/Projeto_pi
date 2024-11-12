// UserForm.tsx
import { useEffect } from "react";
import Button from "../button/Button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormControl from "./inputs/FormControl";
import styles from "./FormStyles.module.css";
import { normalizeCPF, normalizePhoneNumber } from "../../utils/masks";
import FileInput from "./inputs/FileInput";
import validateCPF from "../../utils/validateCPF";

const EmployeeForm = ({ onSubmit, initialValues, isEditing, btnText }: any) => {
  // Definindo o schema Zod
  const employeeSchema = z
    .object({
      foto: isEditing
        ? z
            .instanceof(FileList)
            .optional()
            .transform((list) => list?.item(0))
            .refine(
              (file) => {
                if (!file) return false;
                const validTypes = ["image/jpg", "image/png"];
                return validTypes.includes(file.type);
              },
              {
                message: "A foto deve ser um arquivo JPG ou PNG",
              }
            )
        : z
            .instanceof(FileList)
            .transform((list) => list.item(0))
            .refine(
              (file) => {
                if (!file) return false;
                const validTypes = ["image/jpg", "image/png"];
                return validTypes.includes(file.type);
              },
              {
                message: "A foto deve ser um arquivo JPG ou PNG",
              }
            ),
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
      cargo: z.string().min(1, "O campo função é obrigatório"),
      horarioTrabalho: z
        .string()
        .min(10, "O horario de trabalho é obrigatório"),
      voluntario: z.coerce.number(),
    })
    .refine((data) => data.senha === data.confirmasenha, {
      message: "As senhas não coincidem",
      path: ["senha", "confirmasenha"],
    });

  // Typando o retorno dos inputs
  type employeeSchemaForm = z.infer<typeof employeeSchema>;

  const methods = useForm<employeeSchemaForm>({
    defaultValues: initialValues || "",
    resolver: zodResolver(employeeSchema),
  });

  const handleSubmit = (data: employeeSchemaForm) => {
    data.voluntario = Number(data.voluntario);

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

  const phoneValue = methods.watch("telefone");
  const cpfValue = methods.watch("cpf");

  useEffect(() => {
    methods.setValue("telefone", normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  useEffect(() => {
    methods.setValue("cpf", normalizeCPF(cpfValue));
  }, [cpfValue]);

  console.log(methods.formState.errors);

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
            imgUrl={`${import.meta.env.VITE_API_URL}/images/funcionario/`}
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
          name="email"
          label="E-mail:"
          inputType={"email"}
          placeholder="Digite o e-mail"
        />
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
          name="telefone"
          label="Telefone:"
          inputType={"text"}
          placeholder="Ex: (19) 98877-6655"
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
          name="cargo"
          label="Cargo:"
          inputType={"text"}
          placeholder="Digite o cargo"
        />
        <FormControl
          name="horarioTrabalho"
          label="Horário de Trabalho:"
          inputType={"text"}
          placeholder="Ex: 8:00 às 17:00"
        />
        <FormControl
          name="voluntario"
          label="Voluntario para Atividades?"
          inputType={"text"}
          Component="select"
        >
          <option value={1}>Sim</option>
          <option value={0}>Não</option>
        </FormControl>
        <div className={styles.full_width}>
          <Button text={btnText} stylesType={"save"}></Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EmployeeForm;

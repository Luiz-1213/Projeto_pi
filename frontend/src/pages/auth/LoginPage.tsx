// hooks e bibliotecas de validação
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Context
import { Context } from "../../context/UserContext";

// Componentes
import Button from "../../components/button/Button";

// Styles
import styles from "./LoginPage.module.css";

// Images
import imgLogo from "/logo.png";
import { useContext } from "react";

// Schema de Login
const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("O formato de email deve ser válido"),
  senha: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

// Typando o retorno dos inputs
type LoginFormSchema = z.infer<typeof LoginFormSchema>;

const LoginPage = () => {
  const { login } = useContext(Context); //metodo para login no context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  function authUser(data: LoginFormSchema) {
    login(data);
  }

  return (
    <div className={styles.background}>
      <div className={styles.login_container}>
        <div className={styles.login_banner}>
          <div className={styles.banner_layer}>
            <img id={styles.logo} src={imgLogo} alt="Logo Aapea" />
          </div>
        </div>
        <div className={styles.login_form}>
          <h1>Seja bem-vindo!</h1>
          <p>Preencha as informações abaixo para fazer login.</p>
          <form onSubmit={handleSubmit(authUser)}>
            <div className="form-control">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Digite seu e-mail"
                className={errors.email ? "input_error" : ""}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email?.message}</span>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                {...register("senha")}
                placeholder="Digite sua senha"
                className={errors.senha ? "input_error" : ""}
              />
              <span className={styles.error}>{errors.senha?.message}</span>
            </div>
            <Button type="submit" text="Entrar" stylesType="regular" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

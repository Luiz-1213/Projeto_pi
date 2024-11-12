
import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  stylesType: string;
};

function Button({ type, text, stylesType, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[stylesType]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;

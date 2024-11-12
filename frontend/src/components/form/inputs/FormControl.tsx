import { useFormContext } from "react-hook-form";

type FormFieldProps = {
  name: string;
  label: string;
  inputType?: string;
  placeholder?: string;
  Component?: string;
  children?: any;
};

const FormControl = ({
  name,
  label,
  inputType,
  placeholder,
  Component,
  children,
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control">
      <label>{label}</label>
      {Component === "select" ? (
        <select {...register(name)}>{children}</select>
      ) : (
        <input
          type={inputType}
          {...register(name)}
          placeholder={placeholder}
          className={errors[name] ? "input_error" : ""}
        />
      )}
      {errors[name] && (
        <span className="error">{errors[name].message as any}</span>
      )}
    </div>
  );
};

export default FormControl;

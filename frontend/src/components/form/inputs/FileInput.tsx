import { Avatar } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FileInput.module.css";

type inputFieldProps = {
  name: string;
  label: string;
  imgUrl: string;
  previewPhoto: string;
};

const Fileinput = ({ name, label, imgUrl, previewPhoto }: inputFieldProps) => {
  const [preview, setPreview] = useState();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function onFileChange(e: any) {
    setPreview(e.target.files[0]);
  }

  return (
    <div className={styles.input_file_container}>
      <Avatar
        src={
          preview ? URL.createObjectURL(preview) : `${imgUrl}${previewPhoto}`
        }
        sx={{ width: 55, height: 55 }}
      />
      <div className={styles.input_file_control}>
        <label htmlFor={name}>{label}</label>
        <input
          {...register(name)}
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        {errors[name] && <p className="error">{errors[name].message as any}</p>}
      </div>
    </div>
  );
};

export default Fileinput;

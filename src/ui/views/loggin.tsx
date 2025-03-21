import React from "react";
import { useForm } from "react-hook-form";


interface LogginProps {
  onLogin: (email: string, password: string) => void;
}

const Loggin: React.FC<LogginProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>();

  const onSubmit = (data: { username: string; password: string }) => {
    onLogin(data.username, data.password);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Usuario"
            {...register("username", { required: "El usuario es requerido" })}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: "La contraseña es requerida" })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Loggin

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./login.css";

interface LoginProps {
  cambiarPagina: React.Dispatch<React.SetStateAction<string>>;
}

function Login({ cambiarPagina }: LoginProps) {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // CAPTCHA
  const [captcha, setCaptcha] =
    useState<string | null>(null);

  const iniciarSesion = async () => {

    // VALIDAR CAPTCHA
    if (!captcha) {

      alert("Complete el CAPTCHA");

      return;
    }

    try {

      const response = await fetch(
        "http://localhost:3000/api/cuenta/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            usuario,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);
      console.log("informacion de la cuenta ",data);
      if (response.ok) {
        //guardar usuario
        localStorage.setItem("usuario",JSON.stringify(data.data))
        if(data.data.rol === "admin"){
          console.log("Es un administrador")
          cambiarPagina("tienda");
        }else{
          console.log("mi idTienda de empleado es ",data.data.idTienda)
          localStorage.setItem("tienda", JSON.stringify({ idTienda: data.data.idTienda }));
          cambiarPagina("dashboard");
        }
      } else {

        alert("Credenciales incorrectas");

      }

    } catch (error) {

      console.log(error);

      alert("Error del servidor");

    }

  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>Iniciar Sesión</h1>

        <p>Sistema Carpintería</p>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) =>
            setUsuario(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* CAPTCHA */}
        <ReCAPTCHA
          sitekey="6LfuhPwsAAAAAP4Sha7lxhr0Z3kuVlKZqfv2Gf8t"
          onChange={(value) =>
            setCaptcha(value)
          }
        />

        <button onClick={iniciarSesion}>
          Ingresar
        </button>

      </div>

    </div>
  );
}

export default Login;
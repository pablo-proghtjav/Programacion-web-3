import { useEffect, useState } from "react";
import "./tienda.css";

interface TiendaProps {

  cambiarPagina: React.Dispatch<
    React.SetStateAction<string>
  >;

}

interface TiendaData {
  idTienda: number;
  nombre: string;
  direccion: string;
}

function Tienda({
  cambiarPagina
}: TiendaProps) {

  const [tiendas, setTiendas] = useState<TiendaData[]>([]);

  useEffect(() => {
    const obtenerTiendas = async () => {

      const response = await fetch(
        "http://localhost:3000/api/tienda"
      );

      const data = await response.json();

      setTiendas(data);

    };

    obtenerTiendas();

  }, []);

   const generarReporte = async (tienda: TiendaData) => {
    console.log("la tienda es ",tienda)
  const response = await fetch(
    `http://localhost:3000/api/document/ventas/${tienda.idTienda}`
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("Error del backend:", text);
    return;
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(
    new Blob([blob], { type: "application/pdf" })
  );

  const a = document.createElement("a");
  a.href = url;
  a.download = `reporte-ventas-${tienda.idTienda}.pdf`;

  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};

  const ingresarTienda = (
    tienda: TiendaData
  ) => {

    localStorage.setItem("tienda",JSON.stringify(tienda));

    cambiarPagina("dashboard");

  };

  return (

    <div className="tienda-container">

      <h1 className="titulo">
        Selecciona una Tienda
      </h1>

      <div className="cards-container">

        {tiendas.map((tienda) => (

          <div
            className="tienda-card"
            key={tienda.idTienda}
          >

            <h2>{tienda.nombre}</h2>

            <h4>{tienda.direccion}</h4>

            <button
              onClick={() =>
                ingresarTienda(tienda)
              }
            >
              Ingresar
            </button>

            <button className="btn-Reporte"
              onClick={() =>
                generarReporte(tienda)
              }
            >
              Generar Reporte
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Tienda;
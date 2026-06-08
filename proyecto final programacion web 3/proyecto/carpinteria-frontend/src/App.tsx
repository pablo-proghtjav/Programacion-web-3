import { useState } from "react";

import Login from "./interface/Login";
import Tienda from "./interface/Tienda";
import Dashboard from "./interface/Dashboard";

function App() {

  const [pagina, setPagina] = useState("login");

  return (
    <>
      {pagina === "login" && (
        <Login cambiarPagina={setPagina} />
      )}
      {pagina === "tienda" && (
        <Tienda cambiarPagina={setPagina} />
      )}      
      {pagina === "dashboard" && (
        <Dashboard
          cambiarPagina={setPagina}
        />
      )}
    </>
  );
}

export default App;

/*import Cliente from "./interface/Cliente";

function App() {
  return <Cliente />;
}

export default App;*/
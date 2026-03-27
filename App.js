import React, { useState } from "react";

export default function SarahStudioApp() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [servicio, setServicio] = useState("Manicura");
  const [ventas, setVentas] = useState([]);

  const servicios = {
    Manicura: 50,
    "Soft Gel": 125,
    Acrilicos: 180,
    Pedicura: 80,
  };

  const duracion = {
    Manicura: 90,
    "Soft Gel": 120,
    Acrilicos: 180,
    Pedicura: 90,
  };

  const agregarCliente = () => {
    if (!nombre) return;
    setClientes([...clientes, { nombre, visitas: 0 }]);
    setNombre("");
  };

  const registrarVenta = () => {
    if (!nombre) return;

    let cliente = clientes.find((c) => c.nombre === nombre);
    let visitas = cliente ? cliente.visitas + 1 : 1;

    let precio = servicios[servicio];
    let descuento = 0;

    if (visitas >= 10) descuento = 0.3;
    else if (visitas >= 5) descuento = 0.1;

    let total = precio - precio * descuento;

    const nuevaVenta = {
      cliente: nombre,
      servicio,
      precio,
      descuento,
      total,
      fecha: new Date().toLocaleDateString(),
    };

    setVentas([...ventas, nuevaVenta]);

    setClientes((prev) =>
      prev.map((c) =>
        c.nombre === nombre ? { ...c, visitas } : c
      )
    );
  };

  return (
    <div style={{ padding: 20, background: "#f5f0e6", minHeight: "100vh" }}>
      <h1>💅 Sarah Studio</h1>

      <h2>Agregar Cliente</h2>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <button onClick={agregarCliente}>Agregar</button>

      <h2>Registrar Servicio</h2>
      <select onChange={(e) => setServicio(e.target.value)}>
        {Object.keys(servicios).map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <button onClick={registrarVenta}>Agendar y cobrar</button>

      <h2>Ventas</h2>
      {ventas.map((v, i) => (
        <div key={i} style={{ background: "white", margin: 10, padding: 10 }}>
          <p>Cliente: {v.cliente}</p>
          <p>Servicio: {v.servicio}</p>
          <p>Total: S/{v.total}</p>
        </div>
      ))}
    </div>
  );
}

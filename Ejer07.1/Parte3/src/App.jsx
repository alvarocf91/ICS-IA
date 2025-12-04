import React, { useState, useCallback, memo } from "react";

/*
  Toggle here to try "broken" vs "fixed"
*/
const USE_FIXED = false; // false = problem present (inline funcs). true = optimized.

function makeRandomError(id) {
  const messages = [
    "No se pudo cargar el usuario",
    "Timeout de servidor",
    "Error al guardar cambios",
    "Token inválido",
    "Error desconocido"
  ];
  return {
    id,
    message: messages[Math.floor(Math.random() * messages.length)]
  };
}

/* ===========================
   =  VERSION BROKEN (problema)
   =========================== */

function BrokenToastItem({ error, onClose }) {
  // This will log on every render of this ToastItem
  console.log("Render: BrokenToastItem", error.id);
  return (
    <div style={toastStyle}>
      <div>{error.message}</div>
      {/* onClose passed here is created inline by parent (see BrokenToastContainer) */}
      <button onClick={onClose} style={btnStyle}>Cerrar</button>
    </div>
  );
}

function BrokenToastContainer({ errors, clearError }) {
  console.log("Render: BrokenToastContainer");
  return (
    <div style={containerStyle}>
      {errors.map(e => (
        // PROBLEM: parent creates a new inline function for each item
        <BrokenToastItem
          key={e.id}
          error={e}
          onClose={() => clearError(e.id)} // <- inline function recreated each render
        />
      ))}
    </div>
  );
}

/* ===========================
   =   VERSION FIXED (solución)
   =========================== */

// Memoized ToastItem: will only re-render if its props change (error or onClose ref)
const FixedToastItem = memo(function FixedToastItem({ error, onClose }) {
  console.log("Render: FixedToastItem", error.id);
  return (
    <div style={toastStyle}>
      <div>{error.message}</div>
      {/* This onClick calls the stable onClose with id */}
      <button onClick={() => onClose(error.id)} style={btnStyle}>Cerrar</button>
    </div>
  );
});

// Container passes the SAME onClose function reference to every FixedToastItem.
// FixedToastItem will only re-render if `error` object reference changes or onClose ref changes.
const FixedToastContainer = memo(function FixedToastContainer({ errors, onClearError }) {
  console.log("Render: FixedToastContainer");
  return (
    <div style={containerStyle}>
      {errors.map(e => (
        <FixedToastItem key={e.id} error={e} onClose={onClearError} />
      ))}
    </div>
  );
});

/* ===========================
   =   APP (switch between broken/fixed)
   =========================== */

export default function App() {
  const [errors, setErrors] = useState(() => [
    makeRandomError(1),
    makeRandomError(2)
  ]);
  const [nextId, setNextId] = useState(3);

  // Clear a single error
  const clearError = (id) => {
    setErrors(prev => prev.filter(e => e.id !== id));
  };

  // CLEAR ALL
  const clearAll = () => setErrors([]);

  // ADD one
  const addError = () => {
    setErrors(prev => [...prev, makeRandomError(nextId)]);
    setNextId(id => id + 1);
  };

  // ---------------------------
  // Optimization: stable callback
  // ---------------------------
  // In the fixed version we pass a stable function reference `onClearError` to children,
  // created with useCallback so the reference only changes when `setErrors` identity changes.
  const onClearError = useCallback((id) => {
    setErrors(prev => prev.filter(e => e.id !== id));
  }, []); // no deps (setErrors is stable)

  return (
    <div style={{ padding: 20 }}>
      <h2>Ejercicio 3 — Toasts (useCallback demo)</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={addError} style={{ marginRight: 8 }}>Agregar error</button>
        <button onClick={clearAll}>Limpiar todos</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Errores actuales:</strong> {errors.length}
      </div>

      <div style={{ border: "1px dashed #ccc", padding: 12, borderRadius: 6 }}>
        {USE_FIXED ? (
          // FIXED: pass stable onClearError and memoized container/item
          <FixedToastContainer errors={errors} onClearError={onClearError} />
        ) : (
          // BROKEN: pass inline function down; causes recreation every render
          <BrokenToastContainer errors={errors} clearError={clearError} />
        )}
      </div>

      <hr style={{ marginTop: 20 }} />
      <div style={{ fontSize: 13, color: "#444", marginTop: 8 }}>
        <div><strong>Debug:</strong></div>
        <div>Revisa la consola para ver los `console.log` de cada ToastItem al re-render.</div>
        <div>Usa React Profiler para comparar el comportamiento antes/después.</div>
      </div>
    </div>
  );
}

/* ===============
   Simple styles
   =============== */
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  maxWidth: 420
};
const toastStyle = {
  background: "#fff",
  padding: 10,
  borderRadius: 6,
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};
const btnStyle = {
  marginLeft: 12
};

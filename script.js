document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  function actualizarEstado() {
    ramos.forEach((ramo) => {
      const id = ramo.dataset.id;
      const prereq = ramo.dataset.prerreq ? ramo.dataset.prerreq.split(",") : [];
      const aprobado = localStorage.getItem(id) === "true";

      // Estado aprobado
      if (aprobado) {
        ramo.classList.add("aprobado");
      } else {
        ramo.classList.remove("aprobado");
      }

      // Verificar bloqueo
      const bloqueado = prereq.some((p) => localStorage.getItem(p) !== "true");
      if (bloqueado && !aprobado) {
        ramo.classList.add("bloqueado");
        ramo.removeEventListener("click", handleClick);
      } else {
        ramo.classList.remove("bloqueado");
        ramo.addEventListener("click", handleClick);
      }
    });
  }

  function handleClick(e) {
    const ramo = e.currentTarget;
    if (ramo.classList.contains("bloqueado")) return;

    const id = ramo.dataset.id;
    const nuevoEstado = !ramo.classList.contains("aprobado");
    localStorage.setItem(id, nuevoEstado);
    actualizarEstado();
  }

  actualizarEstado();
});

window.addEventListener("offline", (event) => {
  console.log("Estoy Offline!!");
});

window.addEventListener("online", (event) => {
  console.log("OnLine");
});

if (!navigator.onLine) {
  console.log("Sin conexión");
}

// ======================================


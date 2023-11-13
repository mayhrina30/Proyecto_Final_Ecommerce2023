function iniciarSesion() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const mensajeBienvenida = document.getElementById("mensajeBienvenida");

  if (username === "usuario_valido" && password === "contrasena_valida") {
    mensajeBienvenida.style.display = "block";

    return false; // Evitar que el formulario se envíe para mantener el mensaje visible
  } else {
    alert(" Te damos la Bienvenida ");
    return false; // Evitar que el formulario se envíe
  }
}

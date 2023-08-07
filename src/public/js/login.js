let currentURL = window.location.href;
let btnIniciarSesion = document.getElementById("iniciarSesionbtn");
let btnRegistrarme = document.getElementById("Registrarme");
let btnGithub = document.getElementById("btnGithub");

btnGithub.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicj en btn github");
  //href="/api/sessions/github"
  window.location.replace("/api/sessions/github");
});

btnIniciarSesion.addEventListener("click", async (event) => {
  event.preventDefault();

  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;
  console.log(currentURL);

  let obj = {
    email: email,
    password: password,
  };
  console.log("usuario que intenta iniciar sesion : ", obj);
  if (currentURL[1] != "") {
    currentURL = currentURL.split("/login");
  }
  let respuesta = "";
  // const response = await fetch(currentURL[0] + "/api/sessions/login", {
  //   method: "POST",
  //   body: JSON.stringify(obj),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  await fetch(currentURL[0] + "/api/sessions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Especifica el tipo de contenido del cuerpo de la solicitud
    },
    body: JSON.stringify(obj), // Convierte los datos a formato JSON y los envía en el cuerpo de la solicitud
  })
    .then((response) => {
      if (response.ok) {
        // La respuesta fue exitosa
        return response.json(); // Convierte la respuesta a formato JSON
      } else {
        // La respuesta tuvo un error
        console.log("error en la solicitudd 1");
        respuesta = response;
        throw new Error("Error en la solicitud");
      }
    })
    .then((responseData) => {
      // Hacer algo con los datos de la respuesta
      respuesta = responseData;
      console.log(responseData);
    })
    .catch((error) => {
      // Manejar errores de la solicitud
      console.error(error);
    });
  console.log(respuesta, "63");

  const responseData = respuesta;
  if (respuesta.status == "error") {
    console.log("error al iniciar sesion bad credentials");

    await Swal.fire(
      `Error: ${respuesta.error}`,
      "Ocurrio un problema al inciar sesion bad credentials!!!",
      "info"
    );
    //throw new Error("Error en la solicitud");
  }
  if (responseData.status === "success") {
    await Swal.fire("Inicio Sesion con exito!!!", "", "success");
    window.location.replace("/api/products");
  } else {
    await Swal.fire(
      `Error: ${respuesta.statusText}`,
      "Ocurrio un problema al inciar sesion!!!",
      "info"
    );
    //throw new Error("Error en la solicitud");
  }
});

btnRegistrarme.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("/register");
});

async function goToChangePass() {
  let email = document.getElementById("inputEmail").value;
  let enviarEmailLink = false;
  console.log(email);
  if (email) {
    let data = "";
    let urlAux = currentURL.split("/login");
    console.log(urlAux[0] + "/api/mail/passRecovery");
    const respuesta = await fetch(
      urlAux[0] + "/api/mail/passRecovery/" + email,
      {
        method: "GET",
        //body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(async (result) => {
        emailVerificado = result;
        console.log(emailVerificado);
        // Manejar la respuesta del servidor

        console.log(
          "resultado existe email para recuperar?-> ",
          emailVerificado
        );
        console.log("respuesta", emailVerificado);

        if (emailVerificado.status != "error") {
          enviarEmailLink = true;
          console.log(
            "Se acaba de enviar un correo a tu email para reestablecer tu contraseña"
          );
          await fetch(urlAux[0] + "/api/mail/passRecovery/" + email, {
            method: "GET",
            //body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((result) => {
              emailVerificado = result;
              console.log(emailVerificado);
              // Manejar la respuesta del servidor
            })
            .catch((err) => {
              console.log("ERROR: ", err);
            });
        } else {
          enviarEmailLink = false;
        }
        if (!enviarEmailLink) {
          await Swal.fire(
            `Debes escribir un email valido!!!`,
            "Escribe tu email para poder reestrablecer tu contraseña",
            "info"
          );
        } else {
          await Swal.fire(
            `Se envio el link a tu correo!!!`,
            "Se envio un link a tu correo para que ingreses y cambies tu contraseña",
            "success"
          );
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  } else {
    await Swal.fire(
      `Debes escribir un email en el campo de email!!!`,
      "Escribe tu email para poder reestrablecer tu contraseña",
      "info"
    );
  }
}

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

function init() {
  armarConsulta();
}

function cargarCards(data) {
  let divRes = document.getElementById("favorite");
  divRes.innerHTML = "";
  let divCols = document.createElement("div");
  divCols.classList.add("row", "row-cols-2", "row-cols-md-4", "g-4");
  data.forEach((character) => {
    let ids = localStorage.getItem("personajes");
    if (ids) {
      ids = JSON.parse(ids);
    } else {
      ids = [];
    }

    let card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
            <div class="card">
                <img src="${character.image}" class="card-img-top" alt="${
      character.name
    }">
                <div class="card-body">
                    <span class="card-title">Nombre</span>
                    <p class="m-0 p-0">${character.name}</p>
                    <span>Especie</span>
                    <p class="m-0 p-0">${character.species}</p>
                    <span>Episodio de aparición</span>
                    <div class="d-flex justify-content-between">
                        <p class="m-0 p-0">${character.episode[0].episode}</p>
                        ${
                          ids.includes(character.id)
                            ? `<i class="bi bi-heart-fill" onclick="eliminar(${character.id})"></i>`
                            : `<i class="bi bi-heart" onClick="guardar(${character.id})"></i>`
                        }
                    </div> 
                </div>
            </div>`;
    divCols.appendChild(card);
  });
  divRes.appendChild(divCols);
}

function guardar(personaje) {
  personaje = JSON.stringify(personaje);
  let ids = localStorage.getItem("personajes");
  if (ids) {
    ids = JSON.parse(ids);
    if (!ids.includes(personaje)) {
      ids.push(personaje);
      localStorage.setItem("personajes", JSON.stringify(ids));
    }
  } else {
    ids = [personaje];
    localStorage.setItem("personajes", JSON.stringify(ids));
  }
  armarConsulta();
}

function eliminar(personaje) {
  personaje = JSON.stringify(personaje);
  let ids = localStorage.getItem("personajes");
  if (ids) {
    ids = JSON.parse(ids);
    // eliminar el personaje
    ids = ids.filter((id) => id !== personaje);
    localStorage.setItem("personajes", JSON.stringify(ids));
  }
  armarConsulta();
}

function armarConsulta() {
  let divRes = document.getElementById("favorite");
  let ids = localStorage.getItem("personajes");
  if (ids) {
    ids = JSON.parse(ids);
  }

  console.log("%cmainFav.js line:97 ids", "color: #007acc;", ids);

  const queryGraphQL = (ids) => `{    
        charactersByIds (ids : ${ids}){
          id
          name
          status
          species
          type 
          gender
          origin {
            id
            name
            dimension
            created
          }
          image
          episode {
            id
            name
            air_date
            episode
            created
          }
          created
        }
      }`;

  let options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryGraphQL(JSON.stringify(ids)),
    }),
  };

  fetch("https://rickandmortyapi.com/graphql", options)
    .then((response) => response.json())
    .then(function (res) {
      divRes.style.display = "none";
      cargarSpinner();
      console.log("%cmainFav.js line:140 res", "color: #007acc;", res);
      cargarCards(res.data.charactersByIds);
    })
    .finally(function () {
      setTimeout(() => {
        const spinner = document.getElementById("spinner");
        spinner.style.display = "none";
        divRes.style.display = "block";
      }, 2000);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function cargarSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
  spinner.innerHTML = `
        <div class="text-center spinner">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
}

init();

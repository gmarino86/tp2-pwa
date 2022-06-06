window.addEventListener("offline", (event) => {
  console.log("Estoy Offline!!");
});

window.addEventListener("online", (event) => {
    console.log("OnLine");
});

if (!navigator.onLine) {
    console.log("Sin conexión");
}


function armarConsulta() {
    const divRes = document.getElementById("respuesta");

    const queryGraphQL = () => `{
        allCharacters(sortField:"name" sortOrder : "asc") {
            id,
            name,
            normalized_name,
            gender
        }
    }`
    
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: queryGraphQL(),
        }),
    };
    
    fetch("https://rickandmortyapi.com/graphql", options)
    .then((response) => response.json())
    .then(function (res) {
        divRes.innerHTML = JSON.stringify(res.data);
    })
    .finally(function () {
        // sacar un loading
    })
    .catch(function (err) {
        console.log("Algo fallo crack", err);
    });
}


fetch("https://rickandmortyapi.com/api/character")
.then((response) => response.json())
.then(res => {
    console.log('%cmain.js line:53 res', 'color: #007acc;', res);
})

const URL = "https://assets.breatheco.de/apis/fake/todos/user/afernandez"

export const getListado = () => {
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            ;
            console.log("Tarea recibida con exito: ", data);
            data.map((check) => {
                if (check.done === true) setRealizadas(realizadas.concat(check))
                else setTareas(tareas.concat(data))
              
            })
        })
        .catch((error) => {
            console.error("Error al comprobar informacion del servidor:", error);
        });
    ;
}
 export const putTareas = (newtareas) => {
    fetch(URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newtareas), // lo tiene que recibir en formato stringify este body con  formato de texto por la forma de comunicacion https
    })
        .then(() => {
            console.log("Tarea enviada con exito: ");
            //getListado()
        })

        .catch((error) => {
            console.log("error de envio ", error);
        });
}

import React, { useEffect, useState } from "react";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/afernandez"
const listado = fetch(URL, {
	method: "GET",
	headers: { "Content-Type": "application-json" }
})
	.then((response) => {
		console.log(response.ok)
		console.log(response.status)
		console.log(response.text)
		return response.json()
	})
	.then((data) => {
		console.log(data)
		return setTareas(data)
	})
	.catch((error) => {
		console.log("esto es un error", error)
	})

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [tareas, setTareas] = useState([])

	useEffect(() => {listado}, []) // preguntar por que no se pinta ya la bdd si la pongo en una const arriba 

	// hacer una funcion añadir tarea entonces cuando yo le de a la tecla enter && el inputvalue.length sea mayor a x caracteres, esta funcion me pondra en el body del metodo put la nueva tarea ?
	//
	// cuando le de click al icono papelera, tiene que borrar con el metodo DELETE (?) 

	const putTarea = (tareas) => { //solicitud PUT creada al servidor 
		fetch(URL, {
			method: "PUT",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify(tareas), // lo tiene que recibir en formato stringify este body con  formato de texto por la forma de comunicacion https
		})
			.then(() => {
				console.log("tarea enviada");
			})

			.catch((error) => {
				console.log("error de envio ", error);
			});
	}


	return (
		<div className="text-center">
			<h1> To do list with Fetch</h1>
			<input type="text" value={inputValue}
				onChange={(element) => setInputValue(element.target.value)}
				onKeyDown={(e) => { // en React este paramentro representa el evento de tecla y key es el tipo de tecla 
					if (e.key === "Enter" && inputValue.length >= 2) {
						setTareas(tareas.concat(putTarea)) // el set tareas tendra que hacer un put a la DB  para añadirla en el array
						//setTareas() al mismo tiempo tendra que tener un GET para ir recibiendo lo que vamos poniendo 
						setInputValue(" ")
					}

				}
				}
				placeholder="escriba la tarea" />


			<ul className="list-group">
				{tareas.map((tarea) => (
					<li className="list-group-item">
						{tarea.label}


					</li>
				))}
			</ul>

		</div>
	);
};

export default Home;

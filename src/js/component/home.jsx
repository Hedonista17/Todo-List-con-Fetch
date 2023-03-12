import React, { useEffect, useState } from "react";
import Intro from "/workspace/Todo-List-con-Fetch/src/js/component/intro.jsx";


const URL = "https://assets.breatheco.de/apis/fake/todos/user/afernandez"



const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);
   

	const getListado = () => {
		fetch(URL, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then((response) => {
				
				return response.json()
			})
			.then((data) => {
				setTareas(data)
			})
			.catch((error) => {
				console.log("error al obtener la informacion", error)
			})
	}

	const putTareas = (newtareas) => {
		fetch(URL, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newtareas), // lo tiene que recibir en formato stringify este body con  formato de texto por la forma de comunicacion https
		})
			.then(() => {
				console.log("tarea enviada");
				getListado()
			})

			.catch((error) => {
				console.log("error de envio ", error);
			});
	}


	useEffect( getListado , [])

	const añadirTarea = () => {
		const datos = { label: inputValue, done: false };
		const nuevaTarea = [...tareas, datos];
		putTareas(nuevaTarea);

	}

	const borrarTarea = (index) => {
		const datos = [...tareas] // 1º creo una copia de las tareas que ya tengo (array)/estado
		datos.splice(index,1); //2º metodo filter, devuelve un nuevo array pero eliminando el indice que le indicamos 
		setTareas(datos); // ddespues actualizo el estado de las tareas con los nuevos datos
		putTareas(datos); // meto los datos en el servidor
		getListado();

	}
	const check = (indice) => {
		const datos = { done: true}; //1º el indice para recorrer el array 
		const tareaLista =[...tareas, datos]; //2º accedo a la key done  y luego lo negamos para ir cambiando true/false
		putTareas(tareaLista[indice]);
		getListado();
	}


	return ( // poner debajo de lalinea 58 el loading 
		<div className="container">
			< Intro />

			<div className="row">
				<input type="text" value={inputValue}
					onChange={(element) => setInputValue(element.target.value)}
					onKeyDown={(e) => { // en React este paramentro representa el evento de tecla y key es el tipo de tecla 
						if (e.key === "Enter" && inputValue.length >= 2) {
							añadirTarea()
							setInputValue(" ")
						}
					}
					}
					placeholder="Escribe tus tareas pendientes " />
			</div>

			<ul className="list-group">
				{tareas.map((tarea) => (
					<li key={tarea.label} className="list-group-item">
						{tarea.label}
						<i className="fa-solid fa-trash" onClick={borrarTarea}></i>
						<i id="iconoCheck" class="fa-solid fa-check-to-slot" onClick={check}></i>

					</li>
				))}
			</ul>
                      
		</div>
	);
};

export default Home;



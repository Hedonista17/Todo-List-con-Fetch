import React, { useEffect, useState } from "react";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/afernandez"


const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [tareas, setTareas] = useState([])

	const getListado = () => {
		fetch(URL, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then((response) => {
				console.log(response.ok)
				console.log(response.status)
				console.log(response.text)
				return response.json()
			})
			.then((data) => {
				console.log(data)
				setTareas(data)
			})
			.catch((error) => {
				console.log("esto es un error", error)
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

	useEffect(() => {getListado()}, []) 

	const añadirTarea = () => {
       const datos = {label: inputValue , done : false};
	   const nuevaTarea = [...tareas,datos];
	   putTareas(nuevaTarea);
	
	}

	const borrarTarea = (indice) =>{
		const datos = [...tareas] // 1º creo una copia de las tareas que ya tengo (array)/estado
		datos.splice(indice,1); //2º metodo splice empiezo en mi indice(donde me encuentro) y borro solo 1
		setTareas(datos); // actualizar el estado de las tareas con los nuevos datos
		 putTareas(datos); // meto los datos en el servidor
		 getListado(); // me los traigo del server 
         console.log("datos borrados no más",datos[indice])
	}
	const check =(indice) => {
	const datos = [...tareas]; //1º el indice para recorrer el array 
	; //2º accedo a la key done  y luego lo negamos para ir cambiando true/false
	
	putTareas(datos);
	getListado();
                     }
	return ( // poner debajo de lalinea 58 el loading 
		<div className="text-center"> 
			<h1> To do list with Fetch</h1> 
		
			<input type="text" value={inputValue}
				onChange={(element) => setInputValue(element.target.value)}
				onKeyDown={(e) => { // en React este paramentro representa el evento de tecla y key es el tipo de tecla 
					if (e.key === "Enter" && inputValue.length >= 2) {
						añadirTarea()
						setInputValue(" ")
					}}
				     }
				placeholder="escriba la tarea" />


			<ul className="list-group">
				{tareas.map((tarea,indice) => (
					<li className="list-group-item">
						{tarea.label}
						<i class="fa-solid fa-trash" onClick={borrarTarea(indice)}></i>
						<i class="fa-solid fa-check-to-slot" onClick={check(indice)}></i>

					</li>
				))}
			</ul>

		</div>
	);
};

export default Home;

import React, { useEffect, useState } from "react";
import Intro from "/workspace/Todo-List-con-Fetch/src/js/component/intro.jsx";


const URL = "https://assets.breatheco.de/apis/fake/todos/user/afernandez"



const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);
	const [loading, setLoading] = useState(false);

	const getListado = () => {
		setLoading(true)
		fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
		
				console.log("Tarea recibida con exito: ", data);
				setTareas(data)
				setLoading(false)
			
			})
			.catch((error) => {
				console.error("Error al comprobar informacion del servidor:", error);
			});
		;
	}
	const putTareas = (newtareas) => {
		setLoading(true)
		fetch(URL, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newtareas), // lo tiene que recibir en formato stringify este body con  formato de texto por la forma de comunicacion https
		})
			.then(() => {
				console.log("Tarea enviada con exito: ");
				getListado()
				setLoading(false)
			})

			.catch((error) => {
				console.log("Error de envio ", error);
			});
	}


	useEffect(() => getListado(), [])


	const añadirTarea = () => {
		const datos = { label: inputValue, done: false };
		const nuevaTarea = [...tareas, datos];
		putTareas(nuevaTarea);
	}

	const borrarTarea = (index) => {
		const newTodo = [...tareas] // si es array u objeto spread operator para poder trabajar sobre esa variable
		newTodo.splice(index,1) // metodo splice 
		putTareas(newTodo)  // put al postman  --no se setea por uqe va inplicito en el put el metodo get // setTareas()
	}
	const check =  (indice) => {
		const tareasCompletadas = [...tareas]
		tareasCompletadas[indice].done = true;
		putTareas(tareasCompletadas) // no es asincrono, como tarda mas en enviar que en cargar por eso me las muestra en vacio cuando le hago el check 
	}


	return (

		<div className="container">
			<div className="row">
				< Intro />

				<div className="input-group flex-nowrap">
					<input id="input" className="form-control" type="text" value={inputValue}
						onChange={(element) => setInputValue(element.target.value)}
						onKeyDown={(e) => { // en React este paramentro representa el evento de tecla y key es el tipo de tecla 
							if (e.key === "Enter" && inputValue.length >= 3) {
								añadirTarea()
								setInputValue(" ")
							}
						}
						}
						placeholder="Escribe tus tareas pendientes " />
				</div>

				<div className="col-6 my-5">

					<h3> Tareas Pendientes  </h3>
					{loading ? (<div className="d-flex align-items-center text-light">
						<strong>Cargando...</strong>
						<div className="spinner-border ms-4" role="status" aria-hidden="true"></div>
					</div>) : (<ul className="list-group">
						{tareas.map((tarea, index) => (
							<li key={tarea.label} className="list-group-item">
								{tarea.label}
								<i title="Borrar" id="iconoTrash" className="fa-solid fa-trash fa-lg mx-4 mt-2" onClick={() => borrarTarea(index)}></i>
								<i title="Marcar como Realizada" id="iconoNOCheck" className="fa-regular fa-circle-check fa-xl  mt-2" onClick={() => check(index)}></i>
							</li>
						))}
					</ul>)}

					<div className="mx-3 my-3" id="contador"> {tareas.length == 1 ? tareas.length + " tarea por realizar 😩 " : tareas.length + " tareas por realizar 😩 "} </div>
				</div>

				<div className="col-6 my-5">
					<h3>  Tareas Realizadas  </h3>

					<ul className="list-group">
						{tareas.map((tarea, index )=> {
							return  tarea.done ? (<li key={index} className="list-group-item">
							{tarea.label}  
							<i id="iconoTrash"  title="Borrar" className="fa-solid fa-trash fa-lg mx-4 mt-2" onClick={() => borrarTarea(index)} ></i>
							<i title="Tarea Completada" id="iconoCheck" className="fa-regular fa-circle-check fa-xl  mt-2" ></i>
						</li>) : null
							
						})}
					</ul>
					<div className="mx-3 my-3" id="contador"> {tareas.length == 1 ? tareas.length + " tarea realizada 😀 " : tareas.length + " tareas realizadas 😀 "} </div>
				</div>
			</div>
		</div>

	);
};

export default Home;



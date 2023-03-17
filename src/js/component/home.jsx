import React, { useEffect, useState } from "react";
import Intro from "/workspace/Todo-List-con-Fetch/src/js/component/intro.jsx";


const URL = "https://assets.breatheco.de/apis/fake/todos/user/afernandez"



const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);
	const [realizadas, setRealizadas] = useState([]);
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
				;
				console.log("Tarea recibida con exito: ", data);
				data.map((check) => {
					if (check.done === true) setRealizadas(realizadas.concat(check))
					else setTareas(tareas.concat(data))
					setLoading(false)
				})
			})
			.catch((error) => {
				console.error("Error al comprobar informacion del servidor:", error);
			});
		;
	}
	const putTareas = (newtareas) => {
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


	useEffect(() => getListado(), [])


	const añadirTarea = () => {
		const datos = { label: inputValue, done: false };
		const nuevaTarea = [...tareas, datos];
		putTareas(nuevaTarea);
	}

	const borrarTarea = () => {
		const datos = [...tareas] // 1º creo una copia de las tareas que ya tengo (array)/estado
		datos.filter((tarea) => tarea[index] != index[index])
		putTareas(datos); // meto los datos en el servidor


	}
	const check = (tarea, indice) => {
		const datos = tarea.done = true;                          //1º modifico a true la key
		setRealizadas([...realizadas, datos]);      //2º al state realizadas que empieza en  [] le paso esta tarea chekeada
		setTareas(tareas.filter((tareaIncompleta) => tareaIncompleta.done !== false)); //3º filtro las tareas realizadas para quitarla de pendientes
		putTareas([...tareas]);

	}


	return (

		<div className="container">
			<div className="row">
				< Intro />

				<div className="input-group flex-nowrap">
					<input id="input" className="form-control" type="text" value={inputValue}
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

				<div className="col-6 my-5">

					<h3> 🕀  Tareas Pendientes 🕀 </h3>
					{loading ? (<div className="d-flex align-items-center text-light">
						<strong>Cargando...</strong>
						<div className="spinner-border ms-4" role="status" aria-hidden="true"></div>
					</div>) : (<ul className="list-group">
						{tareas.map((tarea, index) => (
							<li key={tarea.label} className="list-group-item">
								{tarea.label}
								<i title="Borrar" id="iconoTrash" className="fa-solid fa-trash fa-lg mx-4 mt-2" onClick={borrarTarea}></i>
								<i title="Marcar como Realizada" id="iconoNOCheck" className="fa-regular fa-circle-check fa-xl  mt-2" onClick={() => check(tarea, index)}></i>
							</li>
						))}
					</ul>)}

					<div className="mx-3 my-3" id="contador"> {tareas.length == 1 ? tareas.length + " tarea por realizar 💀 " : tareas.length + " tareas por realizar 💀 "} </div>
				</div>

				<div className="col-6 my-5">
					<h3> 🕀 Tareas Realizadas 🕀 </h3>

					<ul className="list-group">
						{realizadas.map((tarea, index) => (
							<li key={index} className="list-group-item">
								{tarea.label}
								<i id="iconoTrash" className="fa-solid fa-trash fa-lg mx-4 mt-2" ></i>
								<i title="Tarea Completada" id="iconoCheck" className="fa-regular fa-circle-check fa-xl  mt-2" ></i>
							</li>
						))}
					</ul>
					<div className="mx-3 my-3" id="contador"> {realizadas.length == 1 ? realizadas.length + " tarea realizada 😇 " : realizadas.length + " tareas realizadas 😇 "} </div>
				</div>
			</div>
		</div>

	);
};

export default Home;



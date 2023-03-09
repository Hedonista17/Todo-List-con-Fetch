import React, {useEffect, useState} from "react";




//create your first component
const Home = () => {
const [tareas,setTareas] = useState()

useEffect( ()=>{
	fetch("https://assets.breatheco.de/apis/fake/todos/user/afernandez",{
		method:"GET",
		headers:{"Content-Type":"application-json"}
	})
	.then((response)=>{
		console.log(response.ok)
		console.log(response.status)
		console.log(response.text)
		return response.json()
	})
	.then((data) => {
		console.log(data)
		return setTareas(data)
	})
	.catch((error)=>{
		console.log("esto es un error",error)
	})
},[])


	return (
		<div className="text-center">
			hola 
		</div>
	);
};

export default Home;

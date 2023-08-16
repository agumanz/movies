import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Moviestar from "../../img/Moviestar.png";
import "../../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {
	const { store, actions } = useContext(Context);

    const [form, setForm] = React.useState({ username: "", password: ""})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const key = e.target.name 
        const value = e.target.value
        setForm(prev => ({ ...prev, [key]: value}))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const apiUrl = `${process.env.BACKEND_URL}api/login`
        try {
            const res = await fetch(apiUrl, {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            localStorage.setItem("token", data?.token)
            navigate("/home")
        } catch (error) {
            console.error(error)
        }
    }

	return (
		<div className="text-center mt-5">
			<img id="image" src={Moviestar} />
		<form onSubmit={onSubmit}>
            <div>
                <input className="text-center" name="username" onChange={handleChange} type="text" id="username1" placeholder="Usuario" value={form.username} required></input>
            </div>
            <br/>
            <div>
                <input className="text-center" name="password" onChange={handleChange} type="password" id="password1" placeholder="Contraseña" value={form.password} required></input>
                <br/>
                <Link to={"/pass-recovery"} id="ps" href="#aja">Restablecer Contraseña.</Link>
            </div>
			<br/>
            <button type="submit" id="login-button">Entrar</button>
            <br/>
            <a id="sp" href="#aja">¿No tienes una cuenta?Registrate</a>
        </form>
		</div>
	);
};
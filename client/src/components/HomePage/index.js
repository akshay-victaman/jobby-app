import { useState } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../NavBar';
import './style.css'

const HomePage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if(username === '' || password === ''){
            setError("*All fields required")
            return
        }
        const credentials = {
            username,
            password
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
        const response = await fetch('http://localhost:5000/api/users/login', options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else {
                Cookies.set('jwt_token', data.jwtToken, {expires: 30})
                Cookies.set('username', data.username, {expires: 30})
                Cookies.set('role', data.role, {expires: 30})
                setError("")
            }
        } else {
            setError(data.error)
        }
    }

    return (
        <div className="homepage-container">
            <NavBar isLoggedIn={false} />
            <div className="homepage-sub-con">
                <div className="homepage-card">
                    <form onSubmit={handleLogin} className="login-form">
                        <h1 className="homepage-title">Login</h1>
                        <label className="homepage-label" id='username'>USERNAME</label>
                        <input type="text" className="homepage-input" id='username' value={username} onChange={handleUsernameChange} placeholder='Enter username'/>
                        <label className="homepage-label" id='password'>PASSWORD</label>
                        <input type="password" className="homepage-input" id='password' value={password} onChange={handlePasswordChange} placeholder='Enter password'/>
                        <button type='submit' className="login-button">Login</button>
                        <p className='error-message'>{error}</p>
                    </form>
                </div>
                <img src='/homepage-bg.avif' className='homepage-img' alt='homepage-img'/>
            </div>
        </div>
    )
}

export default HomePage;
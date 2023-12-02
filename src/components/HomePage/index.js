import { useState } from 'react';
import NavBar from '../NavBar';
import './style.css'

const HomePage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if(username === '' || password === ''){
            setError(true)
            return
        }
        setError(false)
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
                        {
                            error && <p className='error-message'>*All fields required</p>
                        }
                    </form>
                </div>
                <img src='/homepage-bg.avif' className='homepage-img' alt='homepage-img'/>
            </div>
        </div>
    )
}

export default HomePage;
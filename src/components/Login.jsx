import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../config/api.js'

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [response,setResponse] = useState(null)

    const handleLogin = async(e) =>{
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/auth/login`,{
                email,password
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = res.data;
            setResponse(data.message);
            console.log(data.message)
            const token= data.token;
            localStorage.setItem("auth-token",token)
            navigate('/task')
        } catch (error) {
            console.error("Login failed",error)
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-teal-500'>
        <div className='bg-white p-8 rounded-3xl shadow-xl w-full max-w-md'>
            <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Login</h1>
            
            <form onSubmit={handleLogin} className='space-y-4'>
                <div>
                    <label htmlFor='email' className='block text-gray-700 mb-1'>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                        placeholder='Enter your email'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password' className='block text-gray-700 mb-1'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                        placeholder='Enter your password'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-600 transition-all'
                >
                    Login
                </button>
            </form>

            <p className='text-center mt-4 text-gray-600'>
                Don't have an account? <Link to='/' className='text-teal-600 font-semibold hover:underline'>Register</Link>
            </p>

            {response && <p className='text-center mt-2 text-green-600'>{response}</p>}
        </div>
    </div>
  )
}

export default Login

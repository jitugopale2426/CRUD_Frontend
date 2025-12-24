import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BASE_URL from '../config/api.js'

const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [response,setResponse] = useState(null)

    const handleRegister = async(e) =>{
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/auth/register`,{
                name,email,password
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = res.data;
            setResponse(data.message);
            console.log(data.message)
        } catch (error) {
            console.error("Registration failed",error)
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500'>
        <div className='bg-white p-8 rounded-3xl shadow-xl w-full max-w-md'>
            <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Register</h1>
            
            <form onSubmit={handleRegister} className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block text-gray-700 mb-1'>Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400'
                        placeholder='Enter your name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email' className='block text-gray-700 mb-1'>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400'
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
                        className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400'
                        placeholder='Enter your password'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all'
                >
                    Register
                </button>
            </form>

            <p className='text-center mt-4 text-gray-600'>
                Already have an account? <Link to='/login' className='text-purple-600 font-semibold hover:underline'>Login</Link>
            </p>

            {response && <p className='text-center mt-2 text-green-600'>{response}</p>}
        </div>
    </div>
  )
}

export default Register


import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import TaskPage from './components/TaskPage'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/task' element={<TaskPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App

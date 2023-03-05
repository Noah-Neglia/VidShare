import {Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddPost from './components/AddPost';
import Login from './components/Login';
import AddPostActivityLog from './components/AddPostActivityLog';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Register />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/createpost' element={<AddPost />}/>
      <Route path='/createpost' element={<AddPost />}/>
      <Route path='/addPostActivityLog' element={<AddPostActivityLog />}/>
    </Routes>

    
  );
}

export default App;

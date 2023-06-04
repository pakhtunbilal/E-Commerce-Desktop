import './App.css';

import Nav from './components/nav';
import Footer from './components/footer';
import SignUp from './components/signup';
import PrivateComponent from './components/PrivateComponents';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import Homepage from './components/homepage';
import Updateproduct from './components/UpdateProduct';

import { BrowserRouter, Routes, Route, } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Nav />
      <Routes>
        <Route element={ <PrivateComponent />} >
        <Route path='/' element={ <Homepage />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update/:id' element={<Updateproduct />} />
        <Route path='/logout' element={<h1> logout page</h1>} />
        <Route path='/profile' element={<h1> Product listing profile</h1>} />
        </Route>

        <Route path='/signup' element={ <SignUp />} />
        <Route path='/login' element={ <Login />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;

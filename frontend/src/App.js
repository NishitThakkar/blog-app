import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import List_blog from './components/blog/List_blog';
import View_blog from './components/blog/View_blog';
import Create_blog from './components/blog/Create_blog';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import My_blog from './components/blog/My_blog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">

      <ToastContainer />

      <Router>
        <Routes>

          <Route exact path="/Create_blog" Component={Create_blog} />
          <Route exact path="/Create_blog/:id" Component={Create_blog} />

          <Route exact path="/" Component={List_blog} />

          <Route exact path="/View_blog" Component={View_blog} />
          <Route exact path="/View_blog/:id" Component={View_blog} />

          <Route exact path="/Login" Component={Login} />
          <Route exact path="/Signup" Component={Signup} />

          <Route exact path="/My_blog" Component={My_blog} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;

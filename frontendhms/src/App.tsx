import NavBar from './Components/Components/NavBar'
import Home from './Components/Components/Home'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
      <Outlet />
    </div>
  );
}

export default App;

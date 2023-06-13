
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

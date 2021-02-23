import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import City from './components/City';


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/:city">
        <City />
      </Route>

    </BrowserRouter>
  );
}

export default App;

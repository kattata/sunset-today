// react
import { BrowserRouter, Route } from 'react-router-dom';

// components
import Home from './components/Home';
import City from './components/City';


function App() {

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/city/:name">
        <City />
      </Route>

    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddCurrency from './components/AddCurrency';
import AddSales from './components/AddSales';
import Sales from './components/Sales';
import Currencies from './components/Currencies';
import Home from './components/Home';
import './index.css'

function App() {
  return (
    <div className="App">
        <Router>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/view-currencies" component={Currencies}/>
                  <Route exact path="/add-currency" component={AddCurrency}/>
                  <Route exact path="/add-sales" component={AddSales}/>
                  <Route exact path="/all-sales" component={Sales}/>
              </Switch>
      </Router>
    </div>
  );
}

export default App;

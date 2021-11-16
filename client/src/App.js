import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddCurrency from './components/currency/AddCurrency';
import ViewCurrencies from './components/currency/ViewCurrencies';
// import AddSales from './components/AddSales';
// import Sales from './components/Sales';
import Home from './components/Home';
import './index.css'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import User from './components/user/User';
import AddCustomer from './components/customer/AddCustomer';
import ViewCustomers from './components/customer/ViewCustomers';
import AddSellerAccount from './components/seller-accounts/AddSellerAccount';
import ViewSellerAccounts from './components/seller-accounts/ViewSellerAccounts';
import AddSales from './components/sales/AddSales';
import ViewSales from './components/sales/ViewSales';
import Links from './components/sales-analysis/Links';
import Quantity from './components/sales-analysis/sum/Quantity';
import ProductSales from './components/sales-analysis/sum/ProductSales';
import Total from './components/sales-analysis/sum/Total';
import VolumeWeightedProductSales from './components/sales-analysis/volume-weighted/VolumeWeightedProductSales'
import VolumeWeightedTotal from './components/sales-analysis/volume-weighted/VolumeWeightedTotal'

function App() {
  return (
    <div>
        <Router>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/signup" component={Signup}/>
                  <Route exact path="/user" component={User}/>
                  <Route exact path="/user/currency/add-currency" component={AddCurrency}/>
                  <Route exact path="/user/currency/view-currencies" component={ViewCurrencies}/>
                  <Route exact path="/user/customer/add-customer" component={AddCustomer}/>
                  <Route exact path="/user/customer/view-customers" component={ViewCustomers}/>
                  <Route exact path="/user/seller-account/add" component={AddSellerAccount} />
                  <Route exact path="/user/seller-account/view" component={ViewSellerAccounts} />
                  <Route exact path="/user/seller-account/sales/add" component={AddSales} />
                  <Route exact path="/user/seller-account/sales/view" component={ViewSales} />
                  <Route exact path="/user/seller-account/sales-analysis/view" component={Links} />
                  <Route exact path="/user/seller-account/sales-analysis/sum/quantity" component={Quantity} />
                  <Route exact path="/user/seller-account/sales-analysis/sum/product-sales" component={ProductSales} />
                  <Route exact path="/user/seller-account/sales-analysis/sum/total" component={Total} />
                  <Route exact path="/user/seller-account/sales-analysis/volume-weighted/product-sales" component={VolumeWeightedProductSales} />
                  <Route exact path="/user/seller-account/sales-analysis/volume-weighted/total" component={VolumeWeightedTotal} />
                  
              </Switch>
      </Router>
    </div>
  );
}

export default App;

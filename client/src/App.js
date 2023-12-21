import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import './App.css';
import JobsPage from './components/JobsPage';
import JobDetails from './components/JobDetailsPage';
import SignUpPage from './components/SignUpPage';
import BDEPage from './components/BDEPage';
import AccountManagerPage from './components/AccountManagerPage';


const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/jobs" component={JobsPage} />
    <Route exact path="/jobs/:id" component={JobDetails} />
    <Route exact path='/signup' component={SignUpPage} />
    <Route exact path='/bde-portal' component={BDEPage} />
    <Route exact path='/account-manager-portal' component={AccountManagerPage} />
  </Switch>
)

export default App;

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Task from './components/Task/Task';
import ToDoList from './components/ToDoList/ToDoList';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/home">
          <ToDoList/>
        </Route>
        <Route path="/task">
          <Task/>
        </Route>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

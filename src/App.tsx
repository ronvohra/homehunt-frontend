import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Create from './components/home/Create';
import EditHome from './components/home/Edit';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
            <li>
              <Link to={'/create'}> Create Home </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/'} exact component={Homepage} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditHome} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
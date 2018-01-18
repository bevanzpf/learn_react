import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';
import List from './compoments/list';
import ComponentHeader from './compoments/header';
import ComponentBody from './compoments/bodyIndex'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class Root extends React.Component{

  render(){
    return(
      <Router>
        <div>

        <Index>
          <Route exact path='/main' component={ComponentBody}/>
          <Route path={'/list/:id'} component={List}/>
          <Route path='/header' component={ComponentHeader}/>
        </Index>
        </div>
      </Router>
    );
  }
}
ReactDOM.render(<Root/>, document.getElementById('root'));
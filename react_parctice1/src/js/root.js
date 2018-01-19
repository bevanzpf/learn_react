import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './pc-index';
import MediaQuery from 'react-responsive';
import MobileIndex from './mobile-index';

export default class Root extends React.Component {

  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <PCIndex />
        </MediaQuery >
        <MediaQuery query='(max-device-width: 1224px)'>
          <MobileIndex/>
        </MediaQuery>
      </div>
    );
  }
}
ReactDOM.render(<Root />, document.getElementById('root'));
import React from 'react';
import MobileHeader from './compoments/mobile-header';
import MobileFooter from './compoments/mobile-footer';

export default class MobileIndex extends React.Component{
  render(){
    return(
      <div>
        <MobileHeader/>
        <MobileFooter/>
      </div>
    );
  }
}
import React from 'react'
import PCHeader from './compoments/pc-header';
import PCFooter from './compoments/pc-footer';

export default class PCIndex extends React.Component{
  render(){
    return(
      <div>
        <PCHeader/>
        <PCFooter/>
      </div>
    );
  }
}
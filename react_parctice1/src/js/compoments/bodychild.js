import React from 'react'

export default class BodyChild extends React.Component{
  render(){
    return(
      <div>
        <p>child page input:<input type='text' onChange={this.props.handleChildValueChange}/></p>
      </div>
    )
  }
}
import React from 'react';

export default class List extends React.Component{
  render(){
    return(
      <div>
        <h2> here is list page</h2>
        <p>id: {this.props.match.params.id}</p>
      </div>
    )
  }
}
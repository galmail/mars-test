import React, { Component } from 'react';

class Instruction extends Component {

	constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    if(this.props.onChange){
    	this.props.onChange(e.target.value);
    }
  }

  render() {
    return (
    	<input onChange={this.onChange} type="text" className="form-control" defaultValue={this.props.val} />
    );
  }

}

export default Instruction;

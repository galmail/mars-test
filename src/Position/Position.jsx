import React, { Component } from 'react';

class Position extends Component {
  
	constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  static isLost(position){
    return (position.split(' ')[3]);
  }

  static isValid(newPosition,dimension){
    const xPos = parseInt(newPosition.split(' ')[0], 10);
    const yPos = parseInt(newPosition.split(' ')[1], 10);
    const width = parseInt(dimension.split(' ')[0], 10);
    const height = parseInt(dimension.split(' ')[1], 10);
    return (xPos >= 0 && xPos <= width && yPos >= 0 && yPos <= height);
  }

  static hasScent(lastPosition,scents){
    const posArray = lastPosition.split(' ');
    posArray.pop(); // removing the orientation
    const newPosition = posArray.join(' ').trim();
    return(scents.indexOf(newPosition)>=0);
  }

  static calculateNewPosition(lastPosition,instruction){
    const x = parseInt(lastPosition.split(' ')[0], 10);
    const y = parseInt(lastPosition.split(' ')[1], 10);
    const orientation = lastPosition.split(' ')[2];
    let newPosition = lastPosition;
    switch(orientation){
      case 'N':
        if(instruction==='L') newPosition = `${x} ${y} W`;
        else if(instruction==='R') newPosition = `${x} ${y} E`;
        else if(instruction==='F') newPosition = `${x} ${y+1} ${orientation}`;
        break;
      case 'S':
        if(instruction==='L') newPosition = `${x} ${y} E`;
        else if(instruction==='R') newPosition = `${x} ${y} W`;
        else if(instruction==='F') newPosition = `${x} ${y-1} ${orientation}`;
        break;
      case 'E':
        if(instruction==='L') newPosition = `${x} ${y} N`;
        else if(instruction==='R') newPosition = `${x} ${y} S`;
        else if(instruction==='F') newPosition = `${x+1} ${y} ${orientation}`;
        break;
      case 'W':
        if(instruction==='L') newPosition = `${x} ${y} S`;
        else if(instruction==='R') newPosition = `${x} ${y} N`;
        else if(instruction==='F') newPosition = `${x-1} ${y} ${orientation}`;
        break;
      default:
        return lastPosition;
    }
    return newPosition;
  }

  onChange(e){
    if(this.props.onChange){
    	this.props.onChange(e.target.value);
    }
  }

  render() {
    return (
    	<input readOnly={this.props.readOnly} onChange={this.onChange} type="text" className="form-control" value={this.props.val} />
    );
  }
}

/////////// Position Properties ///////////

Position.propTypes = {
  val: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool
};

export default Position;

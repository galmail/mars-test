import React, { Component } from 'react';
import Position from '../Position/Position';
import Instruction from '../Instruction/Instruction';
import './Robot.css';

class Robot extends Component {

  constructor(props){
    super(props);
    this.setInitialPosition = this.setInitialPosition.bind(this);
    this.setInstructions = this.setInstructions.bind(this);
    this.state = {
      id: props.id,
      //scents: props.scents,
      positions: [
        props.position
      ],
      instructions: props.instructions,
      run: props.run
    }
  }

  run(props){
    console.log("running robot: ", this.props.id);
    // run first instruction
    this.state.instructions.split('').forEach((instruction)=>{
      const lastPosition = this.state.positions[this.state.positions.length-1];
      if(Position.isLost(lastPosition)) return;
      let newPosition = Position.calculateNewPosition(lastPosition,instruction);
      if(!Position.isValid(newPosition,props.dimension)){
        // if the last position has scent then ignore
        if(Position.hasScent(lastPosition,props.scents)){
          newPosition = lastPosition;
        }
        else {
          // mark as lost
          newPosition = `${lastPosition} LOST`;
        }
      }
      // update the robot state with the new position and carry on..
      this.setState(Object.assign(this.state,{positions: [ ...this.state.positions, newPosition ]}));

    },this);

    if(this.props.whenDone) this.props.whenDone(this.state);
  }

  componentWillUpdate(nextProps, nextState){
    if(!this.state.run && nextProps.run){
      // reset the robot state and run
      this.setState(Object.assign(this.state,{instructions: nextProps.instructions, positions: [ nextProps.position ]}));
      this.run(nextProps);
    }
  }

  setInitialPosition(position){
    this.setState(Object.assign(this.state,{positions: [ position ]}));
    if(this.props.onChange){
      this.props.onChange(this.state);
    }
  }

  setInstructions(instructions){
    this.setState(Object.assign(this.state,{instructions: instructions}));
    if(this.props.onChange){
      this.props.onChange(this.state);
    }
  }

  render() {
    return (
      <div className="Robot">
      	<h3 className="title">Robot {this.props.id}</h3>
			  <div className="form-group row">
			    <label className="col-md-4">Initial Position</label>
          <div className="col-md-8">
            <Position val={this.props.position} onChange={this.setInitialPosition} />
          </div>
			  </div>
			  <div className="form-group row">
			    <label className="col-md-4">Instructions</label>
          <div className="col-md-8">
            <Instruction val={this.props.instructions} onChange={this.setInstructions} />
          </div>
			  </div>
        <div className="form-group row">
          <label className="col-md-4">Last Position</label>
          <div className="col-md-8">
            <Position readOnly={true} val={this.state.positions[this.state.positions.length-1]} />
          </div>
        </div>
      </div>
    );
  }
}

export default Robot;

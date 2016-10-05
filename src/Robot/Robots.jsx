import React, { Component } from 'react';
import Robot from './Robot';

class Robots extends Component {

  render() {
    const createRobot = function(robot) {
      return <Robot run={robot.run} key={robot.id} id={robot.id} scents={this.props.scents} dimension={this.props.dimension} position={robot.positions[0]} instructions={robot.instructions} onChange={this.props.onChange} whenDone={this.props.whenDone}/>;
    };
    return <div className="Robots">{this.props.robots.map(createRobot.bind(this))}</div>;
  }

}

export default Robots;
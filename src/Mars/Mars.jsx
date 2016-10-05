import React, { Component } from 'react';
import Robots from '../Robot/Robots';
import './Mars.css';


class Mars extends Component {

  constructor(props) {
    super(props);
    this.runTest = this.runTest.bind(this);
    this.setDimension = this.setDimension.bind(this);
    this.updateRobots = this.updateRobots.bind(this);
    this.runNextRobot = this.runNextRobot.bind(this);
    this.addRobot = this.addRobot.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      ready: true,
      dimension: "5 3",
      scents: [],
      robots: [
        {
          id: 1,
          positions: ['1 1 E'],
          instructions: 'RFRFRFRF'
        },
        {
          id: 2,
          positions: ['3 2 N'],
          instructions: 'FRRFLLFFRRFLL'
        },
        {
          id: 3,
          positions: ['0 3 W'],
          instructions: 'LLFFFLFLFL'
        }
      ]
    };
  }

  clearPreviousRun(){
    // remove scents and for each robot, remove all positions except the initial
    const newRobots = this.state.robots.map((robot)=>{
      return Object.assign(robot,{ positions: [robot.positions[0]]});
    });
    this.setState(Object.assign(this.state,{ scents: [], robots: newRobots}));
  }

  runTest(e) {
    e.preventDefault();
    // clear previous run
    this.clearPreviousRun();
    console.log("Starting the test with state:",this.state);
    // we start by running the first robot which will trigger the next one on callback
    const firstRobot = Object.assign(this.state.robots[0],{run: true});
    const newRobots = [firstRobot, ...this.state.robots.slice(1,this.state.robots.length)];
    this.setState(Object.assign(this.state,{ ready: false, robots: newRobots }));
  }

  checkScent(robot){
    const lastPosition = robot.positions[robot.positions.length-1];
    if(lastPosition.split(' ')[3]==='LOST'){
      const scent = lastPosition.split(' ')[0] + ' ' + lastPosition.split(' ')[1];
      const newScents = this.state.scents.concat(scent);
      this.setState(Object.assign(this.state,{scents: newScents}));
      //this.updateRobots(Object.assign(robot,{scents: newScents}));
    }
  }

  runNextRobot(robot){
    this.checkScent(robot);
    // setting this robot to run=false and the next robot to run=true
    const botIndex = this.state.robots.findIndex((bot) => { return bot.id===robot.id });
    const currentBot = Object.assign(robot,{run:false});
    if(botIndex+1===this.state.robots.length){
      const newRobots = [...this.state.robots.slice(0,botIndex), currentBot];
      this.setState(Object.assign(this.state, {ready: true, robots: newRobots}));
      console.log("Finished the test with state:",this.state);
    }
    else {
      const nextBot = Object.assign(this.state.robots[botIndex+1],{run:true});
      const newRobots = [...this.state.robots.slice(0,botIndex), currentBot, nextBot, ...this.state.robots.slice(botIndex+2,this.state.robots.length)];
      this.setState(Object.assign(this.state, {robots: newRobots}));
    }
  }

  setDimension(e){
    this.setState(Object.assign(this.state, {dimension: e.target.value}));
  }

  updateRobots(robot){
    // update the state with the new robot values
    const botIndex = this.state.robots.findIndex((bot) => { return bot.id===robot.id });
    const newRobots = [...this.state.robots.slice(0,botIndex), robot, ...this.state.robots.slice(botIndex+1,this.state.robots.length)];
    this.setState(Object.assign(this.state, {robots: newRobots}));
  }

  addRobot(){
    const robots = this.state.robots.concat([{
      id: this.state.robots.length+1,
      positions: [ '' ],
      instructions: ''
    }]);
    this.setState(Object.assign(this.state, {robots: robots}));
  }

  validateForm(e){
    if(e.target.classList.contains('disabled')) e.preventDefault();
  }

  render() {
    return (
      <div className="Mars">
        <h1>Mars Test using React</h1>
        <p>Refresh the page to initialize the state</p>
        <form data-toggle="validator" role="form" onSubmit={this.runTest}>          
          <div className="form-group">
            <label htmlFor="dimension">Mars Dimension</label>
            <input pattern="\d{1,2}\s\d{1,2}" maxLength="5" onChange={this.setDimension} type="text" className="form-control" id="dimension" aria-describedby="dimensionHelp" placeholder="such as: 5 3" value={this.state.dimension} data-error="Invalid format. Use x y, where x and y are integers"/>
            <div className="help-block with-errors"></div>
          </div>
          <Robots robots={this.state.robots} dimension={this.state.dimension} scents={this.state.scents} onChange={this.updateRobots} whenDone={this.runNextRobot}/>
          <button onClick={this.addRobot} type="button" className="btn btn-primary">Add Robot</button>
          <button onClick={this.validateForm} disabled={!this.state.ready} type="submit" className="btn btn-primary btn-lg btn-block run-test-btn">Run Test</button>
        </form>
      </div>
    );
  }

}

export default Mars;

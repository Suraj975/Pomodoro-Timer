import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      maintimer: 25,
      breakTimerValue: 5,
      minutes: 25,
      seconds: 60,
      status: false,
      breakSec: 60,
      breakMin: 25,
      timershiftStatus: true
    }
  }
  start = () => {
    this.state.timershiftStatus ? this.startTimer() : this.breaker()
  }
  startTimer = () => {

    if (this.state.status === false) {
      document.getElementById("clock").style.display = "block";
      this.setState({ status: true })
      this.state.minutes === this.state.maintimer ? this.setState({ minutes: this.state.minutes - 1 }) : this.setState({ minutes: this.state.minutes })
      this.timer = setInterval(() => {

        console.log(this.state.seconds)
        this.setState({ seconds: this.state.seconds - 1 })
        if (this.state.minutes === 0 && this.state.seconds === 0) {
          document.getElementById("danger").play()
          this.setState({ timershiftStatus: false })
          document.getElementById("clock").style.display = "none";
          this.breaker()
        } else if (this.state.seconds <= 0) {
          this.setState({
            minutes: this.state.minutes - 1,
            seconds: 60
          })
        }
      }, 1000)
    }
  }

  breaker = () => {
    document.getElementById("breakClock").style.display = "block";
    this.setState({ status: false })
    clearInterval(this.timer)
    this.setState({ minutes: this.state.maintimer, seconds: 60 })
    this.state.breakMin === this.state.breakTimerValue ? this.setState({ breakMin: this.state.breakMin - 1 }) : this.setState({ breakMin: this.state.breakMin })
    this.breaktimer = setInterval(() => {
      console.log(this.state.breakSec)
      this.setState({ breakSec: this.state.breakSec - 1 })
      if (this.state.breakMin === 0 && this.state.breakSec === 0) {
        clearInterval(this.breaktimer)
        document.getElementById("danger").play()
        this.setState({ timershiftStatus: true })
        this.setState({ breakMin: this.state.breakTimerValue, seconds: 60 })
        document.getElementById("breakClock").style.display = "none";
        this.startTimer()
      } else if (this.state.breakSec <= 0) {
        this.setState({
          breakMin: this.state.breakMin - 1,
          breakSec: 60
        })
      }
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {

    console.log(prevState)

    this.stopTimer = () => {
      this.setState({ status: false })
      clearInterval(this.timer)
      clearInterval(this.breaktimer)
    }
  }
  sessionTimer = () => {
    this.setState({ status: false })
    clearInterval(this.timer)
    this.setState({ seconds: 60, maintimer: this.state.maintimer + 1, minutes: this.state.maintimer + 1 })
  }
  breakTimer = () => {
    this.setState({ status: false })
    clearInterval(this.timer)
    clearInterval(this.breaktimer)
    this.setState({ seconds: 60, breakTimerValue: this.state.breakTimerValue + 1 })
    this.setState({ breakMin: this.state.breakTimerValue + 1 })
  }



  reset = () => {
    this.setState({ status: false })
    clearInterval(this.timer)
    clearInterval(this.breaktimer)
    this.setState({
      maintimer: 25,
      breakTimerValue: 5,
      minutes: 25,
      seconds: 60,
      status: false,
      breakSec: 60,
      breakMin: 5,
      timershiftStatus: true
    })
  }
  render() {
    return (

      <div className="App">
        <h1 id="heading">Pomodoro Timer</h1>
        <audio id="danger" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" />
        <div className='main'>
          <div className="clockButtons">
            <button className="button3" onClick={this.start}> Start</button>
            <button className="button3" onClick={this.stopTimer}> Stop</button>
          </div>
          <div className="clockTimer">
            <div id="clock">
              <div id="interior">
                <lablel> Timer </lablel>
              </div>
              <div id="interior">
                <p className="mainClock">  {this.state.minutes} : {this.state.seconds === 60 || this.state.seconds < 10 ? "0" + (this.state.seconds) % 60 : this.state.seconds}</p>
              </div>
            </div>
            <div id="breakClock" style={{ display: 'none' }}>
              <lablel> Break Time </lablel>
              <p className="breakClock">{this.state.breakMin} : {this.state.breakSec === 60 || this.state.breakSec < 10 ? "0" + (this.state.breakSec) % 60 : this.state.breakSec}</p>
            </div>
            <div id="session">
              <lablel> Session </lablel>
              <p>{this.state.maintimer}</p>
            </div>
            <div id="break">
              <lablel> Break Time </lablel>
              <p>{this.state.breakTimerValue}</p>
            </div>
          </div>
          <div className="clockContent">
            <button id="button1" onClick={this.sessionTimer}> Session Timer</button>
            <button id="button1" onClick={this.breakTimer}> Break Timer</button>
            <button id="button2" onClick={this.reset}> Reset</button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSecond: 0,
  timeElapsedInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  onDecrementMinutes = () => {
    const {timeElapsedInMinutes} = this.state
    if (timeElapsedInMinutes > 1) {
      this.setState(prevState => ({
        timeElapsedInMinutes: prevState.timeElapsedInMinutes - 1,
      }))
    }
  }

  onIncrementMinutes = () => {
    this.setState(prevState => ({
      timeElapsedInMinutes: prevState.timeElapsedInMinutes + 1,
    }))
  }

  renderTimeLimitController = () => {
    const {timeElapsedInMinutes, timeElapsedInSecond} = this.state
    const isButtonDisabled = timeElapsedInSecond > 0
    return (
      <div className="time-limit-controller-cont">
        <p className="limit-label">Set Timer Limit</p>
        <div className="time-limit-control">
          <button
            className="button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecrementMinutes}
          >
            -
          </button>
          <div className="limit-label-and-value-cont">
            <p className="limit-value">{timeElapsedInMinutes}</p>
          </div>
          <button
            className="button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncrementMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getElapsedSecondsAndTimeFormat = () => {
    const {timeElapsedInMinutes, timeElapsedInSecond} = this.state
    const totalRemainingSeconds =
      timeElapsedInMinutes * 60 - timeElapsedInSecond
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    // console.log(minutes)
    // console.log(seconds)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInMinutes, timeElapsedInSecond} = this.state
    const isTimerCompleted = timeElapsedInSecond === timeElapsedInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSecond: prevState.timeElapsedInSecond + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInMinutes,
      timeElapsedInSecond,
    } = this.state
    const isTimerCompleted = timeElapsedInSecond === timeElapsedInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSecond: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onRestartTime = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderTimeController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseLabel = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="time-control-container">
        <button
          className="start-or-pause-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseLabel}
            className="start-or-pause-and-restart-img"
          />
          <p className="start-or-pause-and-restart-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="restart-btn"
          type="button"
          onClick={this.onRestartTime}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="start-or-pause-and-restart-img"
            alt="reset icon"
          />
          <p className="start-or-pause-and-restart-label">Restart</p>
        </button>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-cont">
          <div className="timer-display-container">
            <div className="elapsed-timer-cont">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsAndTimeFormat()}
              </h1>
              <p className="label">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimeController()}
            {this.renderTimeLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

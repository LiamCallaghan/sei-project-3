import React from 'react'
import axios from 'axios'

import Header from '../common/Header'
import Map from '../map/Map'



class QuestShow extends React.Component {
  state = {
    screen: 'map',
    route: null,
    currentStop: 0,
    answer: ''
  }

  componentDidMount = async () => {
    const response = await axios.get(`/api/quests/${this.props.match.params.id}`)
    this.setState({ route: response.data })
  }


  handleClick = event => {
    this.setState({
      screen: event.target.value
    })
  }

  changeAnswer = event => {
    this.setState({ answer: event.target.value })
  }

  nextStop = () => {

    const { currentStop, route, answer } = this.state

    if (answer.toLowerCase() === route.stops[currentStop].question.answer.toLowerCase()) {
      const currentStop = this.state.currentStop + 1
      this.setState({ currentStop })
    }
  }

  render() {
    const { screen, route, currentStop, answer } = this.state
    const stop = route ? route.stops[currentStop] : null
    return (
      <>
        <Header />
        <div className="show-quests">
          <div className="top-show-buttons">
            <button value="map" onClick={this.handleClick} type="button" className={`tab ${screen === 'map' ? '' : 'inactive'}`} >MAP</button>
            <button value="clue" onClick={this.handleClick} type="button" className={`tab ${screen === 'clue' ? '' : 'inactive'}`} >CLUE</button>
            <button value="comments" onClick={this.handleClick} type="button" className={`tab ${screen === 'comments' ? '' : 'inactive'}`} >COMMENTS</button>
          </div>
          <div className="quest-view">
            {screen === 'clue' &&
              <div className="clues">
                <h2>Quest</h2>
                <p>Your next location is:</p>
                {stop !== null &&
                <p>{stop.question.clue}</p>
                }
                <div className="answer-input">
                  <input
                    type="text"
                    name="answer"
                    value={answer}
                    placeholder="answer"
                    onChange={this.changeAnswer}
                  />
                </div>
                <div className="btn-next">
                  <button onClick={this.nextStop}>{currentStop === 0 ? 'START' : 'NEXT'}</button>
                </div>
              </div>
            }
            {screen === 'map' &&
              <div className="show-map">
                <Map selectedQuest={this.state.route} getBounds={() => null} />
              </div>
            }
            {screen === 'comments' && 
            <div className="comments">
              <h1>Comments</h1>
              <p>Other users comments</p>
            </div>
            }
          </div>
        </div>
      </>
    )
  }
}
export default QuestShow
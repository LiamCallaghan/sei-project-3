import React from 'react'

import QuestForm from './QuestForm'
import StopForm from './StopForm'
import StopList from './StopList'
import Map from '../map/Map'
import BgMap from '../map/BgMap'
import { createQuest, reverseGeoCode } from '../../lib/api'

class QuestCreate extends React.Component{

  state = {
    questFormData: {
      name: '',
      description: '',
      location: '',
      estTime: '',
      theme: 'theme',
      timer: false
    },
    stopFormData: {
      name: '',
      clue: '',
      answerType: 'Answer',
      answer: '',
      hint: '',
      location: {
        latitude: '',
        longitude: ''
      }
    },
    stops: [],
    stopToEdit: 0,
    flyTo: null,
    tabShow: 'info',
    geocoderValue: null,
    geocoderKey: 0
  }

  themes = ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed']
  
  bgLatLng = [
    (Math.random() * 180) - 90,
    (Math.random() * 360) - 180
  ]

  refreshGeocoder = () => {
    const geocoderKey = (this.state.geocoderKey + 1) % 2
    this.setState({ geocoderKey })
  }

  handleQuestFormChange = event => {
    console.log(event.target.type)
    const type = event.target.type
    const questFormData = {
      ...this.state.questFormData,
      [event.target.name]: type === 'checkbox' ? event.target.checked : event.target.value
    }
    this.setState({ questFormData })
  }

  handleStopFormChange = event => {
    const stopFormData = {
      ...this.state.stopFormData,
      [event.target.id]: event.target.value
    }
    this.setState({ stopFormData })
  }

  handleQuestSubmit = async (event) => {
    event.preventDefault()
    try {
      const location = this.state.stops[0].location
      const newQuestData = { ...this.state.questFormData, stops: [ ...this.state.stops ], location: location }
      console.log(newQuestData)
      const response = await createQuest(newQuestData)
      if (response.status === 201) this.props.history.push(`/quests/${response.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  submitStop = () => {
    const stops = [ ...this.state.stops ]
    const newStop = { ...this.state.stopFormData }

    // New Stop
    if (this.state.stopToEdit === this.state.stops.length) stops.push(newStop)
    // Edit stop
    else stops[this.state.stopToEdit] = newStop
    this.setState({ stops })

    this.selectTab({ target: { value: 'stops' } })
  }

  // Fires on picking a result from the geocoder suggestions
  selectLocation = (location, { place_name: geocoderValue }) => {
    const { latitude, longitude } = location
    const flyTo = { latitude, longitude }
    const stopFormData = { ...this.state.stopFormData, location: flyTo }
    this.setState({ flyTo, stopFormData, geocoderValue }, () => this.setState({ flyTo: null }))
  }

  selectTab = (event) => {
    const stopToEdit = event.target.stopNum || event.target.stopNum === 0 ? event.target.stopNum : this.state.stops.length
    const tabShow = event.target.value
    const stopFormData = event.target.stopNum || event.target.stopNum === 0
      ? { ...this.state.stops[event.target.stopNum] }
      : {
        name: '',
        clue: '',
        answerType: 'Answer',
        answer: '',
        hint: '',
        location: { latitude: '', longitude: '' }
      }
    this.setState({ tabShow, stopFormData, stopToEdit })

    const location = stopFormData.location
    if (location.latitude) this.pickLocationFromMap(location)
  }

  pickLocationFromMap = async (location) => {
    const geoData = await reverseGeoCode(location)
    if (!geoData.data.features[0]) return
    const geocoderValue = geoData.data.features[0].place_name
    const stopFormData = { ...this.state.stopFormData, location }
    this.setState({ stopFormData, geocoderValue })
    this.refreshGeocoder()
  }

  render() {

    const { questFormData, stopFormData, stops, flyTo, tabShow, geocoderValue, geocoderKey } = this.state

    const tabStyles = {
      info: { display: tabShow === 'info' ? 'block' : 'none' },
      stops: { display: tabShow === 'stops' && stops.length > 0 ? 'block' : 'none' },
      addStop: { display: tabShow === 'addStop' || (tabShow === 'stops' && stops.length === 0) ? 'block' : 'none' }
    }

    const stopFormProps = {
      stopFormData,
      geocoderValue,
      handleChange: this.handleStopFormChange,
      submitStop: this.submitStop,
      selectLocation: this.selectLocation,
      selectTab: this.selectTab,
      geocoderKey
    }

    const questFormProps = {
      questFormData: questFormData,
      handleQuestFormChange: this.handleQuestFormChange,
      handleQuestSubmit: this.handleQuestSubmit,
      themes: this.themes
    }

    return (
      <div className="create-quest">
        <BgMap latLng={this.bgLatLng} />
        <h3>Create a New Quest</h3>
        <div className="create-container">
          <div className="create-info">
            <div className="show-tabs">
              <button value={'info'} onClick={this.selectTab} className={`tab ${tabShow === 'info' ? '' : 'inactive'}`} >INFO</button>
              <button value={'stops'} onClick={this.selectTab} className={`tab ${tabShow === 'stops' || tabShow === 'addStop' ? '' : 'inactive'}`} >STOPS</button>
            </div>
            {/* Info tab */}
            <div className="create-tab" style={tabStyles.info}>
              <QuestForm {...questFormProps} />
            </div>
            {/* New Stop Form */}
            <div className="create-tab" style={tabStyles.addStop}>
              <StopForm {...stopFormProps} />
            </div>
            {/* Stop List */}
            <div className="create-tab" style={tabStyles.stops}>
              <StopList stops={stops} changeTab={this.selectTab} />
            </div>
          </div>
          <div className="create-map">
            <Map flyTo={flyTo} getLocation={this.pickLocationFromMap} />
          </div>
        </div>
      </div>
    )
  }
}

export default QuestCreate
import React from '/Users/liamcallaghan/Development/sei-project-3/frontend/node_modules/react'
import { BrowserRouter, Switch, Route } from '/Users/liamcallaghan/Development/sei-project-3/frontend/node_modules/react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Register from './components/common/Register'
import Login from './components/common/Login'
import QuestIndex from './components/quest/QuestIndex'
import QuestShow from './components/quest/QuestShow'
import QuestCreate from './components/quest/QuestCreate'
import QuestEdit from './components/quest/QuestEdit'
import ProfileShow from './components/user/ProfileShow'
import ProfileIndex from './components/user/ProfileIndex'
import UserProfile from './components/user/UserProfile'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quests/edit/:id" component={QuestEdit} />
        <Route path="/quests/:id" component={QuestShow} />
        <Route path="/quests" component={QuestIndex} />
        <Route path='/create' component={QuestCreate} />
        <Route path="/users/:id" component={ProfileShow} />  
        <Route path="/users" component={ProfileIndex} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={UserProfile} />
      </Switch>
      {/* Footer */}
    </BrowserRouter>
  )
}

export default App

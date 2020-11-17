# PopQuest

A React app with Mongo.db on the backend to build and share quests (tours) of different cities.

## Deployed Link

**coming soon**

## Technologies used

- Mongo.db
- React.js
- JavaScript
- Trello
- Axios
- proxy-middleware
- NPM
- JSON Webtoken
- Bcrypt
- Express
- Cloudinary
- Mapbox
- SASS
- JSX
- Git
- Faker
- Bootstrap
- react-router-dom

## Process

Planning for this project was very intensive. We used Trello to collect all of our plans and ideas into one space where we could check with the group and decide who would be doing what. For the first part of this project we decided on splitting into two teams, one working on the frontend and one on the backend. I was one of the backend people. We decided that for our MVP we would need users that can login, build and search for quests, and view the quests on a map. Wireframing out what each page would look like and what our user stories were going to be was really helpful for planning what features we needed and which would be nice to have.

Building the schema models and deciding which would fit in as model objects was achieved mostly through pair coding. We built the controllers next, starting with the quest controllers needed by the frontend team. Turning our focus to the users, we built the controllers and then started adding authentification, although we wouldnt activate needing to be authorized until much later to help speed up development. This was the point when we decided what information we would use to register users, and what we would show them on the profile page. Making the Router file allowed us to access and update our database, and with that we working we could move onto the information that would be stored inside.

Adding in the error handling was mostly a gradual process but we fixed everything we had missed out towards the end. We manually added some data in with insomnia to check that everything was working fully and this was added to a seed file.

After completing the basic backend we moved on to help the frontend team. A lot of the setup had already been done for the react app, including most of the mapbox implimentation, login and register pages, and the quest index page. One thing I focused on building was the profile index and show pages.

Adding in some more seed data was needed so we could test the quests and stops all worked correctly. We eventually would use faker to generate the quests and users but at first it was all manually added into the seeds file. After adding some more quests of different types, I moved back to sorting the profiles and styling the profile page.

One of the last features we worked on was the reviews for quests, we had the functionality early on but didnt add it to any of the pages until the end. Populating them with the text, review number and user who left it, and then styling these in a satisfying way.

## Challenges and Extra Features

An early issue we had was with merge issues. While we were trying to set things up and add packages like react-router-dom, we would mess up the order of installing them on our individual machines and pushing our changes to github. We solved this by using slack to let the other members of our team know when we had installed something, so they could pull down the changes and do a general install each time. 
Trying to use the Array.sort method on the profile index page came with a lot of unforseen issues. It took a lot of reading up on the method and asking people in the group before I got to the functionality I had been looking for. Another big issue was coming onto the frontend after another team had been building it out for a while. Matching other peoples code style was difficult, and there are some parts of the code I still dont fully understand and couldnt manipulate if needed without possibly breaking things.

An extra feature I didnt have time to add was more robust sorting for the users page. The ability to sort by highest reviewed quest or most quests would have been nice.

## Wins and Key Learnings

Backend framework and building out the profile stuff.
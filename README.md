# List-Maker

I was tasked with creating a shared, real-time grocery list app over a span of seven days as the culmination of my Web Development certification with [Bloc](http://www.bloc.io). The project was fairly open-ended, but there were minimum requirements:

```
App functionality:

1. Save, Update, and Delete items to/from a database of your choosing.
2. Authenticate users - allowing the same user to be signed in from multiple devices.
3. Allow add, edit, delete, “mark as purchased”, and “unmark as purchased” on each item.
4. Keep the list synced in real time from each device.
5. Accompany your code with a full test suite.
6. Deploy your site to a web host (e.g., on Amazon EC2, Heroku, Netlify, Google AppEngine, etc.).

Technical Requirements

The architecture must be split between a back-end and a web front-end, for instance, providing an in/out RESTful API in JSON. Feel free to use any other technologies, provided that the general client/service architecture is respected.
```

This List-Maker app is a solo, full-stack web development project, built on React and Node, using Sequelize, PostgreSQL, and Jasmine for testing. Deployed on Heroku, it is built with responsive flex-box and custom HTML & CSS including custom buttons and checkboxes. More information on the technology below.

Live site: https://lauren4c-list-maker.herokuapp.com/

---

### v1.0 Features include:

-User log-in and authentication via Express and Passport. User passwords are hashed and saved in a PostgreSQL database.  
-Users can then create multiple lists, and also rename and delete them.  
-Items can be added to each list, marked-as-completed, renamed, and deleted.  
-All of this is done in real-time via a recursive `setTimeout()` Axios call to the server, once every 1.5 seconds to mimic real-time updates. While this process works fine for this project, it is not a feasible way to do it if the app were to scale. Given more time, I would like to set the app up with `Sockets.io` for the real-time functions.

### Upcoming Features:

Check out the [live project board](https://trello.com/b/6tXWNv5w/synced-shopping-list).  
The 7-day timeline limited the time and features I was able to put into this app. Given more time, I would like to do the following:

-Implement `Sockets.io` for real-time data updates to allow app to scale easily.  
-Allowing users to create groups for shared lists. Currently, to see the same lists, a user has to share their log-in information, which may not be feasible or comfortable for all users. By adding "groups", users could share the lists with their friends and family and each person would have their own log-in info, and still have access to the shared lists. This would also keep the Express-sessions cleaner.  
-Allow users to set a max budget for each item. I created the 'item' model with this feature in mind, so it would be a fairly-easy feature to implement.

---

### Local Configuration:

Want to run this project locally or us it as a jumping-off point for your next project? Open up terminal, and let's get going!
(This assumes you have [Node/NPM](http://www.nodejs.org) and [React](https://reactjs.org) already installed on your system.)

1. Run `git clone https://github.com/lauren4c/list-maker` to download the project.

2. `cd` into the root directory `list-maker`.

3. Run `npm install` to install the server-side dependancies. Then `cd client` and run `npm install` a second time to install the client-side dependencies.

4. Head back to the root directory `cd ..` and set up the database: `sequelize db:create list-maker` and `sequelize db:create list-maker-test` followed by `sequelize db:migrate`

5. This project uses `express-session`, so let's get that set up locally, too. Enter `touch .env` while in the root directory, then add `cookieSecret=" <enter a string of your choice here> "` to the `.env` file.

6. Finally, in the root directory run `npm run dev` to start the client and back-end side servers. It should open up the site in your browser automatically, but you can always go to http://localhost:3000 manually.

##### Happy Hacking!

---

### Technologies Used

#### React.JS

During the last 7+ months at Bloc, I have used React in 4 projects, as well as using it in my [portfolio website](https://www.laurenforcey.com). While I have a good grasp on the basics, each project has allowed me to dive deeper into React and continue learning the framework. In this project, I used `React Context` to hold the state of the 'user_id' so that it was accessible anywhere in the app.  
-Given more time, I would like to separate out some of the components more. The `lists.js` component is quite large and would be easier to understand and update if I were to move the `items` parts into its own component.  
-I was unable to include front-end testing for this project due to both time-constraints and my lack of knowledge of `Jest`. I will be taking the time in the coming weeks to read about `Jest` and work on adding front-end testing to this app.  
-For the API calls, I used `Axios`, which is a very straight-forward Promise-based HTTP client to make calls to the server-side of the project. I also used `Axios` in my [capstone project](https://github.com/lauren4c/sumco-animal-shelter).  
-OF NOTE: The README file in the `client` folder is React's standard file. I left it as-is for future reference if options and scripts.

#### Node.js

The Node framework has been the centerpiece of the last half of the Bloc curriculum. While initially I found it cumbersome, I now find the server-side coding to be more straight forward than the front-end. For this project, I utilized the `Sequelize` ORM to work with the `PostgreSQL` database, which allows for me to write JavaScript throughout the app.  
-I used `Jasmine` for testing, and have `unit` and `integration` tests for all of the database models, that all pass with zero failures, however, there seem to be some exceptions thrown in the logs, so if I had more time, I would dig into that more. Functionally, everything in the app works as it should and I was not able to find an errors, so I must have an error in my test.  
-For logging-in users, I used `Express-sessions` and `Passport` using a `Local` strategy. I initially considered using `Auth0` for authentication and authorization, but ultimately decided that having all of the user information locally was a better fit for this app because it made it easier to develop, when having access to the `user_id` (and, in the future, tagging users in groups).

# :bar_chart: PollApp
A web application to create polls implemented using webpack module federation. This is a monorepo contains multiple micro frontends.

## Authentication
This is the home page of the app. To see more details click [here](authentication)

Hosted URL - [link](https://pollapp-auth.netlify.app/)
## Poll
Poll app take care of the polling part, where there will be 2 types of user (host/joinee). To see more details click [here](poll)

Hosted URL - [link](https://pollapp-poll.netlify.app/)
## Profile
Profile is where user can create/edit  polls and questions. To see more detail click [here](profile)

Hosted URL - [link](https://pollapp-profile.netlify.app/)
## Utils
This will serve some of the common things to the other microfrontends. To see more details click [here](utils)

Hosted URL - [link](https://pollapp-utils.netlify.app/)
## :tada: Shell
Shell will hold together all other apps. To see more details click [here](shell)

Hosted URL - [link](https://pollapp-shell.netlify.app/)

### :pushpin: Libraries

- :mega: **ReactJS**,**ReactDOM**
- :mega: **Antd**, **styled-components** - Component library and styling
- :mega: **react-router-dom** - For handling routes
- :mega: **react-google-login** - For google authentication
- :mega: **recoil** - State management
- :mega: **axios** - HTTP client
- :mega: **@uiw/react-md-editor** - Markdown editor
- :mega: **chart.js**,**react-chartjs-2** - For charts
- :mega: **socket.io-client** - Handling socket

# :pager: Server
To handle backend, a node based server is implemented. To see more details click [here](server)

### :pushpin: Libraries

- :mega: **ExpressJS** - Handling HTTP requests
- :mega: **google-auth-library** - To get user details from user bearer token
- :mega: **redis**
- :mega: **pg**
- :mega: **sequelize**
- :mega: **socket.io**
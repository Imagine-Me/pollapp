# :bar_chart: PollApp
A web application to create polls implemented using webpack module federation. This is a monorepo contains multiple micro frontends.

## :hammer: Development
#### Frontend
1. Installing packages
   Install all the dependecies in each of the microfrontends. In folders `authentication`,`poll`,`profile`,`utils` and `shell`
   ```sh
    yarn install
   ```
2. Running
   Same as above, in all the folders, run following command
   ```sh
   yarn dev
   ```
   When running this command in `shell` folder, it will automatically open up browser else visit [here](http://localhost:3001)

#### Backend
To run backed
```sh
cd server
docker-compose -f docker-compose.dev.yml up
```
> On first time run, the migration and seeding will not be running since no database is created. So run again the same command. Sometime sequelize won't create database, in that case, manually create a database with whatever name you given in `.env` file. Follow these:
> ```sh
> docker ps
> ```
> This will list all the containers, from these copy the id of postgres, then
> ```sh
> docker exec -it <POSTGRES_CONTAINER_ID> sh
> ```
> This will connect to postgres container and open up `sh`. 
> ```sh
> psql -U <USER>
> ```
> This will connect to psql CLI. Run the following to create database
> ```sh
> CREATE DATABASE <DATABASE NAME>
> ```



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
- :mega: **redis** - To store poll details
- :mega: **pg** - Database
- :mega: **sequelize** - An ORM to query with Database
- :mega: **socket.io** - For real-time connection with client
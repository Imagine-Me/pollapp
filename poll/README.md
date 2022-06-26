# Poll
Poll contains two things, one is for `host` where user can't poll but will have the extra options such controlling questions and seeing the current poll stat. The second user is `joinee` which joined using link, this user does not require authentication and can poll. After polling the status will be displayed.

## :hammer: Development
### Creating .env file
Create a `.env` file in folder `poll`. Copy everything from `.env.sample` and refactor if required
### Installing packages
```sh
yarn install
```
### Development
```sh
yarn dev
```
> `poll` is depend on `utils` and `profile`
### Building
```sh
yarn build
```
# Authentication
This is the starting page of the app, where user will authenticate using gmail. `react-google-login` is used for the google signin. The user details is stored in session storage.
## :hammer: Development

### Creating .env file
Create a `.env` file in the folder `authentication`. Copy and refactor everything from `.env.sample`.
###  Install packages
Run following in the `authentication` folder.
```sh
yarn install
``` 
### Development
```sh
yarn dev
```
> `utils` microfrontend is required in authentication.
### Building
```sh
yarn build
```
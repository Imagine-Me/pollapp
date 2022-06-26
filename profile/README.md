# Profile
`profile` is where an authenticated user can create/edit/delete polls and questions. User can edit the questions using `markdown`. From polls section user can create a poll which will then handled by `poll` microfrontend.
## :hammer: Development
### Creating .env
Create a `.env` file in folder `profile`. Copy everything from `.env.sample` and refactor if required
### Installing packages
```sh
yarn install
```
### Development
```sh
yarn dev
```
> `profile` is depend on `utils` and `authentication`
### Building
```sh
yarn build
```
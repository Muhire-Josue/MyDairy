# MyDairy
MyDiary is an online journal where users can pen down their thoughts and feelings.  


### Links
##### gh-pages:  https://muhire-josue.github.io/MyDairy/UI/index.html
##### heroku:  https://mydiary-api-host.herokuapp.com

### Requirements
- `Nodejs` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `NPM` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development

### SETUP
First clone it to your machine: 

```
https://github.com/Muhire-Josue/MyDairy.git
```

Open it using your favorite IDE,
I used ([vs code](https://code.visualstudio.com/download))

Install all necessary node modules
```
npm install
```
To start the app
```
npm start
```
To run tests
```
npm test
```
### API ENDPOINTS
| API | Methods  | Description  |
| ------- | --- | --- |
| `/api/v1/auth/` | GET | Welcome message |
| `/api/v1/auth/signup` | POST | Create account |
| `/api/v1/auth/signin` | POST | Login |
| `/api/v1/entries` | POST | Add diary entry |
| `/api/v1/entries` | GET | Get all diary entries |
| `/api/v1/entries/:entryId` | GET | Get a diary entry |
| `/api/v1/entries/:entryId` | PATCH | Modify a diary entry |
| `/api/v1/entries/:entryId` | DELETE | Delete a diary entry |
### How can it be manually tested
- using [postman](https://www.getpostman.com/downloads/)
### Pivotal tracker stories
- Follow this [Link](https://www.pivotaltracker.com/n/projects/2400380)


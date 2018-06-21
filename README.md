# `User test application`

### About the project

This project is a test web app created by Olha Yehorova.
Project contains 2 pages: login and user list.
User list page is available only for authorized users.
Test credentials: <br>
email: test@test.com / password: test_test


### Install Dependencies

`npm` is preconfigured to automatically run `bower` so simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. 


### Run the Application

To start preconfigured local development server run command:

```
npm start
```

Now browse to the app at [`localhost:8000`].


### Project technical information

Project is built with AngularJS v.1.5.11 <br>
Time spent on development: 13 hours

#### Initial development requirements

Create a Web API that includes 2 pages: login and user list.<br>
Login page should be accessible without authorization and in case of a logout, the user should be redirected to the login page.<br>
The User List page should only be available to authorized users. Also, the user on this page should be able to create and delete users.<br>
After login general information about the logged-in user has to be shown (name and e-mail). <br>
JWT token is used for authorization. <br>
Any development tools and technology can be used for implementation. Design by the choice of the developer.<br>
Time given to complete the task: 2 days

ByteBud is a web application inspired by Discord that allows users to create servers where they can interact in real time with other users in their communities. This project aims to replicate Discord's ease of use and the ability to share content with other ByteBud clients running at the same time instantaneously through the use of WebSockets. ByteBud is built with a Python/Flask backend and a React/Redux frontend for responsiveness.

[Click here to view ByteBud's Live Site](https://bytebud.onrender.com/)


![Screenshot 2024-03-07 at 9 27 46 PM](https://github.com/raymondlang/bytebud/assets/16345938/b7a13d61-8603-42f4-ab2b-7d4896b506d5)



landing

## Navigate to:
User Stories
Feature List
Database Schema
Backend Routes

## Technologies/Frameworks Used:

### Frontend:
![JavaScript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-676E77?style=for-the-badge&logo=react&logoColor=#61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend:
![Python](https://img.shields.io/badge/Python-4081B3?style=for-the-badge&logo=python&logoColor=ffe66a)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-D71F00?style=for-the-badge)
![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)

### Deployment:
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Features:

## Demo User Implementation:
* Feel free to test the site features through clicking the "Demo User" button which will directly log you in
* There are exactly TWO different guest logins built for users looking to test the real-time messaging capabilities of ByteBud
demo-user

## Sign up a User:
* You will be able to sign up and automatically be redirected to the logged in page
* There are validations for signing up such as username length requirements, valid email address, password length, etc
* Passwords must be matching when entered twice or the signup button will be disabled
* Friendly reminders will display and signup will be blocked if fields are not properly filled out
  
  ![sign-up](https://media.giphy.com/media/Gnf2W0BBWrSZgtqANK/giphy.gif)

## User Login and Authentication:

* You are able to login as long as your credentials are stored within the database (hashed)
* If there are no matching credentials an error message is displayed
* Login button is disabled if there are null fields or if the amount of characters entered is not within the acceptable range

login-demo

## Live Messaging Between ByteBud Clients:

* You are able to send messages to other ByteBud clients as long as they are within the same server and channel
* You must be logged in to use the live messaging feature
  
  ![live-messaging](https://media.giphy.com/media/0VPXakwUdzgKOQ9bkR/giphy.gif)
  



## Create a Server
* Users are able to create a server and add their friends to a server

![create-server](https://media.giphy.com/media/oR2UhQwcwKOUZW26nD/giphy.gif)

## Create a Channel
* Create a channel for your friends by topic or interest
* 
![bytebud create channel](https://github.com/raymondlang/bytebud/assets/16345938/ba7e7c9f-4231-48e2-a044-bbe31b700142)


## React to Messages with Emojis

* Users are able to react to messages with emojis
* Users can see each other's reactions

![reactions](https://media.giphy.com/media/0VPXakwUdzgKOQ9bkR/giphy.gif)

## Features Coming Soon:

* AWS for File Uploads
* Updating User Profile Pictures
* Adding Members to a Server
* Live Friend DMs 

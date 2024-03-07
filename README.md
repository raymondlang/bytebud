ByteBud is a web application inspired by Discord that allows users to create servers where they can interact in real time with other users in their communities. This project aims to replicate Discord's ease of use and the ability to share content with other ByteBud clients running at the same time instantaneously through the use of WebSockets. ByteBud is built with a Python/Flask backend and a React/Redux frontend for responsiveness.

Click here to view ByteBud's Live Site

landing

Navigate to:
User Stories
Feature List
Database Schema
Backend Routes

Technologies/Frameworks Used:

Frontend:

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://camo.githubusercontent.com/ce057acbaad5aa84ec90b07accdfa0a8bf8d3b317c54ef2bb4f6481f6e7d7dde/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d3637364537373f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d23363144414642)
![Redux](https://camo.githubusercontent.com/7997545192468d67af275317b4210fac4996c660cf00a331fd947e4a93eec57f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d3736344142433f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465)
![HTML5](https://camo.githubusercontent.com/bfe6a48836e87b13a16f1f56f88fee428475c2ac29247992ec9b8bcc7154f881/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465)
![CSS3](https://camo.githubusercontent.com/472c222e8f240a48ae51cd9b082a1b857be809dcd851a25150890c2da50c13a5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f435353332d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465)

Backend:

![Python](	https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://camo.githubusercontent.com/a07a8d56a46617a2281448edd7c3b1bcb9cb264b74ab4600c194c29977fd1352/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f466c61736b2d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d666c61736b266c6f676f436f6c6f723d7768697465)
![SQLAlchemy](https://camo.githubusercontent.com/3a44b6270a014a9b236ca1f8aba4f50d38bbf6ec0f9e4da2bef8713dcadd0a5b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d53514c416c6368656d792d4437314630303f7374796c653d666f722d7468652d6261646765)
![PostgreSQL](https://camo.githubusercontent.com/4805e53bb11de9f02eaebb836a95679aa8d0ac0da0443f6081d12ee8209c36b0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f7374677265732d3431363945313f7374796c653d666f722d7468652d6261646765266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465)
![Socket.IO](https://camo.githubusercontent.com/5a42080048cfc58abad5fc9b016d30502cd5f603a5b6f7f72dba983c27778ea8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f536f636b65742e494f2d3031303130313f7374796c653d666f722d7468652d6261646765266c6f676f3d736f636b65742e696f266c6f676f436f6c6f723d7768697465)

Deployment:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

Features:
Demo User Implementation:
Feel free to test the site features through clicking the "Demo User" button which will directly log you in
There are exactly TWO different guest logins built for users looking to test the real-time messaging capabilities of ByteBud
demo-user

Sign up a User:
You will be able to sign up and automatically be redirected to the logged in page
There are validations for signing up such as username length requirements, valid email address, password length, etc
Passwords must be matching when entered twice or the signup button will be disabled
Friendly reminders will display and signup will be blocked if fields are not properly filled out

<center>
  ![sign-up](https://media.giphy.com/media/Gnf2W0BBWrSZgtqANK/giphy.gif)
</center>


User Login and Authentication:
You are able to login as long as your credentials are stored within the database (hashed)
If there are no matching credentials an error message is displayed
Login button is disabled if there are null fields or if the amount of characters entered is not within the acceptable range
login-demo

Live Messaging Between ByteBud Clients:
You are able to send messages to other ByteBud clients as long as they are within the same server and channel
You must be logged in to use the live messaging feature

<center>![live-messaging](https://media.giphy.com/media/0VPXakwUdzgKOQ9bkR/giphy.gif)</center>


Create a Server
Users are able to create a server and add their friends to a server
![create-server](https://media.giphy.com/media/oR2UhQwcwKOUZW26nD/giphy.gif)

Create a Channel
Create a channel for your friends by topic or interest
![create-channel](https://media.giphy.com/media/ZxOzkg2hfgamWG39J5/giphy.gif)

React to Messages with Emojis
Users are able to react to messages with emojis
Users can see each other's reactions
![reactions](https://media.giphy.com/media/0VPXakwUdzgKOQ9bkR/giphy.gif)

Features Coming Soon:
AWS for File Uploads
Updating User Profile Pictures
Adding Members to a Server
Live Friend DMs

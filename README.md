# CheckMate ♟️

CheckMate is a real-time online chess platform built with React, Node.js and Socket.IO.

The idea was to create a chess game where two players can join a room and play against each other in real time. This project was built as part of my Hack Club journey and also helped me learn more about React, game logic and WebSockets.

## Working

First a player generates a room code from the top section. After the room code is generated, another player can enter the code using the join room option and start playing.

The game is synchronized between both players in real time. The movement history of chess pieces is shown in the right side of the board. Below the board there is options like Resign and Offer Draw.

## Features
1, Real-time multiplayer chess
2, Create and join rooms
3, Chess move validation
4, Move history
5, Responsive UI
6, Room management with Socket.IO

## Tech Stack
* React
* Tailwind CSS
* Node.js
* Express.js
* Socket.IO
* chess.js

## Running Locally
npm install
npm run dev

## AI Usage

I used AI tools occasionally when I got stuck on bugs or wanted help understanding some errors. Most of the project structure, integration, testing, debugging and final implementation was done by me. AI was mainly used for troubleshooting and learning during development.

## What I Learned

This was my first bigger full stack project. I learned how real-time communication works using Socket.IO, how to manage game state, and how different parts of a project connects together. It also gave me a better understanding about project structure and debugging.

## About Deployment

I deployed the frontend using Vercel and the backend using Render. This setup allows players to connect from different devices and see moves reflected on both boards in real time.

## Future Improvements

For the next version, I plan to add MongoDB for storing users and match history, along with JWT authentication for login and signup. I think these features will make the project more complete and improve the overall experience. It is already planned for the next update of this project.
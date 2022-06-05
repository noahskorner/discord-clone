# Discord Clone

Built with NextJS, Typescript, TailwindCSS, ExpressJS, Postgres, Socket.IO, and WebRTC

[Check it out here!](https://discord-clone-server-0.herokuapp.com/)

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.

`cd discord-clone`

Install Dependencies:

`npm install`

Create the .env file in the root directory, checkout [.env.example](/.env.example) for an example:

`touch .env.local`

To Start Server:

`npm run dev`

To Visit App:

`localhost:3000`

## Things I wish I would've done differently

- friend/friend_request to user_relationship
- created request/response objects
  - throw vs return
- organization of files (interfaces, dtos, etc.)
- naming of direct_message vs message
  - message_group?
- completed testing suite
- my janky error handling

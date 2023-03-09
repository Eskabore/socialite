# SocialNetwork


[Features](#features)

[Tech & Librairies](#technologies-used)

[Usage](#getting-started)

[Credits](#credits)

[License](#license)

## Description
SocialNetwork is a full-stack social media platform built with Node.js, Express, and React.
This platform allows users to create an account, customize their profile, and interact with other users through a variety of features, 
such as creating and commenting on posts, adding friends, and sending messages.

## Features
- User authentication and authorization using JSON Web Tokens (JWT)
- User registration and login
- Customizable user profiles with profile pictures and background images
- Create, edit, and delete posts
- Comment on posts
- Like and dislike posts
- Follow and unfollow other users
- Direct messaging between users
- Search for other users and posts
- Real-time updates with Socket.IO
- Mobile-responsive design

## Technologies Used
- **Node.js** and **Express.js**: For the backend server and routing.
- **PostgreSQL**: For the database management system.
- **Socket.io**: For the real-time web socket communication.
- **AWS S3**: For storing the user-uploaded images.
- **Handlebars**: For the dynamic templating of the views.
- **CSS3** and **Bootstrap**: For the styling and layout of the website.
- **Redux**: For state management
- **Render**: For deploying the website.

## Getting Started
To run the SocialNetwork project on your local machine, follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/Eskabore/socialnetwork.git
```

2. Install the dependencies:

```bash
cd socialnetwork
npm install
```

3. Set up a PostgreSQL database:

```
createdb socialnetwork
```

4. Create a `.env` file in the root of the project and add the following environment variables:

```makefile
DATABASE_URL=postgres://localhost:5432/socialnetwork
JWT_SECRET=your-jwt-secret
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_BUCKET_NAME=your-aws-bucket-name
```

5. Start the server:

```
npm start
```

## Credits
This project was created by [Jean-Luc KABORE-TURQUIN](https://www.linkedin.com/in/jlkabore-turquin/) 
as part of the curriculum at [SPICED Academy](https://www.spiced-academy.com/en) in Berlin, Germany.
Special thanks to our teachers and TAs for their guidance and support.

## License
This project is licensed under the MIT License

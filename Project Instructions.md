BACKEND MODULE CHALLENGE


Objective: 

Apply what you've learned about HTTP, JavaScript, Node, Express, Mongo, Mongoose and JWT to create a REST API that meets the requirements of a service like dev.to to function. 


Requirements:

The challenge must meet the following points: 

IT MUST MAKE USE OF THE FOLLOWING ENTITIES: 


USER                                         POST
-Represents a user and post author           -Represents a blog post

Atributes:                                   Atributes:
• name (string)                              • title (string)
• profilePic (string)                        • image (string)
• email (string)                             • body (string)
• password (string)                          • user (ObjectId [referencing UserId])
• created_at (date)                          • created_at (date)
• updated_at (date)                          • updated_at (date)

NOTE: There shouldn't be two users with the same email.


IT MUST IMPLEMENT THE FOLLOWING ENDPOINTS: 


• POST /user                               • GET /user/:id
To allow new user registry                 To obtain user information via an id
(does not require authorization)           (does not require authorization)

• POST /auth/login
To grant a new JWT every time it is called
(does not require authorization)

• POST /posts                              • GET /posts
To create a new post                       To list all posts
The created post will be asigned to        - Must support filtering by title using a query parameter (search).
the user who called the endpoint.          (does not require authorization)
(requires authorization)

• PATCH /posts/:id                         • DELETE /posts/:id
To allow updating a post                   To allow deleting a post
- Must not allow changing the author       - Olny post author can use this action
of the post.                               (requires authorization)
(requires authorization)


IT MUST MAKE USE OF THE FOLLOWING TOOLS: 


• NodeJS       • JWT       • Express       • bcryptjs
• http-errors  • mongoose  • MongoDB       • dotenv
• RESTful architecture 


EXTRA POINTS: 

- Connect the frontend challenge with this API  

• Login form       • Listed posts
• Post details     • Editing post
• Deleting post

- http requests collection from insomnia

- Add tags to your posts


HOW TO SUBMIT YOUR PROJECT: 

The challenge must be submitted as a github repository.

The repository must: 

• be unique and only used for this challenge
• include a .gitignore file
• the repository must not have the node_modules folder nor the .env file
• include a .env.example with the necessary keys for the .env file
• include a readme.md at the root of the repository, explain project, how to install, run it and what endpoints are available. 


KEY POINTS THAT WILL BE REVIEWED:

• That the repository meets the established
• The commits will be reviewed to determine team participation 
• Clean architecture implementation will be reviewed 
• That the implementation must follow the specifications  

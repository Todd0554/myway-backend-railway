# MyWay backend server 
### The backend is deployed in heroku.  
URL: https://myway-backend.herokuapp.com  
The APIs path are shown below:  
These api can be used like this (e.g https://myway-backend.herokuapp.com/api/sites)  

## Sites:  

- GET api/sites  
- GET api/sites/:id  
- DELETE api/sites/:id  
- POST api/sites  
- PUT api/sites/:id  
- POST /api/sites/:id/comments  
- DELETE /api/sites/:id/comments/:commentId  

## Blogs:

- POST api/blogs
- GET api/blogs
- GET api/blogs/:userId/all
- GET api/blogs/:id
- DELETE api/blogs/:id
- POST /api/blogs/:id/comments
- DELETE /api/blogs/:id/comments/:commentId
  
## Users
- POST api/users/login
- POST api/users/register
- GET api/users/profile
- PUT api/users/profile
- GET api/users
- DELETE api/users/:id
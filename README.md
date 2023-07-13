# cardiwatch-1
The remote cardiac monitoring -1

# directory description
config - Mysql database(db.js) and passport-local(passport.js) authentications configurations
routes - routes of application
    "/" - logic of application (index.js)
        1. '/' - render dashboard
        2. '/nodemcu' - receive data posted from nodemcu microcontroller board.
    "/users" - handling users of application (users.js)
        1. '/' - render the admin page
        2. '/adduser' - Register user(Physician)
        3. '/addpatient' - Register patient 
controllers - contain functions to implement the routes
    index-route for routes from index.js
    users-route.js for routes from users.js
my-middleware - middlewares to handle permissions and authenication
views - ejs views for client side.

# Run
make sure mysql database is running and tables are configured.
-npm install - to install the dependecies
-create .env file with database credentials.
then 
    ## npm start

Emmanuel E. Tweve
## Elementrix 2030
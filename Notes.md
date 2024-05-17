### Starting a Project
Create folder for frontend in VSCode, then in the terminal, type npx create-react-app frontend
Cd into the frontend folder, then run npm react-router-dom
npm start to run the project

### Clearing out the Project
so you can start from square 1.
In src > App.js, remove the header
In public > index.html, change the title

### Setting up
In the src folder, create the following 3 folders:
- Pages (create ecommerce pages)
- Components
- Context (used for context APIs)

The App.js file is the start. So in that div, you need to add the <Navbar /> element you created
(called "mounting" when putting it in App.js)

You need to set up the routes to the different pages in the App.js page. You do this by:
- First, import { BrowserRouter, Routes, Route } from 'react-router-dom'; (this will let you navigate around the website and create various routes)
- All components, including the <Navbar> should be contained within <BrowserRouter></BrowserRouter>
- Below the <Navbar>, add a <Routes></Routes> tag. This will contain each of the individual routes a user can navigate to
- For each route, add a <Route> tag, give it a "path" attribute (and the associated url path), and an "element" (this is where you add the call to the Pages you created)
- Then add the Link tag (from the react-router-dom) in the Navbar to allow users to navigate to different pages when they click items in the navbar

### Add fonts
1. Find a font on Google fonts
2. Select Get Code (embeded)
3. Copy the code to embed in <head> element
4. Go to public folder > index.html file
5. Add the links under the last meta tag and save
6. Go to index.css file (in src folder) and add the font in the body css element using the font-family attribute

### Creating the backend
We will be using ExpressJS for creating the API and use the JSON web token for the user authentication system. 
These will be managed in a database. The DB we will use is the MongoDB Atlas Database.
    - To store images we will use Multer
1. In the backend folder, we need to install ExpressJS:
    - `npm init`
    - package name: (backend) (just press enter)
    - version: (1.0.0) (just press enter)
    - description: default (don't type anything, just press enter)
    - entry point: (index.js) (just press enter)
    - select enter for the next 5 questions: test command, git repository, keywords, author, license
    - select enter for "Is this OK? (YES)"
This creates the package.json file in the backend folder

Then we need to install the express package:
- `npm install express`
This adds the node_modules folder in the backend folder

Then install the JSON web token package, the mongoose package, and multer package:
- `npm install jsonwebtoken`
- `npm install mongoose`
- `npm install multer`
- `npm install cors` (this adds permissions to our app to access the backend)

After installing all of these, we can see the dependencies in the package.json folder. This is pulled from that folder:
    "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.19.2",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.4.0",
        "multer": "^1.4.5-lts.1"
    }

We also need to create the index.js file in the backend folder. This will be the file that will contain all backend code.

### Setting up MongoDB
1. Google MongoDB Atlas
2. Create an account (I made mine through Google)
3. Create a project, and create a cluster for the DB. Give the cluster a username and password
    - User: kevdev
    - Pass: WhatNowH0H@
4. To allow anyone to access, add an IP Address of "0.0.0.0"
    - This allows the server to be accessed from any IP address
5. After the DB cluster is created in MongoDB Atlas, we need to connect it to our Express server
    - Select "Connect"
    - Select "Compass"
    - Leave default settings ("I don't have MongoDB Compass install" and whatever the default OS is)
    - Copy the connection string
    - create a connection in index.js with mongoose.connect("[connection string we copied - need to add password]")

To run our backend, run the following terminal command:
- `node index.js`
- Once this is running, go to the browser and search "localhost:4000" to see the success message "Express App is Running"

### Thunder Client
I installed the Thunder Client extension on VSCode to allow me to create new requests to test that the endpoints I made work as expected.
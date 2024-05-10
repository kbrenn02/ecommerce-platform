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
# IFN636-A1

## Project demo
1. Installation
    - Open terminal
    - Install dependencies in the root folder: `npm install`
    - Install dependencies in backend
        ```
        cd backend
        npm install
        ```
    -  and frontend
        ```
        cd ../frontend
        npm install
        ```
2. Change EC2 IP:
    - Find `.env.example` file in `frontend` folder
    - Create a new `.env` file in the same `frontend` folder
    - Copy content of `.env.example` to `.env`
        - Change value `00.00.0.000` to the EC2 public IP
2. Run
    - Open terminal in the project root folder (`~/SEM4-IFN636-A1`). This is important.
    - Run this command in root folder
        ```
        npm run dev
        ```

##  Project folder tree:
```
SEM4-IFN636-A1:.
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|   tree.txt
|   
+---backend
|   |   .env
|   |   .env.example
|   |   package-lock.json
|   |   package.json
|   |   server.js
|   |   
|   +---config
|   |       db.js
|   |       
|   +---controllers
|   |       authController.js
|   |       gameController.js
|   |       reviewController.js
|   |       
|   +---middleware
|   |       authMiddleware.js
|   |       
|   +---models
|   |       Game.js
|   |       Review.js
|   |       User.js
|   |       
|   \---routes
|           authRoutes.js
|           gameRoutes.js
|           reviewRoutes.js
|           
\---frontend
    |   package-lock.json
    |   package.json
    |   tailwind.config.js
    |   
    +---public
    |       favicon.ico
    |       index.html
    |       logo192.png
    |       logo512.png
    |       manifest.json
    |       robots.txt
    |       
    \---src
        |   App.css
        |   App.js
        |   App.test.js
        |   axiosConfig.jsx
        |   index.css
        |   index.js
        |   logo.svg
        |   reportWebVitals.js
        |   setupTests.js
        |   
        +---components
        |       Navbar.jsx
        |       ReviewList.jsx
        |       YourReview.jsx
        |       
        +---context
        |       AuthContext.js
        |       
        \---pages
                Admin.jsx
                Game.jsx
                Login.jsx
                NewUser.jsx
                Profile.jsx
                Register.jsx
                Review.jsx
                User.jsx
                

```

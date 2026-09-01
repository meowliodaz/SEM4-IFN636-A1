# IFN636-A1

## Project demo
1. Installation
    - Install dependencies in backend, and frontend
    - Install dependencies in the root folder
2. Run
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

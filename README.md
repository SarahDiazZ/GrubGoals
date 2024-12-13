
# Grub Goals
Smarter meal planning for a smarter you!


## Authors

- [@SarahDiazZ](https://github.com/SarahDiazZ)
- [@austinw117](https://github.com/austinw117)
- [@MGarcia25](https://github.com/MGarcia25)
- [@alenrtan](https://github.com/alenrtan)


## Features

- Recipes based on dietary restrictions
    - Saving recipes (Favorites)
    - Scheduling recipes
- Visualize macros based on scheduled meals
- Interactive Calendar
- Light/Dark mode toggle


## Installation
Grub Goals is built using React + Vite, MongoDB/Mongoose, Chart.js, React-Big-Calendar and your tradional HTML/CSS

- Install Grub Goals locally; either by forking the repository or downloading the .zip file. Once downloaded, using a terminal (or an editor of choice), navigate to your download. 
- `npm install` to install all dependencies
- Once npm has finished installing, run one of the following commands (choose most applicable):
  - `npm run dev` starts the development server ONLY
  - `node server.js` starts the server ONLY
  - `npm start` starts both the development server and backend server (MongoDB)
    
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. **DO NOT SHARE YOUR KEYS.** Your `.env` file should be gitignored.

`VITE_SPOONACULAR_API_KEY`

If you are planning on using/trying Google Authentication:

`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`


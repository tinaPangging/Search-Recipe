
# Search Recipe

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

### General info
This responsive application allows to search for a recipe. Results(recipe name and image) are displayed with pagination. (only 5 recipes per page are shown). There is a dropdown which contains a list of cuisines. It provides the ability to filter the recipes by cuisine. Once the recipe is selected and clicked, it redirects to the detail page. The detail page has recipe name, image, health information(ex: vegan, glutan free), list of ingredients with measure and cooking instructions.
	
### Technologies
Project is created with:
* [React.js](https://reactjs.org/) 
* [Material-UI](https://material-ui.com/)
* [Spoonacular API](https://spoonacular.com/food-api/docs)
	
### Setup
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this project, run the commands line mentioned below:
```
npm install
npm install @material-ui/core
npm install @material-ui/icons
npm install axios

```

Then,:

```
npm start
```
Open [http://localhost:3000/home](http://localhost:3000/home) with your browser to see the result.

### Notes
[Spoonacular API](https://spoonacular.com/food-api/docs) has limited number (150) of daily points, which means limited no of requests can be made per day with one API Key and 402 error will appear.  





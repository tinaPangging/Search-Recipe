import React, { useState, useEffect ,useContext} from "react";

// import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Box from "@material-ui/core/Box";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {Context} from './stateManagement/Store'

const useStyles = makeStyles({
  media: {
    // height: 350
  },
  recipeTitle: {
    fontFamily: "Papyrus",
    fontWeight: "bold",
    fontSize: "40px"
    // backgroundColor: 'yellow'
    // height: "100%"
    // marginTop: 30
  },
  text: {
    fontFamily: "Papyrus",
    fontWeight: "bold",
    fontSize: "25px"
    //textAlign: "justify"
  },
  descriptionText: {
    fontFamily: "Papyrus"
    // fontWeight: "bold",
    // fontSize: "40px"
    //textAlign: "justify"
  },
  healthInfo: {
    fontFamily: "Papyrus",
    fontWeight: "bold",
    fontSize: "15px"
  },
  nonVeg: {
    marginLeft: 10,
    color: "red"
  },
  veg: {
    marginLeft: 10,
    color: "green"
  },
 
});

const Recipe = props => {
  const classes = useStyles();
  const { match } = props;
  // const [, dispatch] = useStateValue();
  const [state, dispatch] = useContext(Context);

  console.log(state,'st')
  
  //   const dat = {
  //     aggregateLikes: 1,

  //     image: "https://spoonacular.com/recipeImages/638002-556x370.jpg",

  //     instructions:
  //       "In a medium-sized bowl, mix salt, pepper and flour together.↵Wash chicken and remove excess skin. Dredge in flour mixture and shake off excess.↵Heat oil is a large non-stick skillet over medium-high heat. Add chicken and brown on all sides.↵Remove from the pan and drain on paper towels.↵To the same skillet add the onion and garlic and stir until onion is soft, but not browned. Next, add red pepper and mushrooms; cook, stirring occasionally until softened.↵Add tomatoes, white wine and oregano and cook until alcohol has burned off; 3-5 minutes.↵Return chicken to skillet, cover and simmer on low for one hour.",
  //     title: "Chicken Cacciatore",
  //     vegan: true,
  //     vegetarian: false,
  //     veryHealthy: false,
  //     veryPopular: false,
  //     weightWatcherSmartPoints: 11,
  //     glutenFree: false
  //   };

  //   console.log(props.match.params.ID, "props");
  const [recipe, setRecipe] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.spoonacular.com/recipes/${match.params.ID}/information?apiKey=98455f46bcf046ca83205228f66ecf56&includeNutrition=false`
  //     )
  //     .then(res => {
  //       console.log(res.data);
  //       setRecipe(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [match.params.ID]);

  const removeSpecialCharacter = string => {
    string = string.replace(/\u2013|\u2014/g, "");
    return string;
  };

  const line = (index, length) => {
    if (index < length - 1) {
      return <hr />;
    }
  };

  const renderIngredients = recipe => {
    if (
      recipe &&
      recipe.extendedIngredients &&
      recipe.extendedIngredients.length > 0
    ) {
      return (
        <>
          {recipe.extendedIngredients.map((ingredient, index) => {
            return (
              <Grid key={"line_" + index} className={classes.descriptionText}>
                <p>{removeSpecialCharacter(ingredient.original)}</p>
                {line(index, recipe.extendedIngredients.length)}
              </Grid>
            );
          })}
        </>
      );
    }
  };

  const renderInstruction = recipe => {
    if (
      recipe &&
      recipe.analyzedInstructions &&
      recipe.analyzedInstructions.length > 0
    ) {
      return (
        <>
          {recipe.analyzedInstructions[0].steps.map((step, index) => {
            return (
              <Grid key={"line_" + index} className={classes.descriptionText}>
                <p>
                  <b>Step {step.number}: </b>
                  <span>{step.step}</span>
                </p>
                {line(index, recipe.analyzedInstructions[0].steps.length)}
              </Grid>
            );
          })}
        </>
      );
    }
  };

  const vegOrNonVeg = vegetarian => {
    return (
      <FiberManualRecordIcon
        fontSize="small"
        className={vegetarian ? classes.veg : classes.nonVeg}
      />
    );
  };

  return (
    <Grid
      container
      style={{ padding: 40, color: "white", background: 'linear-gradient(to left , black, #5e5c5c)'  }}
      spacing={6}
      className={classes.container}
    >
      <Grid xs={12} sm={6} style={{ paddingBottom: 10 }} item>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={recipe.image}
            //image="https://spoonacular.com/recipeImages/638002-312x231.jpg"
            title="Recipe"
            component="img"
          />
        </CardActionArea>
      </Grid>
      <Grid xs={12} sm={6} container item>
        <Grid
          className={classes.recipeTitle}
          xs={12}
          container
          direction="column"
          alignItems="flex-start"
          justify="center"
          item
        >
          {recipe.title}
        </Grid>
        <Grid
          className={classes.healthInfo}
          spacing={4}
          container
          alignItems="center"
          item
        >
          <Grid xs={12} sm={3} item>
            <Grid container>
              <Grid>Vegan</Grid>
              {recipe && recipe.vegan ? (
                <>
                  <CheckCircleIcon
                    fontSize="small"
                    style={{ marginLeft: 10, color: "green" }}
                  />
                </>
              ) : (
                <>
                  <CancelIcon
                    fontSize="small"
                    style={{ marginLeft: 10, color: "red" }}
                  />
                </>
              )}
            </Grid>
          </Grid>

          <Grid xs={12} sm={4} item>
            <Grid container>
              {recipe && recipe.vegetarian ? (
                <>
                  <Grid>Vegetarian</Grid>
                  {vegOrNonVeg(recipe.vegetarian)}
                </>
              ) : (
                <>
                  <Grid>Non Vegetarian</Grid>
                  {vegOrNonVeg(recipe.vegetarian)}
                </>
              )}
            </Grid>
          </Grid>
          <Grid xs={12} sm={5} item>
            <Grid container>
              <Grid>Gluten Free</Grid>
              {recipe && recipe.glutenFree ? (
                <>
                  <CheckCircleIcon
                    fontSize="small"
                    style={{ marginLeft: 10, color: "green" }}
                  />
                </>
              ) : (
                <>
                  <CancelIcon
                    fontSize="small"
                    style={{ marginLeft: 10, color: "red" }}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} container item>
        <Grid xs={12} sm={5} style={{ marginTop: 10 }} item>
          <span className={classes.text}>Ingredients:</span>
          {renderIngredients(recipe)}
        </Grid>
        <Grid sm={1} item />
        <Grid xs={12} sm={6} item>
          <span className={classes.text}>Instruction: </span>
          <span>{renderInstruction(recipe)}</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Recipe;

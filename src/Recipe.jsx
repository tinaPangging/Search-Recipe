import { useState,useEffect,useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Context } from "./stateManagement/Store";

const useStyles = makeStyles({
  recipeTitle: {
    fontFamily: "Papyrus",
    fontWeight: "bold",
    fontSize: "40px"
  },
  text: {
    fontFamily: "Papyrus",
    fontWeight: "bold",
    fontSize: "25px"
  },
  descriptionText: {
    fontFamily: "Papyrus"
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
  }
});

const Recipe = props => {
  const classes = useStyles();
  const { match } = props;
  const [state, dispatch] = useContext(Context);
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.spoonacular.com/recipes/${match.params.ID}/information?apiKey=da71ab606f25464abc2a5191ccec37d6&includeNutrition=false`
      )
      .then(res => {
        setRecipe(res.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [match.params.ID]);

  const removeSpecialCharacter = string => {
    string = string.replace(/\u2013|\u2014/g, "");
    return string;
  };

  const line = (index, length) => {
    if (index < length - 1) {
      return <hr />;
    }
  };

  //displays list of ingredients and measures
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

  // displays cooking intrusctions
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
    <>
      {!isLoading ? (
        <Grid
          container
          style={{
            padding: 40,
            color: "#ffffff",
            background: "linear-gradient(to left , #000000, #5e5c5c)"
          }}
          spacing={6}
          className={classes.container}
        >
          <Grid xs={12} sm={6} style={{ paddingBottom: 10 }} item>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={recipe.image}
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
      ) : (
         <Grid container justify="center" style={{ paddingTop:100}}>
            <CircularProgress style={{color:'#ffffff'}}/>
        </Grid>
       
      )}
    </>
  );
};

export default Recipe;

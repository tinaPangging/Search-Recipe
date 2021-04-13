import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Results from "./Results";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Context } from "./stateManagement/Store";

// import TablePagination from "@material-ui/core/TablePagination";
import FilterCuisine from "./FilterCuisine";

const useStyles = makeStyles({
  search: {
    cursor: "pointer"
    // color:'white'
  }
});

const Home = props => {
  // console.log(props,'props')
  const classes = useStyles();
  const [initialState, setInitialState] = useState({ value: "", results: [] });
  const [enter, setEnter] = useState(false)
  const [state, dispatch] = useContext(Context);


  const onSearch = () => {
   // alert(initialState.value);
  //  console.log(state,'state---before')
    // axios
    //   .get(
    //     `https://api.spoonacular.com/recipes/complexSearch?&apiKey=98455f46bcf046ca83205228f66ecf56&query=${initialState.value}&&number=100`
    //   )
    //   .then(res => {
    //     console.log(res.data);

    //     dispatch({type: 'SET_POSTS', data: res.data});
    //     dispatch({type: 'UPDATE_POST', pageNumber: 0});
    //     setInitialState({ value: "", results: res.data.results });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     dispatch({type: 'SET_ERROR', data: error});
    //   });

    // setEnter(true)

    //setInitialState({ value: "", results: testData.results });
    // setInitialState({ value: "", results: testData.results });
  };

   console.log(initialState,'initialState')
   console.log(state,'state---after')
  

  return (
    <Grid style={{ backgroundColor: "black" }}
    >
      <Grid
        container
        justify="center"
        style={{ paddingTop: 80, paddingLeft: 40, paddingRight: 40 }}
      >
        <Grid xs={12} sm={6} item>
          <Grid
            style={{ paddingBottom: 40 }}
            alignItems="center"
            justify="center"
            container
          >
            <img src="recipe.png" width="100" height="100" />
          </Grid>
          <TextField
            onChange={e => {
              setInitialState({ ...initialState, value: e.target.value });
            }}
            variant="outlined"
            fullWidth
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={onSearch} position="end">
                  <SearchIcon className={classes.search} />
                </InputAdornment>
              )
            }}
            style={{ backgroundColor: "white", borderRadius: "10px" }}
            placeholder="Search recipe"
          />
        </Grid>
      </Grid>

      {state && state.data && state.data.results && state.data.results.length > 0 && (
        <Results testData={state.data.results} history={props.history} enter={enter} setEnter={setEnter}/>
      )}
      <FilterCuisine />
    </Grid>
  );
};

export default Home;


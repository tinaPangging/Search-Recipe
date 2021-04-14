import { useState,useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { cuisines } from "./data/cuisines";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";


const useStyles = makeStyles({
  btnCuisine: {
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
    fontSize: "15px",
    textTransform: "none",
    color: "#636262",
    backgroundColor: "white"
  },
  arrowBtn: {
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: "white"
  },
  btnGroup: {
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px"
  }
});

const checkDataExist = (data)=>{
  if (data.totalResults  === 0) {
    return false;
  } else {
    return true;
  }   
}

const FilterCuisine = props => {
  const { state, dispatch, value, setIsValid } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const classes = useStyles();

  const handleClick = () => {
    //  console.info(`You clicked ${cuisines[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    if (
      state &&
      state.data &&
      cuisines[index] !== "Select cuisine" &&
      state.inputValue &&
      state.enter
    ) {
      dispatch({ type: "SET_POSTS", data:state.data, cuisine: cuisines[index],selectedIndex: index, pageNumber: state.pageNumber,inputValue: value, enter: state.enter});
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?&apiKey=d533817c8f724f739cf8a6975796f939&query=${state.inputValue}&&number=100&&cuisine=${cuisines[index]}`
        )
        .then(res => {
          console.log(res.data);
          dispatch({
            type: "SET_POSTS",
            data: res.data,
            pageNumber: state.pageNumber,
            cuisine: cuisines[index],
            selectedIndex: index,
            enter: state.enter,
            inputValue: state.inputValue
          });
          setIsValid(checkDataExist(res.data))
        })
        .catch(error => {
          dispatch({ type: "SET_ERROR", data: error });
        });
    } else {
      setIsValid(checkDataExist(state.data))
      dispatch({
        type: "SET_POSTS",
        data: state.data,
        cuisine: cuisines[index],
        selectedIndex: index,
        pageNumber: state.pageNumber,
        inputValue: state.inputValue,
        enter: state.enter
      });
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ padding: 30 }}
    >
      <Grid item xs={12}>
        <ButtonGroup
          className={classes.btnGroup}
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button className={classes.btnCuisine} onClick={handleClick}>
            {cuisines[state.selectedIndex]}
          </Button>
          <Button
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            className={classes.arrowBtn}
          >
            <ArrowDropDownIcon style={{ color: "#636262" }} />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: "center bottom"
              }}
            >
              <Paper style={{ maxHeight: 200, overflow: "auto" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {cuisines.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === state.selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};

export default FilterCuisine;

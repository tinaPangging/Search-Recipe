import { useState, useRef } from "react";
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
    backgroundColor: "#ffffff"
  },
  arrowBtn: {
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: "#ffffff"
  },
  btnGroup: {
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px"
  }
});

//checks if recipe of a particular cuisine exists
const checkDataExist = data => {
  if (data.totalResults === 0) {
    return false;
  } else {
    return true;
  }
};

const FilterCuisine = props => {
  const { state, dispatch, value, setIsValid } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const classes = useStyles();

  const handleClick = () => {
    //  console.info(`You clicked ${cuisines[selectedIndex]}`);
  };

  //displays recipes filtered by cuisine
  const handleMenuItemClick = (event, index) => {
    dispatch({
      type: "SET_STATE",
      data: state.data,
      cuisine: cuisines[index],
      selectedIndex: index,
      pageNumber: state.pageNumber,
      inputValue: value,
      enter: state.enter
    });
    if (
      state &&
      state.data &&
      cuisines[index] !== "Select cuisine" &&
      state.inputValue &&
      state.enter
    ) {
      dispatch({ type: "SET_STATE", data:state.data, cuisine: cuisines[index],selectedIndex: index, pageNumber: state.pageNumber,inputValue: value, enter: state.enter});
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?&apiKey=da71ab606f25464abc2a5191ccec37d6&query=${state.inputValue}&&number=100&&cuisine=${cuisines[index]}`
        )
        .then(res => {
          dispatch({
            type: "SET_STATE",
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
      setIsValid(checkDataExist(state.data));
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

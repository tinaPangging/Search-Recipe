import React, { useState, useEffect } from "react";

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
import {cuisines} from "./data/cuisines"
// import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

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
//   cuisine: {
//     color: "white"
//   },
btnCuisine:{
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    fontSize: '15px',
    textTransform: 'none',
    color: '#636262',
    backgroundColor:'white'
},
arrowBtn:{
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
    backgroundColor:'white'
},
btnGroup:{
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px'
}

});

// const FilterCuisine = props => {
//   const classes = useStyles();
//   const { match } = props;
//   console.log(cuisines.length)
  
//   return (
//     <Grid className={classes.cuisine} container justify="center">
//       {/* {cuisines} */}
//       {/* { cuisines.map((eachCuisine,index)=>{
//          return (
//              <>
//              <Grid xs={6} item>
//                  d
//              </Grid>
//              </>
//          )
//       })

//       } */}
//        <Select defaultValue="" id="grouped-select">
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={1}>Option 1</MenuItem>
//           <MenuItem value={2}>Option 2</MenuItem>
//           <MenuItem value={3}>Option 3</MenuItem>
//           <MenuItem value={4}>Option 4</MenuItem>
//         </Select>
//     </Grid>
//   );
// };

// const cuisines = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

const FilterCuisine = props=>{
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const classes = useStyles();

  const handleClick = () => {
    console.info(`You clicked ${cuisines[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center" style={{padding:30}}>
      <Grid item xs={12}>
        <ButtonGroup className={classes.btnGroup}  variant="contained"  ref={anchorRef} aria-label="split button" >
          <Button className={classes.btnCuisine} onClick={handleClick}>{cuisines[selectedIndex]}</Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            className={classes.arrowBtn}
          >
            <ArrowDropDownIcon style={{color: '#636262'}}/>
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'center bottom',
              }}
            >
              <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {cuisines.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
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
}

export default FilterCuisine;

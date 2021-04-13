import React, { useState, useEffect,useContext } from "react";

// import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";

import TablePagination from "@material-ui/core/TablePagination";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Redirect } from "react-router-dom";
import Pagination from "./Pagination";
import { Context } from "./stateManagement/Store";


const useStyles = makeStyles({
  // table: {
  //   minWidth: 700,
  // },
  media: {
    height: 140
  },
  root: {
    maxWidth: 300,
    height: 250
  },
  xsSize: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 40
  },
  smSize: {
    paddingTop: 40
  }
});

// 599 452

const Results = props => {
  const classes = useStyles();
  const { testData, history } = props;
  const [state, dispatch] = useContext(Context);
  // console.log(state,'state')
  const theme = useTheme();

  const isXS = useMediaQuery(theme.breakpoints.down("xs"));
  const isSM = useMediaQuery(theme.breakpoints.between("sm", "sm"));


  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [page, setPage] = useState(0);
 
  const handleChangePage = (event, newPage) => {
    dispatch({type: 'UPDATE_POST', pageNumber: newPage});
    setPage(newPage);
  };
   
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    dispatch({type: 'UPDATE_POST', pageNumber: 0});
    setPage(0);
  };

  // console.log(state,'state')
  console.log(page,'page')

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        // style={{  paddingTop:40 }}
        className={isXS ? classes.xsSize : classes.smSize}
        // style={{  paddingLeft: 90, paddingRight:90, paddingTop:40 }}
      >
        {(rowsPerPage > 0
          ? testData.slice(state.pageNumber * rowsPerPage, state.pageNumber * rowsPerPage + rowsPerPage)
          : testData
        ).map(row => (
          <Grid
            sm={2}
            xs={12}
            style={{ cursor: "pointer" }}
            onClick={e => {
              e.preventDefault();
              history.push(`/recipe/${row.id}`);
            }}
            key={row.id}
            item
          >
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={row.image}
                  title="Recipe"
                />
                <CardContent>
                  <Typography
                    // variant="h6"
                    style={{ fontFamily: "Papyrus", fontWeight: "bold" }}
                  >
                    {row.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <Grid> */}
      {/* <TablePagination
            rowsPerPageOptions={[]}
            count={testData.length}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            // colSpan={3}
            page={page}
            style={{border:"white", color: "white"}}
          /> */}
      {/* </Grid> */}
      <Pagination
        testData={testData}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={state.pageNumber}
      />
    </>
  );
};

export default Results;

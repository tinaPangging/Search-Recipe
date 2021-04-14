import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Pagination from "./Pagination";

const useStyles = makeStyles({
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

const Results = props => {
  const classes = useStyles();
  const { testData, history, state, dispatch } = props;
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    // dispatch({ type: "UPDATE_POST", pageNumber: newPage});
    dispatch({
      type: "SET_POSTS",
      data: state.data,
      cuisine: state.cuisine,
      selectedIndex: state.selectedIndex,
      pageNumber: newPage,
      enter: state.enter
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // dispatch({ type: "UPDATE_POST", pageNumber: 0 });
    dispatch({
      type: "SET_POSTS",
      data: state.data,
      cuisine: state.cuisine,
      selectedIndex: state.selectedIndex,
      pageNumber: 0,
      enter: state.enter
    });
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className={isXS ? classes.xsSize : classes.smSize}
      >
        {(rowsPerPage > 0
          ? testData.slice(
              state.pageNumber * rowsPerPage,
              state.pageNumber * rowsPerPage + rowsPerPage
            )
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
      <Grid container justify="center" style={{ paddingTop:20}}>
        <Pagination
          testData={testData}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={state.pageNumber}
        />
      </Grid>
    </>
  );
};

export default Results;

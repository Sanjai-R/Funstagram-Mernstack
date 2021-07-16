import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";



export default function TextButtons({text,color,type,size,onClick}) {
    const useStyles = makeStyles((theme) => ({
      root: {
        "& > *": {
          margin: theme.spacing(1),
          width: "90%",
          backgroundColor: "#4F46E5",
        },
      },
    }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        type={type}
        size={size}
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
}

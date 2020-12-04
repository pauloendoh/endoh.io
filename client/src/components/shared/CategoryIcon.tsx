import { Box, makeStyles, Paper, Theme, useTheme } from "@material-ui/core";
import React from "react";
import CategoryGetDto from "../../dtos/monerate/CategoryDtos/CategoryGetDto";
import FlexVCenter from "./Flexboxes/FlexVCenter";

const CategoryIcon = (props: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <FlexVCenter
      className={classes.root}
    >
      {props.category.name[0].toUpperCase()}
    </FlexVCenter>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.secondary.main,
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 30,
    fontWeight: 600,
  },
}));

interface Props {
  category: CategoryGetDto;
}

export default CategoryIcon;

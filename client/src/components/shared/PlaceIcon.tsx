import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import PlaceGetDto from "../../dtos/monerate/PlaceGetDto";
import FlexVCenter from "./Flexboxes/FlexVCenter";

const PlaceIcon = (props: Props) => {
  const classes = useStyles();
  return (
    <FlexVCenter className={classes.root}>
      {props.place.name[0].toUpperCase()}
    </FlexVCenter>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 30,
    fontWeight: 600,
  },
}));

interface Props {
  place: PlaceGetDto;
}

export default PlaceIcon;

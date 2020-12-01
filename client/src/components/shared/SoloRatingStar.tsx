import { Box, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import FlexVCenter from "./Flexboxes/FlexVCenter";
import StarRateIcon from "@material-ui/icons/StarRate";
import myTheme from "utils/myTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SoloRatingStar = (props: Props) => {
    const theme = useTheme()
  return (
    <Box>
      {props.value > 0 ? (
        <FlexVCenter>
            <Box mr={1}>
            {Math.round(props.value * 10) / 10}

            </Box>
          <FontAwesomeIcon
            icon={faStar}
            color={props.color}
            fontSize={props.fontSize ? props.fontSize : 40}
            // className={classes.starIcon}
          />
          {/* <StarRateIcon color={props.color} fontSize="large" /> */}
        </FlexVCenter>
      ) : (
        <Box ml={1}>
          <FontAwesomeIcon
            icon={faStar}
            color={theme.palette.grey[400]}
            fontSize={props.fontSize ? props.fontSize : 40}

            // className={classes.starIcon}
          />

          {/* <StarRateIcon color="disabled" fontSize="large" /> */}
        </Box>
      )}
    </Box>
  );
};

interface Props {
  value: number;
  color: string;
  fontSize?: number;
}

export default SoloRatingStar;

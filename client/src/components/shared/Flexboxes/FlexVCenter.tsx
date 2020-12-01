import { Box } from "@material-ui/core";
import React from "react";

const FlexVCenter = (props: Props) => {
  return (
    <Box display="flex" alignItems="center"  {...props}>
      {props.children}
    </Box>
  );
};

type Props = React.ComponentProps<typeof Box>;

export default FlexVCenter;

import { Box } from "@material-ui/core";
import React from "react";

const FlexCenter = (props: Props) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" {...props}>
      {props.children}
    </Box>
  );
};

type Props = React.ComponentProps<typeof Box>;

export default FlexCenter;

import { Box } from "@material-ui/core";
import React from "react";

const FlexHCenter = (props: Props) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" {...props}>
      {props.children}
    </Box>
  );
};

type Props = React.ComponentProps<typeof Box>;

export default FlexHCenter;

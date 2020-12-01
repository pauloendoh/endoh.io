import { Box } from "@material-ui/core";
import React from "react";

const Flex = (props: Props) => {
  return (
    <Box display="flex" {...props}>
      {props.children}
    </Box>
  );
};

type Props = React.ComponentProps<typeof Box>;

export default Flex;

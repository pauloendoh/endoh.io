import { Typography } from "@material-ui/core";
import React from "react";

const TextPrimary = (props: Props) => {
  return (
    <Typography variant="inherit" color="primary" {...props}>
      {props.children}
    </Typography>
  );
};

type Props = React.ComponentProps<typeof Typography>;

export default TextPrimary;

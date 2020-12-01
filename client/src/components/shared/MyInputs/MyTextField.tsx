import { TextField } from "@material-ui/core";
import React from "react";

const MyTextField = (props: Props) => {
  // Textfield with some default props (to reduce some code lines xd)

  return (
    <TextField size="small" autoComplete="off" variant="outlined" {...props} />
  );
};

type Props = React.ComponentProps<typeof TextField>;

export default MyTextField;

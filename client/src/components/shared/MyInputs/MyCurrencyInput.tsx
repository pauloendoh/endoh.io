import TextField from "@material-ui/core/TextField";
import React from "react";
import NumberFormat from "react-number-format";
import MyTextField from "../../shared/MyInputs/MyTextField";

const MyCurrencyInput = (props: Props) => {
  return (
    <MyTextField
      value={props.value}
      onChange={props.onChange}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: InnerComponent as any,
      }}
      {...props}
    />
  );
};

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const InnerComponent = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalScale={2}
      prefix="$"
    />
  );
};

type Props = React.ComponentProps<typeof TextField>;

export default MyCurrencyInput;

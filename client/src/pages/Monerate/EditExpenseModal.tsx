import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import {
  createStyles,
  Theme,
  useTheme,
  WithStyles,
  withStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Rating from "@material-ui/lab/Rating";
import Flex from "components/shared/Flexboxes/Flex";
import MyCurrencyInput from "components/shared/MyInputs/MyCurrencyInput";
import MyTextField from "components/shared/MyInputs/MyTextField";
import CategoryGetDto from "dtos/monerate/CategoryDtos/CategoryGetDto";
import ExpenseGetDto from "../../dtos/monerate/ExpenseGetDto";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "store/store";
import myAxios from "utils/myAxios";
import ExpensePostDto from "../../dtos/monerate/ExpensePostDto";
import * as monerateActions from "../../store/monerate/monerateActions";
import SelectCategoriesInput from "./Inputs/SelectCategoriesInput/SelectCategoriesInput";
import SelectPlaceInput from "./Inputs/SelectPlaceInput/SelectPlaceInput";

// PE 1/3 ?
const EditExpenseModal = (props: Props) => {
  const [rating, setRating] = React.useState(0);
  const [formikInitialValues, setFormikInitialValues] = useState<
    ExpensePostDto
  >(null);

  const theme = useTheme()

  const handleSetRating = (val: number) => {
    if (val === rating) {
      setRating(0);
    } else {
      setRating(val);
    }
  };

  useEffect(() => {
    // PE 1/3 - ew
    if (props.editingExpense?.id) {
      setFormikInitialValues({
        id: props.editingExpense.id,
        placeId: props.editingExpense.place?.id,
        description: props.editingExpense.description,
        name: props.editingExpense.name,
        rating: props.editingExpense.rating,
        value: props.editingExpense.value,

        categories: props.editingExpense.categories,
      });

      setRating(props.editingExpense.rating);
    } else {
      setFormikInitialValues({
        id: null,
        placeId: null,
        description: "",
        name: "",
        rating: 0,
        value: 0,

        categories: [],
      });
    }
  }, [props.editingExpense]);

  const handleClickOpen = () => {
    props.startNewExpense();
    setRating(0);

    setTimeout(() => {
      const expenseNameInput = document.querySelector(
        "[aria-label='expense-name-input']"
      ) as HTMLInputElement;
      expenseNameInput.focus();
    }, 100);
  };
  const handleClose = () => {
    props.closeExpenseModal();
  };

  const handleSubmit = (
    values: ExpensePostDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    // I gotta fix this... MyCurrencyInput is returning event.target.value as string
    values.value = parseFloat(values.value as any);
    values.rating = rating;

    myAxios
      .post<ExpenseGetDto>("/monerate/expense", values)
      .then((res) => {
        props.addOrUpdateExpense(res.data);
      })
      .finally(() => {
        setSubmitting(false);
        props.closeExpenseModal();
      });
  };

  const keyMap = { openModal: "q" };
  const handlers = {
    openModal: () => {
      handleClickOpen();
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Box>
        <Tooltip title="(q) Quick add expense">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            <Box display="flex" alignItems="center">
              <FontAwesomeIcon icon={faPlus} />
              <Box ml={1}>New Expense</Box>
            </Box>
          </Button>
        </Tooltip>

        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={!!props.editingExpense}
          fullWidth
          maxWidth="lg"
        >
          <Box pb={1} px={1}>
            <Formik
              initialValues={formikInitialValues}
              onSubmit={(formikValues, { setSubmitting }) => {
                handleSubmit(formikValues, setSubmitting);
              }}
            >
              {({ setFieldValue, values, isSubmitting, handleChange }) => (
                <Form>
                  <DialogTitle
                    id="edit-expense-dialog-title"
                    onClose={handleClose}
                  >
                    New Expense
                  </DialogTitle>
                  <DialogContent>
                    <Flex>
                      <Box>
                        <Typography component="legend">Place</Typography>
                        <SelectPlaceInput
                          value={values.placeId}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (val) {
                              setFieldValue("placeId", val);
                            } else {
                              setFieldValue("placeId", null);
                            }
                          }}
                        />
                      </Box>
                      <Box ml={2}>
                        <Typography component="legend">Name</Typography>
                        <MyTextField
                          id="name"
                          name="name"
                          value={values.name}
                          inputProps={{ "aria-label": "expense-name-input" }}
                          hiddenLabel
                          placeholder="Eggs, PS5 game..."
                          onChange={handleChange}
                        />
                      </Box>

                      <Box ml={2} width={125}>
                        <Typography component="legend">Value ($)</Typography>
                        <MyCurrencyInput
                          id="value"
                          name="value"
                          value={values.value}
                          hiddenLabel
                          placeholder="$"
                          variant="outlined"
                          autoComplete="off"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          size="small"
                        />
                      </Box>

                      <Box ml={2} flexGrow={1}>
                        <Typography component="legend">Extra notes</Typography>
                        <MyTextField
                          id="description"
                          name="description"
                          value={values.description}
                          hiddenLabel
                          onChange={handleChange}
                          fullWidth
                          multiline
                          placeholder="Reminders, links..."
                        />
                      </Box>

                      {/* <FormattedInputs /> */}
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Flex mt={2}>
                        <Box>
                          <Typography component="legend">Category</Typography>
                          <SelectCategoriesInput
                            value={values.categories}
                            onChange={(e) => {
                              const val = (e.target
                                .value as unknown) as CategoryGetDto[];
                              setFieldValue("categories", val);
                            }}
                          />
                        </Box>

                        <Box ml={2}>
                          <Typography component="legend">Rating</Typography>
                          <Box mt={1}>
                            <Rating
                              name="simple-controlled"
                              value={rating}
                              onChange={(event, newValue) => {
                                handleSetRating(newValue);
                              }}
            

                            />
                          </Box>
                        </Box>
                      </Flex>
                      <Flex alignItems="flex-end">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          // onClick={handleClose}
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          Save
                        </Button>
                      </Flex>
                    </Flex>
                  </DialogContent>
                  {/* <DialogActions>
              
              </DialogActions> */}
                </Form>
              )}
            </Formik>
          </Box>
        </Dialog>
      </Box>
    </GlobalHotKeys>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const mapStateToProps = (state: ApplicationState) => ({
  editingExpense: state.monerate.editingExpense,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addOrUpdateExpense: (expense: ExpenseGetDto) =>
    dispatch(monerateActions.addOrUpdateExpense(expense)),

  startNewExpense: () => dispatch(monerateActions.startNewExpense()),
  closeExpenseModal: () => dispatch(monerateActions.closeExpenseModal()),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseModal);

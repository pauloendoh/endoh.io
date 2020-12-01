import {
  Box,
  Button,
  Chip,
  createStyles,
  Dialog,
  FormControl,
  Input,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import API from 'consts/API';
import CategoryGetDto from "dtos/monerate/CategoryDtos/CategoryGetDto";
import CategoryPostDto from "dtos/monerate/CategoryDtos/CategoryPostDto";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Flex from "../../../../components/shared/Flexboxes/Flex";
import MyTextField from "../../../../components/shared/MyInputs/MyTextField";
import * as monerateActions from "../../../../store/monerate/monerateActions";
import { ApplicationState } from "../../../../store/store";
import myAxios from "../../../../utils/myAxios";

const SelectCategoriesInput: React.FC<Props> = (props) => {
  const classes = useStyles();

  const initialCategories = props.value as CategoryGetDto[];

  const [selectedIds, setSelectedIds] = useState<number[]>(
    initialCategories.map((c) => c.id)
  );
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let ids = event.target.value as number[];
    ids = ids.filter((id) => id !== undefined);
    setSelectedIds(ids);

    const categories = [];
    for (const id of ids) {
      categories.push(getCategoryById(id));
    }

    event.target.value = categories;

    setSelectedIds(ids.filter((id) => id));
    // setSelectedCategories(categories.filter((category) => category?.id));
    props.onChange(event as any);
  };

  const getCategoryById = (id: number) => {
    return props.categories.find((c) => c.id === id);
  };

  const formikValues: CategoryPostDto = {
    bgColor: "",
    icon: "",
    name: "",
  };

  const createCategory = (category: CategoryPostDto) => {
    myAxios
      .post<CategoryGetDto[]>(API.monerate.category, category)
      .then((res) => {
        props.setCategories(res.data);
      })
      .finally(() => {
        setIsCreatingCategory(false);
      });
  };

  return (
    <div>
      {isCreatingCategory && (
        <Dialog onClose={() => setIsCreatingCategory(false)} open>
          <Box margin={2}>
            <Formik
              initialValues={formikValues}
              onSubmit={(formikValues, { setSubmitting }) => {
                createCategory(formikValues);
              }}
            >
              {({ isSubmitting, handleChange }) => (
                <Form>
                  <MyTextField
                    id="name"
                    name="name"
                    label="Category name"
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                  <Flex justifyContent="flex-end" mt={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Save
                    </Button>
                    <Box ml={1}>
                      <Button
                        size="small"
                        onClick={() => {
                          setIsCreatingCategory(false);
                        }}
                        variant="outlined"
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </Dialog>
      )}

      <FormControl className={classes.formControl}>
        <Select
          variant="outlined"
          id="demo-multiple-chip"
          multiple
          value={selectedIds}
          onOpen={() => {
            setIsCreatingCategory(false);
          }}
          onChange={handleChange}
          input={<OutlinedInput inputProps={{className: classes.input}} />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as number[]).map((id) => (
                <Chip
                  size="small"
                  key={id}
                  label={getCategoryById(id).name}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {props.categories.map((category) => (
            <MenuItem key={category.id} value={category.id as any}>
              {category.name}
            </MenuItem>
          ))}

          {!isCreatingCategory && (
            <MenuItem
              onClick={() => {
                setIsCreatingCategory(true);
              }}
            >
              + New category
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  categories: state.monerate.categories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCategories: (categories: CategoryGetDto[]) =>
    dispatch(monerateActions.setCategories(categories)),
});

type Props = React.ComponentProps<typeof TextField> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      maxWidth: 300,
    },
    input: {
      padding: 10
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCategoriesInput);

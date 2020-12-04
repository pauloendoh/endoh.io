import { Box, Button, Dialog } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Flex from "../../../components/shared/Flexboxes/Flex";
import MyTextField from "../../../components/shared/MyInputs/MyTextField";
import API from "../../../consts/API";
import CategoryGetDto from "../../../dtos/monerate/CategoryDtos/CategoryGetDto";
import * as monerateActions from "../../../store/monerate/monerateActions";
import { ApplicationState } from "../../../store/store";
import myAxios from "../../../utils/myAxios";

const EditCategoryModal = (props: Props) => {
  const handleSubmit = (category: CategoryGetDto) => {
    myAxios
      .post<CategoryGetDto[]>(API.monerate.category, category)
      .then((res) => {
        props.setCategories(res.data);
      })
      .finally(() => {
        props.closeCategoryModal();
      });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      myAxios
        .delete<CategoryGetDto[]>(`${API.monerate.category}/${id}`)
        .then((res) => {
          props.setCategories(res.data);
        })
        .finally(() => {
          props.closeCategoryModal();
        });
    }
  };

  return (
    <Dialog
      onClose={() => props.closeCategoryModal()}
      open={!!props.editingCategory}
    >
      <Box margin={2}>
        <Formik
          initialValues={props.editingCategory}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <MyTextField
                id="name"
                name="name"
                value={values.name}
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
                {values.id && (
                  <Box ml={1}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleDelete(values.id);
                      }}
                      color="secondary"
                      size="small"
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  editingCategory: state.monerate.editingCategory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeCategoryModal: () => dispatch(monerateActions.closeCategoryModal()),
  setCategories: (categories: CategoryGetDto[]) =>
    dispatch(monerateActions.setCategories(categories)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);

import { Box, Button, Dialog, useTheme } from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import MyTextField from "components/shared/MyInputs/MyTextField";
import API from "consts/API";
import PlaceGetDto from "dtos/monerate/PlaceGetDto";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import myAxios from "utils/myAxios";
import * as monerateActions from "../../../store/monerate/monerateActions";
import { ApplicationState } from "../../../store/store";

const EditPlaceModal = (props: Props) => {
  // const [initialValues, setInitialValues] = useState(props.editingPlace);

  // useEffect(() => {
  //   setInitialValues(props.editingPlace);
  // }, [props.editingPlace]);

  const handleSubmit = (place: PlaceGetDto) => {
    myAxios
      .post<PlaceGetDto[]>(API.monerate.place, place)
      .then((res) => {
        props.setPlaces(res.data);
      })
      .finally(() => {
        props.closePlaceModal();
      });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      myAxios
        .delete<PlaceGetDto[]>(`${API.monerate.place}/${id}`)
        .then((res) => {
          props.setPlaces(res.data);
        })
        .finally(() => {
          props.closePlaceModal();
        });
    }
  };

  return (
    <Dialog onClose={() => props.closePlaceModal()} open={!!props.editingPlace}>
      <Box margin={2}>
        <Formik
          initialValues={props.editingPlace}
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
                label="Place name"
                onChange={handleChange}
                required
                autoFocus
              />
              <Flex justifyContent="flex-end" mt={1}>
                <Button
                  disabled={isSubmitting}
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
  editingPlace: state.monerate.editingPlace,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePlaceModal: () => dispatch(monerateActions.closePlaceModal()),
  setPlaces: (places: PlaceGetDto[]) =>
    dispatch(monerateActions.setPlaces(places)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(EditPlaceModal);

import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import MyTextField from "components/shared/MyInputs/MyTextField";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "store/store";
import myAxios from "utils/myAxios";
import PlaceGetDto from "../../../../dtos/monerate/PlaceGetDto";
import PlacePostDto from "../../../../dtos/monerate/PlacePostDto";
import * as monerateActions from "../../../../store/monerate/monerateActions";

const SelectPlaceInput: React.FC<Props> = (props) => {
  const classes = useStyles();
  const initialValue = props.value
    ? props.places.find((p) => p.id === props.value)
    : null;

  const [place, setPlace] = useState<PlaceGetDto>(initialValue);

  const [isCreatingPlace, setIsCreatingPlace] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsCreatingPlace(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createPlace = (place: PlacePostDto) => {
    myAxios
      .post<PlaceGetDto[]>("/monerate/place", place)
      .then((res) => {
        props.setPlaces(res.data);
      })
      .finally(() => {
        setIsCreatingPlace(false);
      });
  };

  const formikValues: PlacePostDto = {
    bgColor: "",
    icon: "",
    name: "",
  };

  return (
    <div>
      <Button
        variant="outlined"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.rootButton}
      >
        {place === null ? (
          <Flex justifyContent="flex-end" width="100%">
            <FontAwesomeIcon icon={faSortDown} />
          </Flex>
        ) : (
          <Flex justifyContent="space-between" width="100%">
            <Box>
              <Typography noWrap>{place.name}</Typography>
            </Box>
            <FontAwesomeIcon icon={faSortDown}/>
          </Flex>
        )}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          value={null}
          onClick={(e) => {
            setPlace(null);
            handleClose();
            props.onChange(e as any);
          }}
        >
          ---
        </MenuItem>

        {props.places.map((place) => (
          <MenuItem
            key={place.id}
            value={place.id}
            onClick={(e) => {
              setPlace(place);
              handleClose();
              props.onChange(e as any);
            }}
          >
            {place.name}
          </MenuItem>
        ))}

        {!isCreatingPlace ? (
          <MenuItem
            onClick={() => {
              setIsCreatingPlace(true);
            }}
          >
            + New place
          </MenuItem>
        ) : (
          <Box margin={2}>
            <Formik
              initialValues={formikValues}
              onSubmit={(formikValues, { setSubmitting }) => {
                createPlace(formikValues);
              }}
            >
              {({ isSubmitting, handleChange }) => (
                <Form>
                  <MyTextField
                    id="name"
                    name="name"
                    label="Place name"
                    onChange={handleChange}
                    required
                    autoFocus
                    className={classes.myTextField}
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
                          setIsCreatingPlace(false);
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
        )}

        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  rootButton: {
    background: theme.palette.background.default,
    height: 40,
    width: 200,
  },

  myTextField: {
    width: 150
  }
}));

const mapStateToProps = (state: ApplicationState) => ({
  places: state.monerate.places,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // add place
  setPlaces: (places: PlaceGetDto[]) =>
    dispatch(monerateActions.setPlaces(places)),
});

type Props = React.ComponentProps<typeof TextField> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlaceInput);

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import myAxios from "utils/myAxios";
import API from "../../../consts/API";
import PlaceGetDto from "../../../dtos/monerate/PlaceGetDto";
import * as monerateActions from "../../../store/monerate/monerateActions";
import { ApplicationState } from "../../../store/store";
const PlaceSettings = (props: Props) => {
  const handleClickOpen = () => {};

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.places.length === 0) {
      myAxios
        .get<PlaceGetDto[]>(API.monerate.place)
        .then((res) => {
          props.setPlaces(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <Box display="flex" alignItems="center">
          <FontAwesomeIcon icon={faPlus} />
          <Box ml={1}>New place</Box>
        </Box>
      </Button>

      {props.places.length ? (
        <Paper>
          <Box p={2}>
            <Typography>Places</Typography>
            {props.places.map((place) => (
              <Grid key={place.id}>{place.name}</Grid>
            ))}
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  places: state.monerate.places,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPlaces: (places: PlaceGetDto[]) =>
    dispatch(monerateActions.setPlaces(places)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(PlaceSettings);

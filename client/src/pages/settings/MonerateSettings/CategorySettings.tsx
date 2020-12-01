import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import myAxios from "../../../utils/myAxios";
import API from "../../../consts/API";
import CategoryGetDto from "../../../dtos/monerate/CategoryDtos/CategoryGetDto";
import PlaceGetDto from "../../../dtos/monerate/PlaceGetDto";
import * as monerateActions from "../../../store/monerate/monerateActions";
import { ApplicationState } from "../../../store/store";
const CategorySettings = (props: Props) => {
  const handleClickOpen = () => {};

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.categories.length === 0) {
      myAxios
        .get<CategoryGetDto[]>(API.monerate.category)
        .then((res) => {
          props.setCategories(res.data);
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
          <Box ml={1}>New category</Box>
        </Box>
      </Button>

      {props.categories.length ? (
        <Paper>
          <Box p={2}>
            <Typography>Categories</Typography>
            {props.categories.map((category) => (
              <Grid key={category.id}>{category.name}</Grid>
            ))}
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  categories: state.monerate.categories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCategories: (categories: CategoryGetDto[]) =>
    dispatch(monerateActions.setCategories(categories)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CategorySettings);

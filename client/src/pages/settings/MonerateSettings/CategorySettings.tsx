import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import CategoryIcon from "components/shared/CategoryIcon";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import API from "../../../consts/API";
import CategoryGetDto from "../../../dtos/monerate/CategoryDtos/CategoryGetDto";
import * as monerateActions from "../../../store/monerate/monerateActions";
import { ApplicationState } from "../../../store/store";
import myAxios from "../../../utils/myAxios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const CategorySettings = (props: Props) => {
  useEffect(() => {
    myAxios.get<CategoryGetDto[]>(API.monerate.category).then((res) => {
      props.setCategories(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      myAxios
        .delete<CategoryGetDto[]>(`${API.monerate.category}/${id}`)
        .then((res) => {
          props.setCategories(res.data);
        });
    }
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          props.startNewCategory();
        }}
      >
        <Box display="flex" alignItems="center">
          <FontAwesomeIcon icon={faPlus} />
          <Box ml={1}>New category</Box>
        </Box>
      </Button>

      <Box mt={4} />
      {props.categories.length ? (
        <Paper>
          <Box p={2}>
            <Typography variant="h5">Categories</Typography>
            <Box mt={2} />
            <Grid container spacing={1}>
              {props.categories.map((category, index) => (
                <Grid key={category.id} item xs={12}>
                  <FlexVCenter>
                    <FlexVCenter>
                      <CategoryIcon category={category} />
                      <Box ml={2} width={200}>
                        {category.name}
                      </Box>
                    </FlexVCenter>
                    <FlexVCenter>
                      <IconButton
                        onClick={() => {
                          props.editCategory(category);
                        }}
                        aria-label="edit-category"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleDelete(category.id);
                        }}
                        aria-label="delete-category"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </FlexVCenter>
                  </FlexVCenter>
                </Grid>
              ))}
            </Grid>
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

  editCategory: (category: CategoryGetDto) =>
    dispatch(monerateActions.editCategory(category)),
  startNewCategory: () => dispatch(monerateActions.startNewCategory()),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CategorySettings);

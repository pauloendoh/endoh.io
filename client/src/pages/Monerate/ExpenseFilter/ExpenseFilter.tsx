import { Box, Paper, Typography, useTheme } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";
import MyTextField from "components/shared/MyInputs/MyTextField";
import CategoryGetDto from "dtos/monerate/CategoryDtos/CategoryGetDto";
import ExpenseGetDto from "dtos/monerate/ExpenseGetDto";
import PlaceGetDto from "dtos/monerate/PlaceGetDto";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "store/store";
import * as monerateActions from "../../../store/monerate/monerateActions";
import SelectCategoryInput from "../Inputs/SelectCategoryInput/SelectCategoryInput";
import SelectPlaceInput from "../Inputs/SelectPlaceInput/SelectPlaceInput";
import { IExpenseFilter } from "./IExpenseFilter";

const ExpenseFilter = (props: Props) => {
  // PE 3/3

  const theme = useTheme();
  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null);
  // 0.2s delay to avoid many action calls from slider

  const [filter, setFilter] = useState<IExpenseFilter>({
    placeId: null,
    minRating: 0,
    name: "",
    valueRange: [0, 1],
    categoryId: null,
  });

  useEffect(
    () => {
      setFilter({
        ...filter,
        valueRange: [0, getHighestExpenseValue(props.expenses)],
      });
      // Updating the max value for the slider
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.expenses]
  );

  const handleSetFilter = (filter: IExpenseFilter) => {
    setFilter(filter);

    clearTimeout(throttle);
    setThrottle(
      setTimeout(() => {
        props.setFilter(filter);
      }, 200)
    );
  };

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h5">Filters</Typography>

        <FlexVCenter mt={2}>
          <Box>
            <Typography component="legend">Place</Typography>
            <SelectPlaceInput
              value={filter.placeId}
              onChange={(e, value) => {
                const place = value as PlaceGetDto;
                handleSetFilter({ ...filter, placeId: place?.id });
              }}
            />
          </Box>

          <Box width={275} ml={2}>
            <Typography component="legend">Find by text</Typography>

            <MyTextField
              fullWidth
              value={filter.name}
              placeholder="Expense name or notes"
              InputProps={{ id: "expense-name-inner-input" }}
              onChange={(e) => {
                handleSetFilter({ ...filter, name: e.target.value });
              }}
            />
          </Box>
          {/* <Box ml={4} width={250}>
          <Typography component="legend">Value ($)</Typography>
          <Slider
            value={filter.valueRange}
            onChange={(e, newRange) => {
              handleSetFilter({
                ...filter,
                valueRange: newRange as number[],
              });
            }}
            valueLabelDisplay="auto"
            max={getHighestExpenseValue(props.expenses)}
            // maybe I don't want to keep calculating the highest all the time?

            marks={[
              { value: 0, label: "$0" },
              {
                value: getHighestExpenseValue(props.expenses),
                label: "$" + getHighestExpenseValue(props.expenses),
              },
            ]}
          />
        </Box> */}
          <Box ml={2}>
            <Typography component="legend">Min. Rating</Typography>
            <Rating
              name="min-rating"
              value={filter.minRating}
              onChange={(event, newMinRating) => {
                handleSetFilter({ ...filter, minRating: newMinRating });
              }}
            />
          </Box>
          <Box ml={2}>
            <Typography component="legend">Category</Typography>
            <SelectCategoryInput
              value={filter.categoryId}
              onChange={(e, value) => {
                const category = value as CategoryGetDto;
                handleSetFilter({ ...filter, categoryId: category?.id });
              }}
            />
          
          </Box>
        </FlexVCenter>
      </Box>
    </Paper>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  expenses: state.monerate.expenses,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilter: (filter: IExpenseFilter) =>
    dispatch(monerateActions.setFilter(filter)),
});

export const getHighestExpenseValue = (expenses: ExpenseGetDto[]): number => {
  let highest = 1;
  for (const e of expenses) {
    if (e.value > highest) {
      highest = e.value;
    }
  }
  return highest;
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilter);

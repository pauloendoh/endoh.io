import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "store/store";
import CategoryIcon from "../../components/shared/CategoryIcon";
import PlaceIcon from "../../components/shared/PlaceIcon";
import SoloRatingStar from "../../components/shared/SoloRatingStar";
import ExpenseGetDto from "../../dtos/monerate/ExpenseGetDto";
import * as monerateActions from "../../store/monerate/monerateActions";
import { ExpensesPerDay, getExpensesPerDay } from "./ExpensesPerDay";
// PE 3/3
const ExpenseList = (props: Props) => {
  const [expensesPerDay, setExpensesPerDay] = useState<ExpensesPerDay[]>([]);
  useEffect(() => {
    setExpensesPerDay(getExpensesPerDay(props.expenses));
  }, [props.expenses]);

  if (expensesPerDay.length) {
    return (
      <Paper>
        <Box p={2}>
          {expensesPerDay.map((day, index) => (
            <Box key={index}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography variant="h6">{day.dayString}</Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">
                    <NumberFormat
                      value={day.totalValue}
                      thousandSeparator
                      displayType="text"
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale={day.totalValue % 1 !== 0}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs></Grid>
                <Grid item xs></Grid>
              </Grid>
              {day.expenses.map((expense) => (
                <Button
                  key={expense.id}
                  onClick={() => {
                    props.editExpense(expense);
                  }}
                  fullWidth
                  style={{ textAlign: "inherit", fontWeight: "normal" }}
                >
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={3}>
                      {expense.place ? (
                        <FlexVCenter>
                          <PlaceIcon place={expense.place} />
                          <Box ml={1}>{expense.place.name}</Box>
                        </FlexVCenter>
                      ) : null}
                    </Grid>
                    <Grid item xs={2}>
                      {expense.name}
                    </Grid>

                    <Grid item xs={2}>
                      <Typography color="error">
                        <NumberFormat
                          value={expense.value}
                          thousandSeparator
                          displayType="text"
                          prefix="$"
                          decimalScale={2}
                          fixedDecimalScale={expense.value % 1 !== 0}
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="h6">
                        <Flex justifyContent="flex-end">
                          <SoloRatingStar
                            value={expense.rating}
                            color="#ffb400"
                          />
                        </Flex>
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      {expense.category ? (
                        <FlexVCenter key={expense.category.id}>
                          <CategoryIcon category={expense.category} />
                          <Box ml={1}>{expense.category.name}</Box>
                        </FlexVCenter>
                      ) : null}
                    </Grid>
                    <Grid item xs>
                      {expense.description}
                    </Grid>
                  </Grid>
                </Button>
              ))}

              {index < expensesPerDay.length - 1 ? (
                <Box pt={2} pb={1}>
                  <Divider light />
                </Box>
              ) : null}
            </Box>
          ))}
        </Box>
      </Paper>
    );
  } else {
    return null;
  }
};

interface OwnProps {
  expenses: ExpenseGetDto[];
}

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editExpense: (expense: ExpenseGetDto) =>
    dispatch(monerateActions.editExpense(expense)),
});

type Props = OwnProps &
  React.ComponentProps<typeof Paper> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);

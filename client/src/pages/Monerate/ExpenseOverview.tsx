import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  makeStyles,
  Paper,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

import FlexYCenter from "../../components/shared/Flexboxes/FlexVCenter";
import ExpenseGetDto from "../../dtos/monerate/ExpenseGetDto";
import StarRateIcon from "@material-ui/icons/StarRate";

const ExpenseOverview = (props: Props) => {
  const classes = useStyle();
  const theme = useTheme();

  const [overview, setOverview] = useState<IExpenseOverview>(
    getExpensesOverview(props.expenses)
  );

  useEffect(() => {
    setOverview(getExpensesOverview(props.expenses));
  }, [props.expenses]);

  return (
    <FlexYCenter>
      <Paper>
        <Box p={2}>
          <Typography variant="h6"># Expenses</Typography>
          <Typography variant="h4">{overview.count}</Typography>
        </Box>
      </Paper>

      <Box mx={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6">Total Cost</Typography>
            <Typography variant="h4">
              <NumberFormat
                value={overview.totalValue}
                thousandSeparator
                displayType="text"
                prefix="$"
                decimalScale={2}
                fixedDecimalScale={overview.totalValue % 1 !== 0}
              />
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Paper>
        <Box p={2}>
          <Typography variant="h6">Avg. Rating</Typography>
          <Typography variant="h4">
            <FlexYCenter>
              <Box>{overview.avgRating}</Box>

              <FontAwesomeIcon
                icon={faStar}
                color={theme.palette.secondary.main}
                size={"sm"}
                className={classes.starIcon}
              />
            </FlexYCenter>
          </Typography>
        </Box>
      </Paper>
    </FlexYCenter>
  );
};

const useStyle = makeStyles((theme: Theme) => ({
  starIcon: {
    marginLeft: 5,
    marginBottom: 5,
  },
}));

interface IExpenseOverview {
  count: number;
  totalValue: number;
  avgRating: number;
}

const getExpensesOverview = (expenses: ExpenseGetDto[]) => {
  let avg =
    expenses.reduce((sum, expense) => sum + expense.rating, 0) /
    expenses.length;
  if (isNaN(avg)) {
    avg = 0;
  } else {
    avg = Number(avg.toFixed(1));
  }

  return {
    count: expenses.length,
    totalValue: expenses.reduce((sum, expense) => sum + expense.value, 0),
    avgRating: avg,
  };
};

interface OwnProps {
  expenses: ExpenseGetDto[];
}
type Props = OwnProps;

export default ExpenseOverview;

import { Box, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "store/store";
import myAxios from "utils/myAxios";
import CategoryGetDto from "../../../dtos/monerate/CategoryDtos/CategoryGetDto";
import ExpenseGetDto from "../../../dtos/monerate/ExpenseGetDto";
import PlaceGetDto from "../../../dtos/monerate/PlaceGetDto";
import * as monerateActions from "../../../store/monerate/monerateActions";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import { getFilteredExpenses } from "../ExpenseFilter/IExpenseFilter";
import ExpenseList from "../ExpenseList";
import ExpenseOverview from "../ExpenseOverview";
import EditCategoryModal from "../Modals/EditCategoryModal";
import EditExpenseModal from "../Modals/EditExpenseModal";
import EditPlaceModal from "../Modals/EditPlaceModal";

// PE 3/3
const MoneratePage = (props: Props) => {
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseGetDto[]>([]);

  useEffect(
    () => {
      document.title = "Monerate";

      myAxios.get<ExpenseGetDto[]>("/monerate/expense/").then((res) => {
        props.setExpenses(res.data);
      });

      myAxios.get<PlaceGetDto[]>("/monerate/place").then((res) => {
        props.setPlaces(res.data);
      });

      myAxios.get<CategoryGetDto[]>("/monerate/category").then((res) => {
        props.setCategories(res.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setFilteredExpenses(getFilteredExpenses(props.filter, props.expenses));
  }, [props.expenses, props.filter]);

  return (
    <Container>
      <Box mt={4}></Box>

      <EditExpenseModal />

      <Box mt={3}>
        <ExpenseFilter />
      </Box>

      <Box mt={3}>
        <ExpenseOverview expenses={filteredExpenses} />
      </Box>

      <Box mt={3}>
        <ExpenseList expenses={filteredExpenses} />
      </Box>

      <EditPlaceModal />
      <EditCategoryModal />
    </Container>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
  expenses: state.monerate.expenses,
  filter: state.monerate.filter,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setExpenses: (expenses: ExpenseGetDto[]) =>
    dispatch(monerateActions.setExpenses(expenses)),
  setPlaces: (places: PlaceGetDto[]) =>
    dispatch(monerateActions.setPlaces(places)),
  setCategories: (categories: CategoryGetDto[]) =>
    dispatch(monerateActions.setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoneratePage);

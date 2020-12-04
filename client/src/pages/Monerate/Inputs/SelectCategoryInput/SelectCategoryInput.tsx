import { Box, Typography } from "@material-ui/core";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason
} from "@material-ui/lab";
import CategoryIcon from "components/shared/CategoryIcon";
import FlexHCenter from "components/shared/Flexboxes/FlexHCenter";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";
import MyTextField from "components/shared/MyInputs/MyTextField";
import CategoryGetDto from "dtos/monerate/CategoryDtos/CategoryGetDto";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "store/store";
import * as monerateActions from "../../../../store/monerate/monerateActions";

const SelectCategoryInput: React.FC<Props> = (props) => {
  const initialCategory = props.value
    ? props.categories.find((p) => p.id === props.value)
    : null;

  const [value, setValue] = useState<CategoryGetDto>(initialCategory);

  return (
    <Box>
      <Autocomplete
        id="select-category-input"
        value={value}
        options={[
          ...props.categories,
          {
            id: null,
            userId: 0,
            name: "+ New category",
            icon: "",
            bgColor: "",
            createdAt: "",
            updatedAt: "",
          },
        ]}
        renderOption={(option) => (
          <FlexVCenter>
            {option.id ? (
              <FlexVCenter>
                <Box minWidth={30}>
                  <CategoryIcon category={option} />
                </Box>
                <Box ml={1}>
                  <Typography variant="body2">{option.name}</Typography>
                </Box>
              </FlexVCenter>
            ) : (
              <FlexHCenter>{option.name}</FlexHCenter>
            )}
          </FlexVCenter>
        )}
        getOptionLabel={(option) => option.name}
        style={{ width: 200 }}
        renderInput={(params) => (
          <MyTextField {...params} placeholder="e.g.: Grocery" size="small" />
        )}
        onChange={(e, value) => {
          const selectedCategory = value as CategoryGetDto;
          if (selectedCategory && selectedCategory.id === null) {
            props.startNewCategory();
          } else {
            setValue(selectedCategory);
            props.onChange(e, selectedCategory, null);
          }
        }}
      />
    </Box>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  categories: state.monerate.categories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCategories: (categories: CategoryGetDto[]) =>
    dispatch(monerateActions.setCategories(categories)),

  startNewCategory: () => dispatch(monerateActions.startNewCategory()),
});

interface OwnProps {
  value: number;
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown>
  ) => void;
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCategoryInput);

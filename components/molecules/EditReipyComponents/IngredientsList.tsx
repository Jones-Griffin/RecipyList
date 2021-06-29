import React, { FC } from "react";
import styled from "styled-components";

const FormIM = styled.textarea`
  padding: 8px 10px;
  padding-bottom: 0;
  // margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid black;
  background-color: #f8f8f8;
  resize: none;
  max-width: 366px;
  width: 100%;
  line-height: 15px;
`;

const ListIM = styled.li`
  margin: 12px 0;
`;

interface Props {
  ingredientsList: string[];
  updateIngredientsList: (list: string[]) => void;
}
export const IngredientsList: FC<Props> = ({
  ingredientsList,
  updateIngredientsList,
}) => {
  const ingredients = ingredientsList;

  if (ingredients.length === 0 || !!ingredients[ingredients.length - 1]) {
    ingredients.push("");
  }

  const updateIngredients = (value: string, index) => {
    ingredients[index] = value;
    updateIngredientsList(ingredients);
  };

  const deleteIng = (index) => {
    if (!ingredients[index]) {
      ingredients.splice(index, 1);
      updateIngredientsList(ingredients);
    }
  };

  return (
    <>
      {ingredients.map((ing, i) => (
        <ListIM key={i}>
          <FormIM
            name={i}
            value={ing}
            onBlur={() => deleteIng(i)}
            onChange={({ currentTarget }) =>
              updateIngredients(currentTarget.value, i)
            }
          />
        </ListIM>
      ))}
    </>
  );
};

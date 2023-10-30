import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { makeStyles } from 'tss-react/mui';

import { DisplayedIngredient } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useDispatch } from 'react-redux';

const containerStyles = makeStyles()(() => {
  return {
    container: {
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      background: 'gray',
      opacity: 0.4,
    },
    overlayActivated: {
      zIndex: 1,
    },
    overlayUnactivated: {
      zIndex: -1,
    },
  };
});

function IngredientItem({ displayedIngredient: { name, amount, label, ...rest } }: { displayedIngredient: DisplayedIngredient }) {
  const { classes } = containerStyles();
  const dispatch = useDispatch();
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const currentModuleContext = useContext(CurrentModuleContext);
  const { removeIngredient } = useMealBuilderSlicers(currentModuleContext.currentModule);

  const deleteIngredientHandlder = () => {
    dispatch(removeIngredient({ ingredientType: rest.ingredientType, name }));
  };
  return (
    <>
      <StyledTableRow key={name} classes={{ root: classes.container }}>
        <StyledTableCell
          style={{ opacity: displayOverlay ? 0.8 : 1 }}
          onMouseEnter={() => {
            setDisplayOverlay(true);
          }}
          align="right"
        >
          {amount} {`${label}${amount > 1 ? 's' : ''}`}
        </StyledTableCell>
        <StyledTableCell
          style={{ opacity: displayOverlay ? 0.8 : 1 }}
          onMouseEnter={() => {
            setDisplayOverlay(true);
          }}
          component="th"
          scope="row"
        >
          {name}
        </StyledTableCell>
        <StyledTableCell
          style={{ opacity: displayOverlay ? 0.8 : 1 }}
          onMouseEnter={() => {
            setDisplayOverlay(true);
          }}
          align="right"
        >
          {rest.protein}
        </StyledTableCell>
        <StyledTableCell
          style={{ opacity: displayOverlay ? 0.8 : 1 }}
          onMouseEnter={() => {
            setDisplayOverlay(true);
          }}
          align="right"
        >
          {rest.carbs}
        </StyledTableCell>
        <StyledTableCell
          style={{ opacity: displayOverlay ? 0.8 : 1 }}
          onMouseEnter={() => {
            setDisplayOverlay(true);
          }}
          align="right"
        >
          {rest.fat}
        </StyledTableCell>
        <StyledTableCell
          style={{ opacity: displayOverlay ? 0.8 : 1 }}
          onMouseEnter={() => {
            setDisplayOverlay(true);
          }}
          align="right"
        >
          {rest.calories}
        </StyledTableCell>
        <td
          style={{
            zIndex: displayOverlay ? 1 : -1,
          }}
          onMouseLeave={() => {
            setDisplayOverlay(false);
          }}
          className={classes.overlay}
        >
          <DeleteIcon onClick={deleteIngredientHandlder} />
        </td>
      </StyledTableRow>
    </>
  );
}

export default IngredientItem;

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
      <StyledTableRow
        key={name}
        classes={{ root: classes.container }}
        onMouseEnter={() => {
          setDisplayOverlay(true);
        }}
        onMouseLeave={() => {
          setDisplayOverlay(false);
        }}
        style={{ opacity: displayOverlay ? 0.8 : 1 }}
      >
        <StyledTableCell align="left">
          {amount} {`${label}${amount > 1 ? 's' : ''}`}
        </StyledTableCell>
        <StyledTableCell align="left" component="th" scope="row">
          {name}
        </StyledTableCell>
        <StyledTableCell align="left">{rest.protein}</StyledTableCell>
        <StyledTableCell align="left">{rest.carbs}</StyledTableCell>
        <StyledTableCell align="left">{rest.fat}</StyledTableCell>
        <StyledTableCell align="left">{rest.calories}</StyledTableCell>
        <td
          style={{
            zIndex: displayOverlay ? 1 : -1,
            display: 'flex',
            justifyContent: 'end',
            paddingRight: '4px',
          }}
          className={classes.overlay}
        >
          <DeleteIcon
            style={{
              marginTop: '0.6%',
              display: 'block',
              cursor: 'pointer',
            }}
            onClick={deleteIngredientHandlder}
          />
        </td>
      </StyledTableRow>
    </>
  );
}

export default IngredientItem;

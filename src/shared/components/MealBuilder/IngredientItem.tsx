import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { makeStyles } from 'tss-react/mui';
import { DisplayedIngredient } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { useDispatch } from 'react-redux';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';
import EnablerEditionWrapper from 'src/shared/components/wrappers/EnablerEditionWrapper/EnablerEditionWrapper';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import CheckAndCloseIcons from 'src/shared/components/Icons/CheckAndCloseIcons';
import IngredientAmountEditor from 'src/shared/components/MealBuilder/IngredientAmountEditor';

const containerStyles = makeStyles()(() => {
  return {
    container: {
      position: 'relative',
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
  const [editAmount, setEditAmount] = useState(false);
  const [isSavedNewAmount, setIsSavedNewAmount] = useState(false);
  const currentModuleContext = useContext(CurrentModuleContext);
  const enableEditionContext = useContext(EnableEditionContext);
  const { removeIngredient } = useMealBuilderSlicers(currentModuleContext.currentModule);

  const deleteIngredientHandlder = () => {
    dispatch(removeIngredient({ ingredientType: rest.ingredientType, name }));
  };
  const editAmountHandler = () => {
    setEditAmount(true);
  };
  const editionAmountFinishedHandler = () => {
    setEditAmount(false);
  };
  const saveNewAmountHandler = () => {
    setEditAmount(false);
    setIsSavedNewAmount(true);
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
          <IngredientAmountEditor
            editAmount={editAmount}
            isSavedNewAmount={isSavedNewAmount}
            setIsSavedNewAmount={setIsSavedNewAmount}
            name={name}
            amount={amount}
            label={label}
          />
        </StyledTableCell>
        <StyledTableCell align="left" component="th" scope="row">
          {name}
        </StyledTableCell>
        <StyledTableCell align="left">{rest.protein} g</StyledTableCell>
        <StyledTableCell align="left">{rest.carbs} g</StyledTableCell>
        <StyledTableCell align="left">{rest.fat} g</StyledTableCell>
        <StyledTableCell align="left">{rest.calories} cal</StyledTableCell>
        <StyledTableCell align="left" width={'10%'}>
          <EnablerEditionWrapper enableEdition={enableEditionContext.enableEdition}>
            {!editAmount ? (
              <Box style={{ display: 'flex', width: '100%', opacity: 0.7 }}>
                <EditIcon
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={editAmountHandler}
                />
                <DeleteIcon
                  style={{
                    marginLeft: '25%',
                    display: 'block',
                    cursor: 'pointer',
                  }}
                  onClick={deleteIngredientHandlder}
                />
              </Box>
            ) : (
              <CheckAndCloseIcons checkHandler={saveNewAmountHandler} closeHandler={editionAmountFinishedHandler} />
            )}
          </EnablerEditionWrapper>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default IngredientItem;

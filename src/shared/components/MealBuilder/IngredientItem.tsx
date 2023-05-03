import React, { useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import { makeStyles } from 'tss-react/mui';

import { EndIngredient } from 'src/shared/components/MealBuilder/MealBuilder.types';

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

function IngredientItem({ endIngredient: { name, amount, label, ...rest } }: { endIngredient: EndIngredient }) {
  const { classes } = containerStyles();
  const [displayOverlay, setDisplayOverlay] = useState(false);
  // const refDiv = useRef<HTMLDivElement>(null);
  /*

  useEffect(() => {
    if (displayOverlay) refDiv.current?.style.setProperty('zIndex', '2');
    console.log('-------displayOverlay', displayOverlay);
  }, [displayOverlay]); */

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
          <DeleteIcon />
        </td>
      </StyledTableRow>
    </>
  );
}

export default IngredientItem;

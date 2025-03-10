import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CookingInstructions from 'src/shared/components/MealBuilder/CookingInstructions';

import IngredientList from 'src/shared/components/MealBuilder/IngredientList';
import { MealDataForBuilder } from 'src/shared/components/MealBuilder/MealBuilder.types';
import FoodList from 'src/shared/components/MealBuilder/FoodList';

// VERY IMPORTANT: this component is used (shared) in nutritional-meals, program and patient-plan modules
function MealBuilder({ meal }: { meal: MealDataForBuilder }) {
  const [panelExpanded, setPanelExpanded] = useState<string | false>(false);

  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };

  return (
    <>
      <IngredientList meal={meal} />
      <FoodList />

      <Accordion expanded={panelExpanded === 'panel1'} onChange={handleAccordion('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ height: '38px' }} aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="subtitle1">Cooking instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CookingInstructions cookingInstructions={meal.cookingInstructions} />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default MealBuilder;

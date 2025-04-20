import React, { useContext, useState } from 'react';
import { Typography } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/components/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CookingInstructions from 'src/shared/components/MealBuilder/CookingInstructions';

import IngredientList from 'src/shared/components/MealBuilder/IngredientList';
import { MealDataForBuilder } from 'src/shared/components/MealBuilder/MealBuilder.types';
import FoodList from 'src/shared/components/MealBuilder/FoodList';
import EnablerEditionWrapper from 'src/shared/components/wrappers/EnablerEditionWrapper/EnablerEditionWrapper';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';
import { Modules } from 'src/shared/Consts';

// VERY IMPORTANT: this component is used (shared) in nutritional-meals, program and patient-plan modules
function MealBuilder({ meal }: { meal: MealDataForBuilder }) {
  const [panelExpanded, setPanelExpanded] = useState<string | false>('panel1');
  const currentModuleContext = useContext(CurrentModuleContext);
  const enableEditionContext = useContext(EnableEditionContext);

  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, newPanelExpanded: boolean) => {
    setPanelExpanded(newPanelExpanded ? panel : false);
  };

  return (
    <>
      <IngredientList meal={meal} />
      <EnablerEditionWrapper
        enableEdition={
          currentModuleContext.currentModule === Modules.PROGRAMS ||
          currentModuleContext.currentModule === Modules.CLIENT_PLANS ||
          (currentModuleContext.currentModule === Modules.NUTRITIONAL_MEALS && enableEditionContext.enableEdition)
        }
      >
        <FoodList />
      </EnablerEditionWrapper>

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

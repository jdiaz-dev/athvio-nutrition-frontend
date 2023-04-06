import React from 'react';
import { Plan } from 'src/modules/professionals/programs/adapters/out/program.types';

function PlanBasicInformation({ plan }: { plan: Plan }) {
  console.log('--------plan', plan);
  return <div>PlanBasicInformation</div>;
}

export default PlanBasicInformation;

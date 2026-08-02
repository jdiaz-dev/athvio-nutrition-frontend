import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { List } from '@mui/material';
import MealDetail from 'src/shared/components/PlanDetailDialog/MealDetail';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { ReduxItemtatus } from 'src/shared/Consts';
import { Subject } from 'rxjs';
import { useMealListSlicers } from 'src/shared/hooks/useMealListSlicers';
import { useMealsStates } from 'src/shared/components/PlanDetailDialog/useMealsStates';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const savedPlanButton = new Subject<boolean>();
export const savedPlanButton$ = savedPlanButton.asObservable();

function MealList() {
  const currentModuleContext = useContext(CurrentModuleContext);
  const dispatch = useDispatch();
  const { reorderMeals } = useMealListSlicers(currentModuleContext.currentModule);
  const { mealListState } = useMealsStates(currentModuleContext.currentModule);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEndOrdering(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = mealListState.findIndex((item) => item.uuid === active.id);
      const newIndex = mealListState.findIndex((item) => item.uuid === over.id);
      dispatch(reorderMeals({ oldIndex: oldIndex, newIndex: newIndex }));
      return arrayMove(mealListState, oldIndex, newIndex);
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndOrdering}>
      <SortableContext
        items={mealListState.filter((meal) => meal.status != ReduxItemtatus.DELETED).map((meal) => meal.uuid)}
        strategy={verticalListSortingStrategy}
      >
        <List>
          {mealListState
            .filter((meal) => meal.status != ReduxItemtatus.DELETED)
            .map((meal, index) => (
              <MealDetail key={index} meal={meal} />
            ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default MealList;

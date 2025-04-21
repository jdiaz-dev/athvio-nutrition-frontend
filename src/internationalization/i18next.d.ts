import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: {
        navbar: {
          patients: string;
          meals: string;
          programs: string;
        };
        patientModule: {
          buttons: {
            newPatient: string;
            addToGroup: string;
            options: string;
          };
          groups: {
            manageGroups: string;
            createNewGroup: string;
            editExsistingGroup: string;
          };
          state: {
            activatedState: string;
            archivedState: string;
            activateAction: string;
            archiveAction: string;
          };
          table: {
            name: string;
            state: string;
            group: string;
          };
          titles: {
            patients: string;
          };
        };
        programsModule: {
          buttons: {
            createNewProgram: string;
            assignProgram: string;
            editProgram: string;
            deleteProgram: string;
            addWeek: string;
          };
          table: {
            name: string;
            description: string;
          };
          titles: {
            programs: string;
            selectedPatients: string;
            assigmentStartDay: string;
            startingDay: string;
            day: string;
          };
        };
        mealBuilder: {
          table: {
            name: string;
            food: string;
            proteins: string;
            carbs: string;
            fats: string;
            calories: string;
          };
          titles: {
            tag: string;
            addFodd: string;
            cookingInstructions: string;
            importMeal: string;
          };
        };
      };
    };
  }
}

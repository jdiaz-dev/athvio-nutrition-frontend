import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: {
        navbar: {
          patients: string;
          meals: string;
          programs: string;
          preferences: string;
          logout: string;
          spanishLanguage: string;
          englishLanguage: string;
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
            removeWeek: string;
          };
          table: {
            name: string;
            description: string;
          };
          titles: {
            programs: string;
            selectedPatients: string;
            assigmentStartDate: string;
            startingDay: string;
            day: string;
          };
        };
        mealBuilder: {
          table: {
            amount: string;
            name: string;
            food: string;
            proteins: string;
            carbs: string;
            fats: string;
            calories: string;
          };
          titles: {
            mealTag: string;
            addFodd: string;
            cookingInstructions: string;
            importMeal: string;
          };
          buttons: {
            addMeal: string;
            deleteMeal: string;
          };
          mealTags: {
            breakfast: string;
            lunch: string;
            dinner: string;
            firstMeal: string;
            secondMeal: string;
            thirdMeal: string;
          };
        };
        toolTips: {
          chat: string;
          plans: string;
          calories: string;
          add: string;
          paste: string;
          copy: string;
          delete: string;
          drag: string;
          importMeal: string;
          options: string;
        };
      };
    };
  }
}

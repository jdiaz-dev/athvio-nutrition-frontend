import i18n from 'src/internationalization/i18n';
import { DefaultConfigProps, MenuOrientation, ThemeDirection, ThemeMode } from 'src/shared/types/config';

export const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1/all?fields=name,idd,flags';
export const baseHeight = 150;
export const baseWeek = 1;
export const temporalId = 'temporalId';

export const defaultMealTagKey = i18n.t('mealBuilder.mealTags.breakfast');
export const mealTagKeyList = [
  'mealBuilder.mealTags.drink',
  'mealBuilder.mealTags.breakfast',
  'mealBuilder.mealTags.lunch',
  'mealBuilder.mealTags.dinner',
  'mealBuilder.mealTags.firstMeal',
  'mealBuilder.mealTags.secondMeal',
  'mealBuilder.mealTags.thirdMeal',
  'mealBuilder.mealTags.fourthMeal',
  'mealBuilder.mealTags.fifthMeal',
];

export enum LocalStorageEnum {
  dataUser = 'dataUser',
  authenticated = 'authenticated',
}

export enum InvalidCountries {
  ANTARTICA = 'Antarctica',
  INVALID_ISLANDS = 'Heard Island and McDonald Islands',
}

export enum MessagesUserForm {
  EMAIL_VALID = 'Please enter an valid email',
  EMAIL_MANDATORY = 'Please enter an email',
  PASSWORD_MANDATORY = 'Please enter a password',
  FIRSTNAME_MANDATORY = 'Please enter your first name',
  LASTNAME_MANDATORY = 'Please enter your last name',
  PHONE_MANDATORY = 'Please enter a phone number',
  COUNTRY_MANDATORY = 'Please enter a country',
  BUSSINES_NAME_MANDATORY = 'Please enter your bussines name',
}

export enum ProgramMessages {
  REMOVE_PLAN = 'Are you sure to delete this plan?',
}

export enum UserType {
  PROFESSIONAL = 'professional',
  CLIENT = 'patient',
}

export enum ManagePatientGroupEnum {
  ADD = 'add',
  REMOVE = 'remove',
}

export enum Modules {
  CLIENTS = 'patients',
  PROGRAMS = 'programs',
  NUTRITIONAL_MEALS = 'meals',
  CLIENT_PLANS = 'patientPlans',
}

export enum WeekActions {
  READY = 'ready',
  ADD = 'add',
  REMOVE = 'remove',
  NEUTRAL = 'neutral',
}

export enum SpecialPagination {
  FIRST_PAGE_SIMULATION = 0,
  ALLOWED_OFFSET_LIMIT = 15,
  OFFSET_RESETED = 0,
  LIMIT_RECORDS_IN_MEMORY = 20,
  TOTAL_NEXT_RECORDS = 20,
  // rowsPerPageForDefaultDB = 20;
}

export enum MeasureSizes {
  GRAM_LABEL_ENGLISH = 'Gram',
  GRAM_LABEL_SPANISH = 'Gramos',
  GRAM_AMOUNT = 100,
  NORMAL_AMOUNT = 1,
}

export enum IngredientType {
  CUSTOM_INGREDIENT = 'CUSTOM_INGREDIENT',
  UNIQUE_INGREDIENT = 'UNIQUE_INGREDIENT',
}

export enum FoodDatabases {
  SYSTEM = 'SYSTEM',
}
export enum PatientStates {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export enum PatientStatesActions {
  ACTIVATE = 'activate',
  ARCHIVE = 'archive',
}

export enum MessagesForOkDialog {
  PROGRAM_ASSIGNED = 'Program assignment queued!',
}

export enum ReduxItemtatus {
  INITIALIZED = 'initialized',
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}

export enum NutriBuilderParamStatus {
  SELECTED = 'SELECTED',
  UNSELECTED = 'UNSELECTED',
  INITIALIZED = 'INITIALIZED',
}

export enum ThemeEnum {
  DRAWER_WIDTH = 260,
  HORIZONTAL_MAX_ITEM = 7,
}

export const themeConfig: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  menuOrientation: MenuOrientation.VERTICAL,
  miniDrawer: false,
  container: true,
  mode: ThemeMode.DARK,
  presetColor: 'theme8',
  themeDirection: ThemeDirection.LTR,
};

export enum NutritionalMealDatabasesEnum {
  ALL = 'ALL',
  SYSTEM = 'SYSTEM',
  CUSTOM_MEALS = 'CUSTOM MEALS',
}

export enum DatabasesEnum {
  FOODS = 'FOODS',
  NUTRITIONAL_MEALS = 'NUTRITIONAL_MEALS',
}

export enum MealSourceEnum {
  SYSTEM = 'SYSTEM',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum CustomFieldsGroupNamesEnum {
  CUSTOMIZED = 'Customized',
  PERSONALIZADO = 'Personalizado',
}

export enum SupportedLanguages {
  ENGLISH = 'en',
  SPANISH = 'es',
}

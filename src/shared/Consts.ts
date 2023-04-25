export const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1/all?fields=name,idd,flags';
export const EDAMAN_ANALISIS_NUTRITION_DATA = 'https://api.edamam.com/api/nutrition-data';
export const EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID = '61502c72';
export const EDAMAN_ANALISIS_APP_KEY = '90b651fc4688ed9c7ea8754afd766b1a';

export const baseHeight = 150;
export const baseWeek = 1;

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

/* export enum CustomRecipeMessages {
  CREATED = 'Custom Recipe created successfully',
  UPDATED = 'Custom Recipe updated successfully',
} */

export enum UserType {
  PROFESSIONAL = 'professional',
  CLIENT = 'client',
}

export enum ManageClientGroupEnum {
  ADD = 'add',
  REMOVE = 'remove',
}

export enum Modules {
  PROGRAMS = 'programs',
  CUSTOM_RECIPES = 'customRecipes',
  CLIENT_PLANS = 'clientPlans',
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
  DEFAULT_DATABASE = 'ALL',
  SYSTEM_DATABASE = 'SYSTEM',
  OFFSET_RESETED = 0,
  LIMIT_RECORDS_IN_MEMORY = 20,
  TOTAL_NEXT_RECORDS = 20,
  // rowsPerPageForDefaultDB = 20;
}

export enum IngredientType {
  CUSTOM_INGREDIENT = 'CUSTOM_INGREDIENT',
  UNIQUE_INGREDIENT = 'UNIQUE_INGREDIENT',
}

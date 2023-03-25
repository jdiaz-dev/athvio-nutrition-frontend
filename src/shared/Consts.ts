export const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1/all?fields=name,idd,flags';
export const EDAMAN_ANALISIS_NUTRITION_DATA = 'https://api.edamam.com/api/nutrition-data';
export const EDAMAN_ANALISIS_NUTRITION_DATA_APP_ID = '61502c72';
export const EDAMAN_ANALISIS_APP_KEY = '90b651fc4688ed9c7ea8754afd766b1a';

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

export enum UserType {
  PROFESSIONAL = 'professional',
  CLIENT = 'client',
}

export enum ManageClientGroupEnum {
  ADD = 'add',
  REMOVE = 'remove',
}

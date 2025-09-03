/**
 * Password validator for login pages
 */
export interface StringColorProps {
  id?: string;
  label?: string;
  color?: string;
  primary?: string;
  secondary?: string;
}

export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;

// has number
const hasNumber: StringBoolFunc = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed: StringBoolFunc = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial: StringBoolFunc = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor: NumbColorFunc = (count) => {
  if (count < 2) return { label: 'Muy débil', color: 'error.main' };
  if (count < 3) return { label: 'Débil', color: 'warning.main' };
  if (count < 4) return { label: 'Normal', color: 'warning.dark' };
  if (count < 5) return { label: 'Bueno', color: 'success.main' };
  if (count < 6) return { label: 'Fuerte', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator: StringNumFunc = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

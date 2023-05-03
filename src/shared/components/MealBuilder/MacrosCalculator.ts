export const calculateMacrosFixingDecimals = (amount: number, amountReference: number, macroReference: number) => {
  const res =
    Math.round(
      (((Math.round(amount * 100) / 100) * (Math.round(macroReference * 100) / 100)) / Math.round((amountReference * 100) / 100)) * 100,
    ) / 100;

  return res;
};
export const multiplicateFixingDecimals = (amount1: number, amount2: number) => {
  const res = Math.round((Math.round(amount1 * 100) / 100) * (Math.round(amount2 * 100) / 100) * 100) / 100;
  return res;
};

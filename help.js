function calculateMacrosFixingDecimals(amount, amountReference, macroReference) {
  console.log('------res**', amount, amountReference, macroReference);
  const res =
    Math.round(
      (((Math.round(amount * 100) / 100) * (Math.round(macroReference * 100) / 100)) / Math.round((amountReference * 100) / 100)) * 100,
    ) / 100;

  console.log('------res pro', res);

  return res;
}

calculateMacrosFixingDecimals(28.35, 100, 0.85);
// calculateMacrosFixingDecimals(14.2, 100, 0.85);
const res = Math.round((Math.round(5.3 * 10) / 10 / (Math.round(0.1 * 10) / 10)) * 10) / 10;
// console.log('------res pro', res);

export const goToPayment = (payment: string) => {
  window.location.href = `${process.env.PAYMENT_URL}?reference_id=${payment}`;
};

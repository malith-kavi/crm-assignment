const lkrFormatter = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
  maximumFractionDigits: 0,
});

export const formatLkrCurrency = (value) => {
  const amount = Number(value);
  return lkrFormatter.format(Number.isFinite(amount) ? amount : 0);
};

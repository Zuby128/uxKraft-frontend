export const calculatePriceWithMarkupAndVAT = (
  unitPrice: number,
  markupPercentage: string
): number => {
  const markup = parseFloat(markupPercentage);

  if (isNaN(markup) || markup < 0) {
    throw new Error(`Geçersiz markup yüzdesi: ${markupPercentage}`);
  }

  const priceWithMarkup = unitPrice + (unitPrice * markup) / 100;

  return priceWithMarkup / 100;
};

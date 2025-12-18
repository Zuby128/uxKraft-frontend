const formatPrice = (
  price: number | string | undefined | null,
  options?: Intl.NumberFormatOptions
): string => {
  if (price === undefined || price === null || price === "") {
    return "-";
  }

  const num = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(num)) {
    return "-";
  }

  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  return num.toLocaleString("en-US", { ...defaultOptions, ...options });
};

export default formatPrice;

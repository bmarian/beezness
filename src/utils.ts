const numberFormater = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
})
export const scientificFormat = (value: number): string => {
  if (value < 1000000) return numberFormater.format(value)
  return value.toExponential(2)
}

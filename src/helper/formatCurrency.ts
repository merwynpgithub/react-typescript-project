const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency"
})

function formatCurrency(num: number) {
  return CURRENCY_FORMATTER.format(num)
}

export default formatCurrency
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateDiscount(wasPrice: number, nowPrice: number): number {
  if (!wasPrice || wasPrice <= nowPrice) return 0;
  return Math.round(((wasPrice - nowPrice) / wasPrice) * 100);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPropertyType(type: string): string {
  return type.charAt(0) + type.slice(1).toLowerCase();
}
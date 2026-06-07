export const price = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
}); // price.format(Number(...));

export const priceCompact = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
}); // priceCompact.format(Number(...));

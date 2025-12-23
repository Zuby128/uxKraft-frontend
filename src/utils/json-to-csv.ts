export function mapOrderItemsToCsv(items: any[]) {
  return items.map((row) => ({
    itemId: row?.itemId,
    itemName: row?.itemName,
    specNo: row?.specNo,
    vendor: row.vendor?.vendorName,
    customer: row.customer?.name,
    quantity: row.quantity,
    phase: row.phase,
    totalPrice: row.totalPrice ? row.totalPrice / 100 : "",
    shipNotes: row.orderLogistics?.shippingNotes,
  }));
}

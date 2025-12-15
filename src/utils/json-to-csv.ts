export function mapOrderItemsToCsv(items: any[]) {
  return items.map((row) => ({
    orderItemId: row.orderItemId,
    itemId: row.item?.itemId,
    itemName: row.item?.itemName,
    specNo: row.item?.specNo,
    vendor: row.vendor?.vendorName,
    customer: row.customer?.name,
    quantity: row.quantity,
    phase: row.phase,
    totalPrice: row.totalPrice ? row.totalPrice / 100 : "",
    shipNotes: row.logistics?.shippingNotes,
  }));
}

const handlePurchase = async () => {
  if (!profile || !selectedProduct) return;

  const quantityNum = parseFloat(purchaseQuantity);

  if (
    isNaN(quantityNum) ||
    quantityNum <= 0 ||
    quantityNum > selectedProduct.quantity
  ) {
    alert("Invalid quantity");
    return;
  }

  const totalPrice =
    selectedProduct.farmer_price * quantityNum;

  try {
    // Save purchase
    const { error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        buyer_id: profile.id,
        product_id: selectedProduct.id,
        crop_name: selectedProduct.crop_name,
        quantity: quantityNum,
        total_price: totalPrice,
        status: "completed",
      });

    if (purchaseError) throw purchaseError;

    // Update remaining quantity
    const remainingQuantity =
      selectedProduct.quantity - quantityNum;

    const { error: updateError } = await supabase
      .from("products")
      .update({
        quantity: remainingQuantity,
        status:
          remainingQuantity <= 0
            ? "sold"
            : "available",
      })
      .eq("id", selectedProduct.id);

    if (updateError) throw updateError;

    // Add transaction record
    await supabase.from("transactions").insert({
      buyer_id: profile.id,
      farmer_id: selectedProduct.farmer_id,
      product_id: selectedProduct.id,
      crop_name: selectedProduct.crop_name,
      quantity: quantityNum,
      final_price: totalPrice,
      status: "completed",
    });

    alert("Purchase successful!");

    setShowPurchaseModal(false);
    setPurchaseQuantity("");
    setSelectedProduct(null);

    loadProducts();
    loadPurchases();
  } catch (error) {
    console.error(error);
    alert("Purchase failed");
  }
};

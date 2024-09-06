/* eslint-disable react/prop-types */
import { useState } from "react";
import products from "./../assets/productsLists";

const SelectProduct = ({ handleCloseModal }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});

  //console.log(selectedVariants);

  const handleProductChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelection = !prevSelectedProducts[productId];
      const updatedVariants = products
        .find((product) => product.id === productId)
        .variants.reduce((acc, variant) => {
          acc[variant.id] = newSelection;
          return acc;
        }, {});

      setSelectedVariants((prevSelectedVariants) => ({
        ...prevSelectedVariants,
        ...updatedVariants,
      }));
      return { ...prevSelectedProducts, [productId]: newSelection };
    });
  };

  const handleVariantChange = (variantId) => {
    setSelectedVariants((prevSelectedVariants) => {
      const newSelection = !prevSelectedVariants[variantId];
      const productId = products.find((product) =>
        product.variants.some((variant) => variant.id === variantId)
      ).id;

      const productVariants = products
        .find((product) => product.id === productId)
        .variants.reduce((acc, variant) => {
          acc[variant.id] = prevSelectedVariants[variant.id];
          return acc;
        }, {});

      const allVariantsSelected = Object.values(productVariants).every(Boolean);

      setSelectedProducts((prevSelectedProducts) => ({
        ...prevSelectedProducts,
        [productId]: allVariantsSelected,
      }));

      return { ...prevSelectedVariants, [variantId]: newSelection };
    });
  };

  return (
    <>
      <header>
        <p>Select Products</p>
        <div>
          <button onClick={handleCloseModal}>X</button>
        </div>
      </header>
      <section>
        <input type="search" placeholder="Search Product" />
      </section>
      <div className="products-list">
        {products.map((product) => (
          <div className="product-container" key={product.id}>
            {/* Product Checkbox */}
            <div className="checkbox-container">
              <input
                type="checkbox"
                id={`product-${product.id}`}
                name={`product-${product.id}`}
                checked={selectedProducts[product.id] || false}
                onChange={() => handleProductChange(product.id)}
              />
              <img src={product.image.src} alt={product.title} />
              <label htmlFor={`product-${product.id}`}>{product.title}</label>
            </div>

            {/* Render Variants if they exist */}
            {product.variants && product.variants.length > 0 && (
              <div className="variants-list">
                {product.variants.map((variant) => (
                  <div className="checkbox-container" key={variant.id}>
                    <input
                      type="checkbox"
                      id={`variant-${variant.id}`}
                      name={`variant-${variant.id}`}
                      checked={selectedVariants[variant.id] || false}
                      onChange={() => handleVariantChange(variant.id)}
                    />
                    <label htmlFor={`variant-${variant.id}`}>
                      {variant.title} - ${variant.price}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectProduct;

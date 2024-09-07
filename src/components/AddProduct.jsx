/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ProductForm.css";
import SelectProduct from "./SelectProduct";
import products from "./../assets/productsLists";
const AddProduct = ({ index, itemOfProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(itemOfProduct);

  const findProduct = (products, criteria) => {
    return products.find((product) => {
      // Check if product id matches
      if (product.id !== criteria.id) return false;

      // Check if all criteria variants are included in product variants
      const variantIds = product.variants.map((variant) => variant.id);
      const variantsMatch = criteria.variants.every((variantId) =>
        variantIds.includes(variantId)
      );

      return variantsMatch;
    });
  };

  const foundProduct = findProduct(products, itemOfProduct);
  console.log(foundProduct);

  // Function to handle modal open
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="add-product-form">
      <div className="form-group">
        {index === 0 && <label htmlFor="product-select">Product</label>}
        {/* <select onClick={handleOpenModal} id="product-select" name="product">
          <option value=""></option>
        </select> */}
        <input
          id="product-select"
          type="search"
          value={foundProduct?.title ? foundProduct?.title : "Select a product"}
          onClick={handleOpenModal}
        />
      </div>
      <div className="form-group">
        {index === 0 && <label htmlFor="discount">Discount</label>}

        <button type="button" id="discount">
          Add Discount
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <SelectProduct handleCloseModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};
export default AddProduct;

import { useState } from "react";
import "./ProductForm.css";
import SelectProduct from "./SelectProduct";
const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <label htmlFor="product-select">Product</label>
        {/* <select onClick={handleOpenModal} id="product-select" name="product">
          <option value=""></option>
        </select> */}
        <input
          id="product-select"
          type="search"
          value="Select a product"
          onClick={handleOpenModal}
        />
      </div>
      <div className="form-group">
        <label htmlFor="discount">Discount</label>
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

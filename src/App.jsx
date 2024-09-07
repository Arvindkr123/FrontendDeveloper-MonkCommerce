import { useState } from "react";
import AddProduct from "./components/AddProduct";
import { useAppContext } from "./context/AppContext";

function App() {
  const { products, setProducts } = useAppContext();
  const [showAddProduct, setShowAddProduct] = useState(false);

  const onDeleteProduct = (productId) => {
    // Update the products list by filtering out the product with the matching ID
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  //console.log(products);
  return (
    <>
      Add Products
      {products?.map((item, index) => (
        <div key={index}>
          <AddProduct
            index={index}
            itemOfProduct={item}
            onDeleteProduct={onDeleteProduct}
          />
        </div>
      ))}
      {products.length === 0 && (
        <AddProduct
          index={0}
          itemOfProduct={{}}
          onDeleteProduct={onDeleteProduct}
        />
      )}
      {showAddProduct && (
        <AddProduct
          index={1}
          itemOfProduct={{}}
          onDeleteProduct={onDeleteProduct}
        />
      )}
      <button
        onClick={() => setShowAddProduct((prev) => !prev)}
        className="add-product-btn"
      >
        Add Product
      </button>
    </>
  );
}

export default App;

import AddProduct from "./components/AddProduct";
import { useAppContext } from "./context/AppContext";

function App() {
  const { products } = useAppContext();
  //console.log(products);
  return (
    <>
      Add Products
      {products?.map((item, index) => (
        <div key={index}>
          <AddProduct index={index} itemOfProduct={item} />
        </div>
      ))}
      {products.length === 0 && <AddProduct index={0} itemOfProduct={{}} />}
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Navigation } from "../../common/nav/Navigation";
import products from "../../../data/products";

export const Home = () => {
  const [Listproducts, setListProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setListProducts(products);
  }, []);

  const renderProducts = Listproducts.map((product) => (
    <div className="container-products">
      <div className="body-products" key={product.id}>
        <h1>{product.product}</h1>
        <p>{product.price}</p>
      </div>
    </div>
  ));

  return (
    <>
      <Navigation />
      <h1>Bienvenido a la pagina de inicio</h1>
      <select
        onChange={(e) => {
          const optionSelected = e.target.value;
          if (optionSelected == "Precio mas bajo") {
            const ListCheapProducts = [...Listproducts].sort((a, b) => {
              return a.price - b.price;
            });
            setListProducts(ListCheapProducts);
          } else if (optionSelected == "Precio mas alto") {
            const expensiveProducts = [...Listproducts].sort((a, b) => {
              return b.price - a.price;
            });
            setListProducts(expensiveProducts);
          } else if (optionSelected == "Ordenado alfabeticamente") {
            const ordenedProducts = [...Listproducts].sort((a, b) => {
              return a.product.localeCompare(b.product);
            });
            setListProducts(ordenedProducts);
          }
        }}
      >
        <option value="Precio mas bajo">Precio mas bajo</option>
        <option value="Precio mas alto">Precio mas alto</option>
        <option value="Ordenado alfabeticamente">
          Ordenado alfabeticamente
        </option>
      </select>
      <input
        type="text"
        onChange={(e) => {
          setFilterProducts(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const searchProduct = products.filter((product) => {
            return product.product === filterProducts;
          });
          setListProducts(searchProduct);
        }}
      >
        Buscar producto
      </button>
      {Listproducts.length > 0 ? renderProducts : <h1>No hay productos</h1>}
    </>
  );
};

import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await response.json();
    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPage = (selectedPage) => {
    // setPages(e.target.innerText);
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) { setPages(selectedPage) }
  }

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {/* Front-end driven approach next line,collects all data but makes bit slow fronend ,so used backend driven approach */}
          {/* {products.slice(page * 10 - 10, page * 10).map((product) => { */}
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>);
          })}

        </div>
      )}

      {
        products.length > 0 && <div className="pagination">
          <span onClick={() => selectPage(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀️</span>
          {[...Array(totalPages)].map((_, i) => {
            return <span className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPage(i + 1)} key={i}>{i + 1}</span>
          })}
          <span onClick={() => selectPage(page + 1)} className={page < totalPages ? "" : "pagination__disable"}>▶️</span>
        </div>
      }
      {/* Frontend driven slight change in above code */}
      {/* {
        products.length > 0 && <div className="pagination">
          <span onClick={() => selectPage(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀️</span>
          {[...Array(products.length / 10)].map((_, i) => {
            return <span className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPage(i + 1)} key={i}>{i + 1}</span>
          })}
          <span onClick={() => selectPage(page + 1)} className={page < products.length / 10 ? "" : "pagination__disable"}>▶️</span>
        </div>
      } */}
    </div>
  );
}

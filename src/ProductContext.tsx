import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface IProductProvider {
  children: ReactNode;
}

interface IData {
  products: IProduct[];
}

interface IProduct {
  SKU: string;
  Name: string;
  Price: number;
  Type: string;
  Size: number | null;
  Weight: number | null;
  Dimension: string | null;
}

interface IProductContext {
  products: IProduct[];
}

const ProductContext = createContext({} as IProductContext);

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: IProductProvider) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/`)
      .then((res) => {
        console.log(res);
        const { products }: IData = res.data;
        setProducts(products);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

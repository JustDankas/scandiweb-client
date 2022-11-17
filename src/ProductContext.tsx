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
  // productCopies: IProductCopy[];
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
interface IProductCopy {
  ProductCopyId: number;
  ProductCopySKU: string;
}

interface IProductContext {
  products: IProduct[];
  // productCopies: IProductCopy[];
}

const ProductContext = createContext({} as IProductContext);

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: IProductProvider) {
  const [products, setProducts] = useState<IProduct[]>([]);
  // const [productCopies, setProductCopies] = useState<IProductCopy[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/`)
      .then((res) => {
        console.log(res);
        const { products }: IData = res.data;
        // const tmp: Map<string, IProduct> = new Map();
        // products.forEach((element) => {
        //   const { SKU, Name, Price, Type, Size, Weight, Dimension } = element;
        //   tmp.set(SKU, {
        //     SKU,
        //     Name,
        //     Price,
        //     Type,
        //     Size,
        //     Weight,
        //     Dimension,
        //   });
        // });
        setProducts(products);
        // setProductCopies(productCopies);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

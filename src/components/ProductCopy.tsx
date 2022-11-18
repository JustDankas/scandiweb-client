import * as React from "react";
import { Component } from "react";
import { useProductContext } from "../ProductContext";
import styles from "../styles";

interface IProductCopy {
  SKU: string;
  Name: string;
  Price: number;
  Type: string;
  Size: number | null;
  Weight: number | null;
  Dimension: string | null;
  handleRemove: (sku: string) => void;
}

function ProductCopy({
  SKU,
  Name,
  Price,
  Type,
  Size,
  Weight,
  Dimension,
  handleRemove,
}: IProductCopy) {
  // const { products } = useProductContext();
  const [types, setTypes] = React.useState<any>({
    dvd: `Size: ${Size} MB`,
    book: `Weight: ${Weight} KG`,
    furniture: `Dimension: ${Dimension}`,
  });
  const [clicked, setClicked] = React.useState(false);

  // React.useEffect(() => {
  //   if (products) {
  //     setTypes({
  //       dvd: `Size: ${Size} MB`,
  //       book: `Weight: ${Weight} KG`,
  //       furniture: `Dimension: ${Dimension}`,
  //     });
  //   }
  // }, [products]);

  function handleRemoveProduct() {
    setClicked((prev) => !prev);
    handleRemove(SKU);
  }

  return (
    <li
      className="card relative flex flex-col min-w-[310px] h-[234px]
    justify-center items-center mr-[50px] my-5 overflow-hidden"
    >
      <h4 className={styles.ProductTitle}>{SKU}</h4>
      <div
        className={`${styles.ProductText} max-w-[90%] text-center text-ellipsis overflow-hidden`}
      >
        {Name}
      </div>
      <div className={styles.ProductText}>
        {formatCurrency(Price.toString())}
        {/* {Price.toString()} */}
      </div>
      {Type && <div>{types[Type.toLocaleLowerCase()]}</div>}
      <input
        type="checkbox"
        className={`delete-checkbox`}
        onClick={() => handleRemoveProduct()}
      />
    </li>
  );
}

function formatCurrency(price: string) {
  const tmp = price.split(".");
  if (tmp.length == 1) return price + ".00$";

  while (tmp[1].length < 2) {
    tmp[1] += "0";
  }
  return tmp.join(".") + "$";
}

export default ProductCopy;

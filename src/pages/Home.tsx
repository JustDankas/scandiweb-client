import * as React from "react";
import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles";
import axios from "axios";
import ProductCopy from "../components/ProductCopy";
import { useProductContext } from "../ProductContext";

interface IProductCopy {
  SKU: string;
  Name: string;
  Price: number;
  Type: string;
  Size: number | null;
  Weight: number | null;
  Dimension: string | null;
  Id: number;
  handleRemove: (id: number) => void;
}

function Home() {
  const { products } = useProductContext();
  const [removeIdTable, setRemoveIdTable] = useState<Map<string, boolean>>(
    new Map()
  );

  function handleAddRemove(id: string) {
    const tmp = new Map(removeIdTable);
    if (tmp.has(id)) {
      tmp.delete(id);
    } else tmp.set(id, true);
    setRemoveIdTable(tmp);
  }
  function handleMassDelete() {
    const body = Array.from(removeIdTable.keys());
    console.log(body);
    axios
      .put(`${import.meta.env.VITE_API}/`, {
        deleteIds: body,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  // console.log(productCopies);
  return (
    <div className="w-full flex justify-start items-center flex-col">
      <div className="w-[90%] flex justify-between line-bottom ss:flex-row flex-col">
        <h1 className={`${styles.H1} text-center ss:text-start`}>
          Product List
        </h1>
        <div className={`flexCenter`}>
          <Link
            className="primarybutton w-[50px] text-[20px] py-[5px] w-[92px]"
            to={"/add-product"}
          >
            ADD
          </Link>
          <button
            onClick={() => handleMassDelete()}
            className="primarybutton w-[180px] text-[20px] py-[5px] w-[180px] ml-5"
            id="mass-delete"
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <ul className="w-[90%] flex flex-wrap list-none p-5 m-0">
        {products?.map((product) => {
          // const { ProductCopyId, ProductCopySKU } = productCopy;
          return (
            <ProductCopy
              {...product}
              handleRemove={(id) => handleAddRemove(id)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Home;

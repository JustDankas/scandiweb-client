import axios from "axios";
import * as React from "react";
import { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import DimensionInput from "../components/DimensionInput";
import DvdInput from "../components/DvdInput";
import WeightInput from "../components/WeightInput";
import styles from "../styles";

// interface ITest {
//   dvd:React.ReactElement<{size:string,changeSize:(str:string)=>React.SetStateAction<string>}>
// }

function AddProduct() {
  const [typeSelection, setTypeSelection] = React.useState("dvd");

  const [SKU, setSKU] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [sizeInput, setSizeInput] = React.useState<string>("");
  const [weightInput, setWeightInput] = React.useState<string>("");
  const [width, setWidth] = React.useState<string>("");
  const [height, setHeight] = React.useState<string>("");
  const [length, setLength] = React.useState<string>("");
  const [validationWarning, setValidationWarning] = React.useState("");
  const [missingWarning, setMissingWarning] = React.useState(false);

  const navigate = useNavigate();

  // const [dynamicInputs, setDynamicInputs] = React.useState<any>({
  //   dvd: (
  //     <DvdInput
  //       err={validationWarning}
  //       size={sizeInput}
  //       changeSize={(str) => setSizeInput(str)}
  //     />
  //   ),
  //   book: (
  //     <WeightInput
  //       err={validationWarning}
  //       Weight={weightInput}
  //       changeWeight={(str) => setWeightInput(str)}
  //     />
  //   ),
  //   furniture: (
  //     <DimensionInput
  //       err={validationWarning}
  //       width={width}
  //       height={height}
  //       length={length}
  //       changeWidth={(str) => setWidth(str)}
  //       changeHeight={(str) => setHeight(str)}
  //       changeLength={(str) => setLength(str)}
  //     />
  //   ),
  // });
  const dynamicInputs = {
    dvd: (
      <DvdInput
        err={validationWarning}
        size={sizeInput}
        changeSize={(str) => setSizeInput(str)}
      />
    ),
    book: (
      <WeightInput
        err={validationWarning}
        Weight={weightInput}
        changeWeight={(str) => setWeightInput(str)}
      />
    ),
    furniture: (
      <DimensionInput
        err={validationWarning}
        width={width}
        height={height}
        length={length}
        changeWidth={(str) => setWidth(str)}
        changeHeight={(str) => setHeight(str)}
        changeLength={(str) => setLength(str)}
      />
    ),
  };

  // React.useEffect(() => {
  //   setDynamicInputs({
  //     dvd: (
  //       <DvdInput
  //         err={validationWarning}
  //         size={sizeInput}
  //         changeSize={(str) => setSizeInput(str)}
  //       />
  //     ),
  //     book: (
  //       <WeightInput
  //         err={validationWarning}
  //         Weight={weightInput}
  //         changeWeight={(str) => setWeightInput(str)}
  //       />
  //     ),
  //     furniture: (
  //       <DimensionInput
  //         err={validationWarning}
  //         width={width}
  //         height={height}
  //         length={length}
  //         changeWidth={(str) => setWidth(str)}
  //         changeHeight={(str) => setHeight(str)}
  //         changeLength={(str) => setLength(str)}
  //       />
  //     ),
  //   });
  // }, [sizeInput, weightInput, width, length, height, validationWarning]);

  function handleValidate() {
    //  Inspect Missing values
    if (!SKU || !name || !price) {
      setMissingWarning(true);
      return;
    }
    if (typeSelection == "dvd" && !sizeInput) {
      setMissingWarning(true);
      return;
    }
    if (typeSelection == "book" && !weightInput) {
      setMissingWarning(true);
      return;
    }
    if (typeSelection == "furniture" && (!width || !height || !length)) {
      setMissingWarning(true);
      return;
    }
    setMissingWarning(false);
    //  Validate form
    if (SKU.length > 20) {
      setValidationWarning("SKU");
      return;
    }
    if (name.length > 100) {
      setValidationWarning("name");
      return;
    }
    if (!/^-?\d+(?:[.,]\d{1,2}?)?$/.test(price)) {
      setValidationWarning("price");
      return;
    }
    if (typeSelection == "dvd") {
      if (/[^0-9]/.test(sizeInput)) {
        setValidationWarning("size");
        console.log(Number(sizeInput));
        return;
      }
    }
    if (typeSelection == "book") {
      if (!/^-?\d+(?:[.,]\d{1,2}?)?$/.test(weightInput)) {
        console.log("WENT THROUGH");
        setValidationWarning("weight");
        console.log(weightInput);
        return;
      }
    }
    if (typeSelection == "furniture") {
      if (/[^0-9]/.test(width)) {
        setValidationWarning("width");
        return;
      }
      if (/[^0-9]/.test(height)) {
        setValidationWarning("height");
        return;
      }
      if (/[^0-9]/.test(length)) {
        setValidationWarning("length");
        return;
      }
    }
    axios
      .post(`${import.meta.env.VITE_API}/`, {
        SKU: SKU.toUpperCase(),
        name: name.replaceAll("'", "\\'"),
        price,
        type: typeSelection,
        size: typeSelection === "dvd" ? sizeInput : null,
        weight: typeSelection === "book" ? weightInput : null,
        dimension:
          typeSelection === "furniture" ? `${height}x${width}x${length}` : null,
      })
      .then((res) => {
        navigate("/");
        location.reload();
      })
      .catch((e) => console.log(e));
  }

  function handleSKU_Change(value: string) {
    if (!/[^0-9a-zA-Z\-]/.test(value) && value.length <= 20)
      setSKU(value.toUpperCase());
  }
  return (
    <div className="w-full flex justify-start items-center flex-col">
      <div
        className="xs:w-[90%] w-full flex justify-between 
      line-bottom flex-col xs:flex-row py-2 xs:py-0"
      >
        <h1 className={`${styles.H1} text-center xs:text-start`}>
          Product Add
        </h1>
        <div className={`flexCenter`}>
          <button
            onClick={() => handleValidate()}
            className="primarybutton text-[20px] py-[5px] w-[92px]"
            id="mass-delete"
          >
            Save
          </button>
          <Link
            className="primarybutton text-[20px] py-[5px] w-[92px] ml-5"
            to={"/"}
          >
            Cancel
          </Link>
        </div>
      </div>
      <div className="xs:w-[90%] w-full flex justify-start items-center p-1 xs:p-5">
        <form
          id="product_form"
          className="flex flex-col xs:items-start items-center"
        >
          <div className="flex w-[310px] h-[54px] mt-3 overflow-hidden rounded-[2px]">
            <label className="input-label" htmlFor="sku">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              className={`form-input ${
                validationWarning == "SKU" && "invalid-input"
              }`}
              placeholder="SKU"
              onChange={(e) => handleSKU_Change(e.target.value)}
              value={SKU}
            />
          </div>
          <div className="flex w-[310px] h-[54px] mt-3 overflow-hidden rounded-[2px]">
            <label className="input-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`form-input ${
                validationWarning == "name" && "invalid-input"
              }`}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex w-[310px] h-[54px] mt-3 overflow-hidden rounded-[2px]">
            <label className="input-label" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              id="price"
              className={`form-input ${
                validationWarning == "price" && "invalid-input"
              }`}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className="flex w-[310px] h-[54px] mt-12 overflow-hidden rounded-[2px]">
            <label className="input-label" htmlFor="productType">
              Type
            </label>
            <select
              value={typeSelection}
              onChange={(e) => setTypeSelection(e.target.value)}
              name="type"
              id="productType"
            >
              <option value="dvd">DVD</option>
              <option value="book">Book</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
          <div
            className="flex flex-col justify-center p-5
          xs:w-[380px] w-[95%]  h-[280px] border border-black mt-12 overflow-hidden"
          >
            {typeSelection && dynamicInputs[typeSelection]}
            {/* {typeSelection == "dvd" && (
              <DvdInput
                size={sizeInput}
                changeSize={(str) => setSizeInput(str)}
              />
            )}
            {typeSelection == "book" && (
              <WeightInput
                Weight={weightInput}
                changeWeight={(str) => setWeightInput(str)}
              />
            )}
            {typeSelection == "furniture" && (
              <DimensionInput
                width={width}
                height={height}
                length={length}
                changeWidth={(str) => setWidth(str)}
                changeHeight={(str) => setHeight(str)}
                changeLength={(str) => setLength(str)}
              />
            )} */}
          </div>
          {missingWarning && (
            <button
              className="missing font-bold"
              onClick={() => setMissingWarning(false)}
            >
              Please, submit required data
            </button>
          )}
          {validationWarning && (
            <button
              className="invalid font-bold"
              onClick={() => setValidationWarning("")}
            >
              Please, provide the data of indicated type
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

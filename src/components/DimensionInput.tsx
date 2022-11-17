import * as React from "react";
import { Component } from "react";

interface ISize {
  width: string;
  height: string;
  length: string;
  changeWidth: (str: string) => void;
  changeHeight: (str: string) => void;
  changeLength: (str: string) => void;
}
function DimensionInput({
  width,
  height,
  length,
  changeWidth,
  changeHeight,
  changeLength,
}: ISize) {
  return (
    <div className="fade-in">
      <div className="flex w-[330px] h-[54px] mt-3 overflow-hidden rounded-[2px]">
        <label className="input-label" htmlFor="width">
          Width (CM)
        </label>
        <input
          type="text"
          onChange={(e) => changeWidth(e.target.value)}
          value={width}
          id="width"
          className="form-input"
          placeholder="Width"
        />
      </div>
      <div className="flex w-[330px] h-[54px] mt-3 overflow-hidden rounded-[2px]">
        <label className="input-label" htmlFor="height">
          Height (CM)
        </label>
        <input
          type="text"
          onChange={(e) => changeHeight(e.target.value)}
          value={height}
          id="height"
          className="form-input"
          placeholder="Height"
        />
      </div>
      <div className="flex w-[330px] h-[54px] mt-3 overflow-hidden rounded-[2px]">
        <label className="input-label" htmlFor="length">
          Length (CM)
        </label>
        <input
          type="text"
          onChange={(e) => changeLength(e.target.value)}
          value={length}
          id="length"
          className="form-input"
          placeholder="Length"
        />
      </div>
      <p className="w-[330px] mt-3">
        Please provide dimensions in HxWxL format
      </p>
    </div>
  );
}

export default DimensionInput;

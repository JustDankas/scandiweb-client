import * as React from "react";
import { Component } from "react";

interface ISize {
  size: string;
  err: string;
  changeSize: (str: string) => void;
}
function DvdInput({ size, err, changeSize }: ISize) {
  return (
    <div className="fade-in">
      <div className="flex w-[330px] h-[54px] mt-3 overflow-hidden rounded-[2px]">
        <label className="input-label" htmlFor="size">
          Size (MB)
        </label>
        <input
          type="text"
          onChange={(e) => changeSize(e.target.value)}
          value={size}
          id="size"
          className={`form-input ${err == "size" && "invalid-input"}`}
          placeholder="Size"
        />
      </div>
      <p className="w-[330px] mt-3">Please provide disk size in Megabytes</p>
    </div>
  );
}

export default DvdInput;

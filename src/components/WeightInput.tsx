import * as React from "react";
import { Component } from "react";

interface IWeight {
  Weight: string;
  changeWeight: (str: string) => void;
}
function WeightInput({ Weight, changeWeight }: IWeight) {
  return (
    <div className="fade-in">
      <div className="flex w-[330px] h-[54px] mt-3 overflow-hidden rounded-[2px]">
        <label className="input-label" htmlFor="weight">
          Weight (KG)
        </label>
        <input
          type="text"
          onChange={(e) => changeWeight(e.target.value)}
          value={Weight}
          id="weight"
          className="form-input"
          placeholder="Weight"
        />
      </div>
      <p className="w-[330px] mt-3">Please provide weight in Kilograms</p>
    </div>
  );
}

export default WeightInput;

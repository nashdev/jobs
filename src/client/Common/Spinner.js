import React from "react";
import s from "./Spinner.css";

const Spinner = () => (
  <div className={s.loading}>
    <div className="button is-loading">Loading....</div>
  </div>
);

export default Spinner;

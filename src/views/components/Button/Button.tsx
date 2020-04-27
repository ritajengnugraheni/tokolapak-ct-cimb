import React, { CSSProperties } from "react";
import "./Button.css";

type ButtonTypes = {
  type?: "contained" | "outlined" | "textual" |"auth";
  children: any;
  style?: CSSProperties;
  className?: string;
  Onclick?:any;
};

const ButtonUI = (props: ButtonTypes) => {
  let { type, children, style, className } = props;

  type = type || "contained";

  return (
    <div style={style} className={`custom-btn custom-btn-${type} ${className} ${onclick}`}>
      {children}
    </div>
  );
};

export default ButtonUI;

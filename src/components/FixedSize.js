import React from "react";

const FixedSize = (props) => {
  const padding = { [props.height ? 'paddingTop' : 'paddingLeft']: (props.height || props.width) };
  return (<div style={{ position: "relative", ...padding }} >
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
      }}
    >
    {props.children}
    </div>
  </div>);
}

export default FixedSize;
import { type PropsWithChildren } from "react";

// Extra component gemaakt voor als layout container met children - Je kon iets anders gekozen hebben

const ImageContainer = (props: PropsWithChildren) => {
  return (
    <div
      style={{
        backgroundColor: "#2c2727",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "16px",
      }}>
      {props.children}
    </div>
  );
};

export default ImageContainer;

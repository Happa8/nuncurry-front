import React from "react";
import { css } from "../../styled-system/css";

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const CountInput: React.FC<Props> = ({ count, setCount }) => {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "100px 1fr 100px",
        height: "80px",
        bgColor: "gray.200",
        borderColor: "gray.200",
        borderWidth: 4,
        borderRadius: "md",
        fontSize: "4xl",
        fontWeight: "bold",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
        onClick={() => {
          setCount(count - 1);
        }}
      >
        －
      </div>
      <div
        className={css({
          bgColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "md",
        })}
      >
        {count}
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        ＋
      </div>
    </div>
  );
};

const MemoedCountInput = React.memo(CountInput);

export default MemoedCountInput;

import { useState } from "react";
import { css } from "../styled-system/css";
import CountInput from "./components/CountInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const apiurl = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type OrderData = {
  nan: number;
  curry: number;
};

const App = () => {
  const [nunCount, setNunCount] = useState<number>(0);
  const [curryCount, setCurryCount] = useState<number>(0);

  const queryClient = useQueryClient();

  const getAllOrder = useQuery({
    queryKey: ["AllOrder"],
    queryFn: () => {
      return fetch(apiurl, {
        method: "POST",
        body: JSON.stringify({
          authToken: token,
          method: "GET_ALL_ORDER",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log("fetched!", res);
          return res;
        });
    },
    refetchInterval: 5000,
  });

  const getUndeliveredOrder = useQuery({
    queryKey: ["UndeliveredOrder"],
    queryFn: () => {
      return fetch(apiurl, {
        method: "POST",
        body: JSON.stringify({
          authToken: token,
          method: "GET_UNDELIVERED_ORDER",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log("fetched!", res);
          return res;
        });
    },
    refetchInterval: 5000,
  });

  const addOrderMutation = useMutation({
    mutationFn: (order: OrderData) => {
      return fetch(apiurl, {
        method: "POST",
        body: JSON.stringify({
          authToken: token,
          method: "ADD_ORDER",
          params: order,
        }),
      }).then((res) => {
        setNunCount(0);
        setCurryCount(0);
        return res;
      });
    },
  });

  return (
    <>
      <div
        className={css({
          // margin: 2,
          padding: 2,
          display: "flex",
          width: "100svw",
          height: "100svh",
          justifyContent: "center",
          pointerEvents: addOrderMutation.isPending ? "none" : "initial",
          opacity: addOrderMutation.isPending ? 0.5 : 1,
        })}
      >
        <div
          className={css({
            width: "100%",
            maxWidth: 400,
            height: "100%",
            // bgColor: "gray.200",
            padding: 2,
            rowGap: 4,
            display: "flex",
            flexDir: "column",
          })}
        >
          <div
            className={css({
              fontSize: "large",
              bgColor: "blue.100",
              padding: 2,
              borderRadius: "md",
            })}
          >
            <p>現在の総注文数</p>
            <p>
              🍛カレー
              <span className={css({ fontSize: "4xl", fontWeight: "bold" })}>
                {getAllOrder.isFetched ? getAllOrder.data.curry : "取得中"}
              </span>
              個　　　🍞ナン
              <span className={css({ fontSize: "4xl", fontWeight: "bold" })}>
                {getAllOrder.isFetched ? getAllOrder.data.nan : "取得中"}
              </span>
              個
            </p>
          </div>

          <div
            className={css({
              fontSize: "large",
              bgColor: "red.100",
              padding: 2,
              borderRadius: "md",
            })}
          >
            <p>現在の未完了注文数</p>

            <p>
              🍛カレー
              <span className={css({ fontSize: "4xl", fontWeight: "bold" })}>
                {getUndeliveredOrder.isFetched
                  ? getUndeliveredOrder.data.undeliveredCurry
                  : "取得中"}
              </span>
              個　　　🍞ナン
              <span className={css({ fontSize: "4xl", fontWeight: "bold" })}>
                {getUndeliveredOrder.isFetched
                  ? getUndeliveredOrder.data.undeliveredNan
                  : "取得中"}
              </span>
              個
            </p>
          </div>

          <div>
            <h2 className={css({ fontSize: "xl" })}>🍛カレー</h2>
            <CountInput count={curryCount} setCount={setCurryCount} />
          </div>

          <div>
            <h2 className={css({ fontSize: "xl" })}>🍞ナン</h2>
            <CountInput count={nunCount} setCount={setNunCount} />
          </div>

          <button
            className={css({
              bgColor: "gray.200",
              width: "100%",
              borderRadius: "md",
              fontSize: "2xl",
              fontWeight: "bold",
              padding: 3,
            })}
            onClick={() => {
              if (nunCount == 0 && curryCount == 0) {
                addOrderMutation.mutate({ nan: nunCount, curry: curryCount });
              }
            }}
          >
            {addOrderMutation.isPending ? "送信中" : "注文決定"}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;

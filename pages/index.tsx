import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const isBrowser = typeof window !== "undefined";

type Status = {
  initialized: boolean;
  name: string;
  map: string;
  mapchiname: string | undefined;
  host: string;
  port: number;
};

export default function Index() {
  const [status, setStatus] = useState<Status>({
    initialized: false,
    name: "",
    map: "",
    mapchiname: undefined,
    host: "",
    port: 0,
  });

  useEffect(() => {
    if (!isBrowser) return;
    const timer = setInterval(() => {
      try {
        axios.get("http://127.0.0.1:9887/getUser").then((res) => {
          setStatus(res.data);
        }).catch(e => {})
      } catch {}
    }, 1000);

    return () => {
      console.log("clearInterval");
      clearInterval(timer);
    };
  }, []);

  return <div>{status.initialized ? <div>
    <div>服务器信息：</div>
    <div>名称：{status.name}</div>
    <div>地图：{status.map}</div>
    {status.mapchiname? <div>译名：{status.mapchiname}</div> : ""}
    <div>地址：{`${status.host}:${status.port}`}</div>
  </div> : <div>未连接到小帮手...</div>}</div>;
}

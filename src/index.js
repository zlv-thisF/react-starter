import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import { head } from "lodash";
import "moment/locale/zh-cn";
import App from "./app";

moment.locale("zh-cn");
console.log(head([1, 2, 3]));

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </LocaleProvider>,
  document.getElementById("root")
);

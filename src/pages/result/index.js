import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { todoStore } from "@/stores";
import style from "./index.module.less";

const Result = props => {
  const store = useContext(todoStore);
  const navigate = useCallback(path => {
    const { history } = props;
    history.push(path);
  });
  return (
    <div className={style.result}>
      <div>
        <h3 className={style.info}>
          初始完成的计划数: <span className={style.green}>2</span>
        </h3>
        <h3 className={style.info}>
          在第一个页面勾选了一些新的完成计划后，这个页面的完成计划数变成了:{" "}
          <span className={style.red}>{store.alreadyDone}</span>
        </h3>
        <Button type="primary" onClick={() => navigate("/")}>
          回到上一个页面继续勾选完成的计划
        </Button>
      </div>
    </div>
  );
};

export default Result;

Result.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

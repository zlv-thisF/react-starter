import React, { Fragment } from "react";
import { Alert } from "antd";

interface TodoProps {
  done: number;
  notDone: number;
}

const TodoInfo = ({ done, notDone }: TodoProps): React.ReactElement => {
  return (
    <Fragment>
      <Alert message={`${done} 个计划已完成`} type="success" />
      <Alert message={`${notDone} 个计划未完成`} type="warning" />
      <Alert message={`完成度: ${done} / ${notDone + done}`} type="info" />
    </Fragment>
  );
};

export default TodoInfo;

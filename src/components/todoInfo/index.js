import React from "react";
import PropTypes from "prop-types";
import { Alert } from "antd";

const Index = ({ done, notDone }) => {
  return [
    <Alert message={`${done} 个计划已完成`} type="success" key="1" />,
    <Alert message={`${notDone} 个计划未完成`} type="warning" key="2" />,
    <Alert
      message={`完成度: ${done} / ${notDone + done}`}
      type="info"
      key="3"
    />,
  ];
};

export default Index;

Index.propTypes = {
  done: PropTypes.number.isRequired,
  notDone: PropTypes.number.isRequired,
};

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { List, Icon } from "antd";
import style from "./index.module.less";

const ListItem = List.Item;

const Index = ({ list, toggle }) => {
  return (
    <List
      header={<h3>计划列表:</h3>}
      bordered
      dataSource={list}
      renderItem={item => (
        <ListItem onClick={() => toggle(item.id)} className={style.wrapper}>
          <div className={style.listItem}>
            <div className={style.itemText}>{item.text}</div>
            <Icon
              type={item.isCompleted ? "check-circle" : "close-circle"}
              className={classNames(style.icon, {
                [style.iconChecked]: item.isCompleted,
              })}
            />
          </div>
        </ListItem>
      )}
    />
  );
};

export default Index;

Index.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggle: PropTypes.func.isRequired,
};

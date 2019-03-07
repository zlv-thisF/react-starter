import React from "react";
import classNames from "classnames";
import { List, Icon } from "antd";
import { ITodoItem } from "@/stores/todo";
import style from "./index.module.less";

const ListItem = List.Item;

interface ITodoList {
  list: ITodoItem[];
  toggle: (id: number) => void;
}

const TodoList = ({ list, toggle }: ITodoList): React.ReactElement => {
  return (
    <List
      header={<h3>计划列表:</h3>}
      bordered
      dataSource={list}
      renderItem={(item: ITodoItem) => (
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

export default TodoList;

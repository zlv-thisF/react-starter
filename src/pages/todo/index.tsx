import React, { useContext, useCallback } from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TodoList from "@/components/todoList";
import TodoInfo from "@/components/todoInfo";
import { todoStore } from "../../stores";
import style from "./index.module.less";

const Dashboard = observer(
  (props: any): React.ReactElement => {
    const store = useContext(todoStore);
    const { todoList, toggle, alreadyDone, notDone } = store;
    const navigate = useCallback(path => {
      const { history } = props;
      history.push(path);
    }, []);

    return (
      <div>
        <TodoList list={todoList} toggle={toggle} />
        <TodoInfo done={alreadyDone} notDone={notDone} />
        <Button
          type="primary"
          onClick={() => navigate("/result")}
          className={style.button}
        >
          去下一个页面测试全局状态是否改变
        </Button>
      </div>
    );
  }
);

export default withRouter(Dashboard);

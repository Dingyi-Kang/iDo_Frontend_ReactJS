import React from "react";
import Todo from "./Todo";

const TodoList = ({
  todos,
  completeStatusFilterValue,
  setRefresh,
  toFresh,
  userAccount,
  editedTask,
  setEditedTask

}) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {
          //we can write js code here
          completeStatusFilterValue !== "all"
            ? todos
                .filter(
                  (el) =>
                    el.completed ===
                    (completeStatusFilterValue === "completed" ? true : false)
                )
                .map((todo) => (
                  //it needs key so that it knows which row to modify
                  <Todo
                    key={todo.taskID}
                    todo={todo}
                    toFresh={toFresh}
                    setRefresh={setRefresh}
                    setEditedTask = {setEditedTask}
                    editedTask={editedTask}
                    disableEdit={false}
                  />
                ))
            : todos.map((todo) => (
                //it needs key so that it knows which row to modify
                <Todo
                  key={todo.taskID}
                  todo={todo}
                  toFresh={toFresh}
                  setRefresh={setRefresh}
                  editedTask = {editedTask}
                  setEditedTask = {setEditedTask}
                  disableEdit={false}
                />
              ))
        }
      </ul>
    </div>
  );
};

export default TodoList;

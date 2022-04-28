import React from "react";
import "./Group.css";
import Todo from "../Todo/Todo";

const GroupTaskList = ({
    completeStatusFilterValue,
    tasks,
    setRefresh,
    toFresh,
    editedTask,
    setEditedTask,
    noFilter,
    groupMode
}) => {
    return noFilter ? (
        <div className="todo-container">
            <ul className="todo-list">
                {tasks.map((todo) => (
                    //it needs key so that it knows which row to modify
                    <Todo
                        key={todo.taskID}
                        todo={todo}
                        toFresh={toFresh}
                        setRefresh={setRefresh}
                        editedTask={editedTask}
                        setEditedTask={setEditedTask}
                        disableEdit={false}
                    />
                ))}
            </ul>
        </div>
    ) : (
        <div className="todo-container">
            <ul className="todo-list">
                {completeStatusFilterValue !== "all"
                    ? tasks
                          .filter(
                              (el) =>
                                  el.completed ===
                                  (completeStatusFilterValue === "completed"
                                      ? true
                                      : false)
                          )
                          .map((todo) => (
                              <Todo
                                  key={todo.taskID}
                                  todo={todo}
                                  toFresh={toFresh}
                                  setRefresh={setRefresh}
                                  editedTask={editedTask}
                                  setEditedTask={setEditedTask}
                                  disableEdit={groupMode?false:true}
                              />
                          ))
                    : tasks.map((todo) => (
                          //it needs key so that it knows which row to modify
                          <Todo
                              key={todo.taskID}
                              todo={todo}
                              toFresh={toFresh}
                              setRefresh={setRefresh}
                              editedTask={editedTask}
                              setEditedTask={setEditedTask}
                              disableEdit={groupMode?false:true}
                          />
                      ))}
            </ul>
        </div>
    );
};

export default GroupTaskList;

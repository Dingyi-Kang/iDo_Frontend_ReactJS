import React from "react";
import MemberTodo from "./MemberTodo";

const MemberTodoList = ({
    todos,
    completeStatusFilterValue,
    setRefresh,
    toFresh,
    userAccount,
    editedTask,
    setEditedTask,
    selectedTeam,
    selectedTeamMember,
    adminStatusOfMember,
    isUserItself
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
                                      (completeStatusFilterValue === "completed"
                                          ? true
                                          : false)
                              )
                              .map((todo) => (
                                  //it needs key so that it knows which row to modify
                                  <MemberTodo
                                      key={todo.taskID}
                                      todo={todo}
                                      toFresh={toFresh}
                                      setRefresh={setRefresh}
                                      setEditedTask={setEditedTask}
                                      selectedTeam={selectedTeam}
                                      selectedTeamMember={selectedTeamMember}
                                      adminStatusOfMember={adminStatusOfMember}
                                      isUserItself={isUserItself}
                                  />
                              ))
                        : todos.map((todo) => (
                              //it needs key so that it knows which row to modify
                              <MemberTodo
                                  key={todo.taskID}
                                  todo={todo}
                                  toFresh={toFresh}
                                  setRefresh={setRefresh}
                                  editedTask={editedTask}
                                  setEditedTask={setEditedTask}
                                  selectedTeam={selectedTeam}
                                  selectedTeamMember={selectedTeamMember}
                                  adminStatusOfMember={adminStatusOfMember}
                                  isUserItself={isUserItself}
                              />
                          ))
                }
            </ul>
        </div>
    );
};

export default MemberTodoList;

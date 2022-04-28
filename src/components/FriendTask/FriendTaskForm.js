
import React from "react";
import api from "../../Helper/api";
import { Tag } from "antd";
import { useRef, useState, useEffect } from "react";

const FriendTaskForm = ({
    setInputText,
    inputText,
    setCompleteStatusFilter,
    completeStatusFilterValue,
    setRefresh,
    toFresh,
    userAccount,
    editedTask,
    setEditedTask,
    selectedFriend,
}) => {
    const userRef = useRef();
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };
   
    useEffect(() => {
        userRef.current.focus();
        !editedTask ? setInputText("") : setInputText(editedTask.content);
    }, [editedTask]);

    const submitTodoHandler = (e) => {
       
        e.preventDefault();
        //editing mode
        //when not changing group
        if (editedTask) {
            api.post(`/todo`, {
                taskID: editedTask.taskID,
                content: inputText,
                completed: editedTask.completed,
                //may be able to change location
                dueTime: editedTask.dueTime,
                //may be able to change location
                locationAddr: editedTask.locationAddr,
                assignedToUser: editedTask.assignedToUser,
                assignedToFriendPushTasks:editedTask.assignedToFriendPushTasks
                //may be able to change group
                //is all info needed for update?????? -- yes!!
                //assignedToTaskGroup: editedTask.assignedToTaskGroup
            }).then((res) => {
                setRefresh(!toFresh);
                setInputText("");
            });

            //clear editedState
            setEditedTask(null);
            
        }
        //adding mode
        else {
          //todo--------- new post api ----- assign to the table
            api.post(`/pushTaskToFriend/${userAccount.userName}/${selectedFriend.userName}`, {
                content: inputText,
            }).then((res) => {
              //console.log("aaaa"+res.data)
                setRefresh(!toFresh);
                setInputText("");
            });
        }
    };

    const completeStatusHandler = (e) => {
      setCompleteStatusFilter(e.target.value);
  };

    return (
        <>
            <form>
                <input
                    value={inputText}
                    placeholder={"Add todo here"}
                    ref={userRef}
                    onChange={inputTextHandler}
                    type="text"
                    className="todo-input"
                />
                <button
                    onClick={submitTodoHandler}
                    className="todo-button"
                    type="submit"
                >
                    <i className="fas fa-plus-square"></i>
                </button>
                {!editedTask ? (
                  <div className="select">
                  <select
                      onChange={completeStatusHandler}
                      name="todos"
                      className="filter-todo"
                  >
                      <option value="all" selected ={(completeStatusFilterValue==="all")?"selected":null}>All</option>
                      <option value="completed">Completed</option>
                      <option value="uncompleted">Uncompleted</option>
                  </select>
              </div>
              ) : (
                <div></div>)}
                
            </form>
        </>
    );
};

export default FriendTaskForm;

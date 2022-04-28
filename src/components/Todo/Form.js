import { useRef, useState, useEffect } from "react";
import React from "react";
import api from "../../Helper/api";

const Form = ({
    setInputText,
    inputText,
    setCompleteStatusFilter,
    setRefresh,
    toFresh,
    userAccount,
    editedTask,
    setEditedTask,
    groups
}) => {
    //write js function here
    const userRef = useRef();
    //e represents events
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    const [switchedGroup, setSwitchedGroup] = useState(null);

    useEffect(() => {
        userRef.current.focus();
        !editedTask ? setInputText("") : setInputText(editedTask.content);
    }, [editedTask]);

    const submitTodoHandler = (e) => {
        //prevent default behavior which is refreshing the page
        e.preventDefault();
        //editing mode
        //when not changing group
        
        if (editedTask) {
          const targetTaskGroup =  switchedGroup?switchedGroup:editedTask.assignedToTaskGroup;
            api.put(`/todo`, {
                taskID: editedTask.taskID,
                content: inputText,
                completed: editedTask.completed,
                //may be able to change location
                dueTime: editedTask.dueTime,
                //may be able to change location
                locationAddr: editedTask.locationAddr,
                assignedToUser: editedTask.assignedToUser,
                //may be able to change group
               
                assignedToTaskGroup: targetTaskGroup,
                assignedToFriendPushTasks:editedTask.assignedToFriendPushTasks,
                assignedToUserTeamRelation:editedTask.assignedToUserTeamRelation
            }).then((res) => {
                setRefresh(!toFresh);
                setInputText("");
                console.log("aaaa");
                setEditedTask(null);
                setSwitchedGroup(null);
            });

            //clear editedState
            
        }
        //adding mode
        else {
            api.post(`/todo/${userAccount.userName}`, {
                content: inputText,
                completed: false,
            }).then((res) => {
                setRefresh(!toFresh);
                setInputText("");
                console.log("bb");
            });
        }
    };

    const completeStatusHandler = (e) => {
        setCompleteStatusFilter(e.target.value);
    };

    const switchGroupHandler = (e) => {
      const id = parseInt(e.target.value, 10);
      console.log("ID:" + id);

      if (id === -1) {
          setSwitchedGroup(null);
      } else {
          for (let x in groups) {
              if (groups[x].groupID === id) {
                  console.log(groups[x]);
                  setSwitchedGroup((group) => ({
                      ...group,
                      ...groups[x],
                  }));
                  break;
              }
          }
      }
      setRefresh(!toFresh);
  };


    return (
        <form>
            <input
                value={inputText}
                placeholder={"Enter your todo"}
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
            {editedTask?(<div className="select">
                        <select
                            onChange={switchGroupHandler}
                            name="todos"
                            className="filter-todo"
                        >
                            <option value={-1}>Switch Group</option>
                            {groups.map((group) => {
                                return (
                                    <option value={group.groupID}>
                                        {group.taskGroupName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>):(
            <div className="select">
                <select
                    onChange={completeStatusHandler}
                    name="todos"
                    className="filter-todo"
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>)}
        </form>
    );
};

export default Form;

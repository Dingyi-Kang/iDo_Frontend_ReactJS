import React from "react";
import api from "../../Helper/api";

const MemberTodo = ({
    todo,
    setRefresh,
    toFresh,
    editedTask,
    setEditedTask,
    selectedTeam,
    selectedTeamMember,
    adminStatusOfMember,
    isUserItself,
}) => {
    const deleteHandler = () => {
        //setTodos(todos.filter((el) => el.taskID !== todo.taskID))
        api.delete(`/todo/${todo.taskID}`).then((res) => {
            setRefresh(!toFresh);
        });
        //console.log(res)
        //why i have to clidk twice??? --- it is because there is a heavy delay when dealing with deleting. so, we need make setRefresh within then
        //setRefresh(!toFresh);
    };

    const completeHandler = () => {
        api.put(`/todo`, {
            taskID: todo.taskID,
            content: todo.content,
            completed: !todo.completed,
            dueTime: todo.dueTime,
            locationAddr: todo.locationAddr,
            assignedToUser: todo.assignedToUser,
            assignedToTaskGroup: todo.assignedToTaskGroup,
            assignedToFriendPushTasks: todo.assignedToFriendPushTasks,
            assignedToUserTeamRelation: todo.assignedToUserTeamRelation,
            //add new here
        }).then((res) => {
            setRefresh(!toFresh);
        });
    };

    const updateHandler = () => {
        if (!editedTask) {
            setEditedTask((editedTask) => ({
                ...editedTask,
                ...todo,
            }));
        } else {
            setEditedTask(null);
        }
        setRefresh(!toFresh);
    };

    //add edit button
    return (
        <div className="todo">
            <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
                {todo.content}
            </li>

            {isUserItself === false && adminStatusOfMember === false ? (
                <div></div>
            ) : (
                <>
                    <button onClick={completeHandler} className="complete-btn">
                        <i className="fas fa-check"></i>
                    </button>
                    <button onClick={updateHandler} className="edit-btn">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={deleteHandler} className="trash-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                </>
            )}
        </div>
    );
};

export default MemberTodo;

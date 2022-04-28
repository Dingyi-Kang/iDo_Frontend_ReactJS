import React from "react";
import api from "../../Helper/api";

const Todo = ({
    todo,
    setRefresh,
    toFresh,
    editedTask,
    setEditedTask,
    disableEdit,
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
        //console.log(editedTask.taskID);
        if (!editedTask) {
            console.log("editing");
            setEditedTask((editedTask) => ({
                ...editedTask,
                ...todo,
            }));
        } else {
            setEditedTask(null);
            console.log("cancel editing");
        }
        setRefresh(!toFresh);
    };

    //add edit button
    return (
        <div className="todo">
            <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
                {todo.content}
            </li>
            <button onClick={completeHandler} className="complete-btn">
                <i className="fas fa-check"></i>
            </button>

            {disableEdit ? (
                <div></div>
            ) : (
                <button onClick={updateHandler} className="edit-btn">
                    <i className="fas fa-edit"></i>
                </button>
            )}
            <button onClick={updateHandler} className="map-btn">
                <i class="fas fa-map-marker-alt"></i>
            </button>

            <button onClick={deleteHandler} className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};

export default Todo;

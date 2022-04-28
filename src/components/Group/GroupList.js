import React from "react";
import "./Group.css";
import SingleGroup from "./SingleGroup";

const GroupList = ({ groups, setRefresh, toFresh, userAccount, editedGroup,
  setEditedGroup, setSelectedGroup}) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {groups.map((group) => (
                    //it needs key so that it knows which row to modify
                    <SingleGroup
                        key={group.taskID}
                        group={group}
                        toFresh={toFresh}
                        setRefresh={setRefresh}
                        editedGroup = {editedGroup}
                        setEditedGroup = {setEditedGroup}
                        setSelectedGroup = {setSelectedGroup}
                    />
                ))}
            </ul>
        </div>
    );
};

export default GroupList;

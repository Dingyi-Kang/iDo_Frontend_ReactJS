import React from "react";
import api from "../../Helper/api";
import { Tag } from "antd";
import { useRef, useState, useEffect } from "react";

const GroupTaskForm = ({
    setInputText,
    inputText,
    setCompleteStatusFilter,
    setRefresh,
    toFresh,
    userAccount,
    editedTask,
    setEditedTask,
    selectedGroup,
    groups,
    savedLocations,
}) => {
    const userRef = useRef();
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };
    const [switchedGroup, setSwitchedGroup] = useState(null);
    const [geoLocation, setGeoLocation] = useState(null);

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
            const targetTaskGroup = switchedGroup
                ? switchedGroup
                : editedTask.assignedToTaskGroup;
            const locationAddr = geoLocation
                ? geoLocation
                : editedTask.locationAddr;
            api.post(`/todo`, {
                taskID: editedTask.taskID,
                content: inputText,
                completed: editedTask.completed,
                //may be able to change location
                dueTime: editedTask.dueTime,
                //may be able to change location
                locationAddr: locationAddr,
                assignedToUser: editedTask.assignedToUser,
                //may be able to change group
                assignedToTaskGroup: targetTaskGroup,
                assignedToFriendPushTasks: editedTask.assignedToFriendPushTasks,
                assignedToUserTeamRelation:
                    editedTask.assignedToUserTeamRelation,
            }).then((res) => {
                setRefresh(!toFresh);
                setInputText("");
                //clear editedState
                setSwitchedGroup(null);
                setEditedTask(null);
                setGeoLocation(null);
            });
        }
        //adding mode
        else {
            api.post(`/todo/${userAccount.userName}/${selectedGroup.groupID}`, {
                content: inputText,
            }).then((res) => {
                setRefresh(!toFresh);
                setInputText("");
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
    };

    const selectLocationHandler = (e) => {
        const value = e.target.value;
        console.log(e.target.value);

        if (value === "no") {
            setGeoLocation(null);
        } else {
            setGeoLocation(value);
        }
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
                {editedTask ? (
                    <>
                        <div className="select">
                            <select
                                onChange={switchGroupHandler}
                                name="todos"
                                className="filter-todo"
                            >
                                <option value={-1}>Switch Group</option>
                                {groups.map((group, key) => {
                                    return (
                                        <option key={key} value={group.groupID}>
                                            {group.taskGroupName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="select">
                            <select
                                onChange={selectLocationHandler}
                                name="todos"
                                className="filter-todo"
                            >
                                {editedTask.locationAddr ? (
                                    <></>
                                ) : (
                                    <option value={"no"}>
                                        Assign a Location
                                    </option>
                                )}
                                {savedLocations.map((location, key) => {
                                    if (
                                        editedTask.locationAddr ===
                                        location.lat + "%" + location.lng
                                    ) {
                                      return (
                                        <option
                                            key={key}
                                            value={
                                                location.lat +
                                                "%" +
                                                location.lng
                                            }
                                            selected
                                        >
                                            {location.formattedAddr}
                                        </option>
                                    );
                                    } else {
                                        return (
                                            <option
                                                key={key}
                                                value={
                                                    location.lat +
                                                    "%" +
                                                    location.lng
                                                }
                                            >
                                                {location.formattedAddr}
                                            </option>
                                        );
                                    }
                                })}
                            </select>
                        </div>
                    </>
                ) : (
                    <div className="select">
                        <select
                            onChange={completeStatusHandler}
                            name="todos"
                            className="filter-todo"
                            defaultValue="all"
                        >
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </div>
                )}
            </form>
            <div className="space"></div>
        </>
    );
};

export default GroupTaskForm;

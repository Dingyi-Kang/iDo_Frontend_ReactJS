import React from "react";
import api from "../../Helper/api";
import { Tag } from "antd";
import { useRef, useState, useEffect } from "react";

const GroupForm = ({
    setInputText,
    inputText,
    setRefresh,
    toFresh,
    userAccount,
    editedGroup,
    setEditedGroup,
}) => {
    const [groupColor, setColor] = useState("");
    const userRef = useRef();
    //write js function here
    //e represents events
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    useEffect(() => {
      !editedGroup ? setInputText("") : setInputText(editedGroup.taskGroupName)
      userRef.current.focus();
    }, [editedGroup]);

    const submitTodoHandler = (e) => {
        //prevent default behavior which is refreshing the page
        e.preventDefault();
        //editing mode
        if (editedGroup) {
            const color = groupColor===""?editedGroup.taskGroupColor:groupColor;
            api.post(`/group`, {
                groupID: editedGroup.groupID,
                taskGroupName: inputText,
                taskGroupColor: color,
                ownerOfTaskGroup: editedGroup.ownerOfTaskGroup
            }).then((res) => {
                setRefresh(!toFresh);
                setInputText("");
                setEditedGroup(null);
            });

            //clear editedState
           
          
        }
        //adding mode
        else {
            api.post(`/group/${userAccount.userName}`, {
                taskGroupName: inputText,
                taskGroupColor: groupColor,
            }).then((res) => {
                setRefresh(!toFresh);
                setInputText("");
            });
        }
    };

    return (
        <>
            <form>
                <input
                    value={inputText}
                    placeholder={
                         "Enter your group name"
                    }
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
            </form>
            <h4>Choose a color tag :</h4>
            <div className="colorTag">
                <Tag className={(groupColor==="#ff00ff")?"selected":""} select color="#ff00ff" onClick = {()=>{setColor("#ff00ff")}}>magenta</Tag>
                <Tag className={(groupColor==="#ff0000")?"selected":""} color="#ff0000" onClick = {()=>{setColor("#ff0000")}}>red</Tag>
                <Tag className={(groupColor==="#ee82ee")?"selected":""} color="#ee82ee" onClick = {()=>{setColor("#ee82ee")}}>violet</Tag>
                <Tag className={(groupColor==="#f50")?"selected":""} color="#f50" onClick = {()=>{setColor("#f50")}}>oranged</Tag>
                <Tag className={(groupColor==="#ffa500")?"selected":""} color="#ffa500" onClick = {()=>{setColor("#ffa500")}}>orange</Tag>
                <Tag className={(groupColor==="#ffff00")?"selected":""} color="#ffff00" onClick = {()=>{setColor("#ffff00")}}>yellow</Tag>
                <Tag className={(groupColor==="#ffd700")?"selected":""} color="#ffd700" onClick = {()=>{setColor("#ffd700")}}>gold</Tag>
                <Tag className={(groupColor==="#00FF00")?"selected":""} color="#00FF00" onClick = {()=>{setColor("#00FF00")}}>lime</Tag>
                <Tag className={(groupColor==="#008000")?"selected":""} color="#008000" onClick = {()=>{setColor("#008000")}}>green</Tag>
                <Tag className={(groupColor==="#6b8e23")?"selected":""} color="#6b8e23" onClick = {()=>{setColor("#6b8e23")}}>olive</Tag>
            </div>
            <div className="colorTag">
                <Tag className={(groupColor==="#00FFFF")?"selected":""} color="#00FFFF" onClick = {()=>{setColor("#00FFFF")}}>aqua</Tag>
                <Tag className={(groupColor==="#0000FF")?"selected":""} color="#0000FF" onClick = {()=>{setColor("#0000FF")}}>blue</Tag>
                <Tag className={(groupColor==="#00bfff")?"selected":""} color="#00bfff" onClick = {()=>{setColor("#00bfff")}}>skyblue</Tag>
                <Tag className={(groupColor==="#800080")?"selected":""} color="#800080" onClick = {()=>{setColor("#800080")}}>purple</Tag>
                <Tag className={(groupColor==="#d3d3d3")?"selected":""} color="#d3d3d3" onClick = {()=>{setColor("#d3d3d3")}}>lightgray</Tag>
                <Tag className={(groupColor==="#a9a9a9")?"selected":""} color="#a9a9a9" onClick = {()=>{setColor("#a9a9a9")}}>darkgray</Tag>
            </div>
            <div className="space"></div>
        </>
    );
};

export default GroupForm;

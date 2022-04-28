import React, { useEffect, useState } from "react";
import FriendTaskForm from "../components/FriendTask/FriendTaskForm";
import GroupTaskList from '../components/Group/GroupTaskList'
import api from "../Helper/api";

function FriendTask({userAccount, selectedFriend, editedTask, setEditedTask, setCompleteStatusFilter, completeStatusFilterValue}) {
  const [inputText, setInputText] = useState("");
  const [toFresh, setRefresh] = useState(false);
  const [pushedTasks, setPushedTasks] = useState([]);
  const [receivedTasks, setReceivedTasks] = useState([]);
  

  useEffect(() => {
    //setTasks
    api.get(`/pushTaskToFriend/${userAccount.userName}/${selectedFriend.userName}`).then((respons) => {
      setPushedTasks(respons.data);
    });
    api.get(`/pushTaskToFriend/${selectedFriend.userName}/${userAccount.userName}`).then((respons) => {
      setReceivedTasks(respons.data);
    });
  }, [toFresh, selectedFriend]);

  return (
    <div className="App">
      <header>
        <h1>{selectedFriend.userName}</h1>
      </header>
      <FriendTaskForm
        inputText={inputText}
        setInputText={setInputText}
        setCompleteStatusFilter={setCompleteStatusFilter}
        completeStatusFilterValue={completeStatusFilterValue}
        toFresh={toFresh}
        setRefresh={setRefresh}
        userAccount={userAccount}
        editedTask = {editedTask}
        setEditedTask = {setEditedTask}
        selectedFriend = {selectedFriend} 
      />
      <header>
        <h4>{receivedTasks.length!==0?`The todos your receive from ${selectedFriend.userName}:`:""}</h4>
      </header>
      <GroupTaskList
        tasks={receivedTasks}
        toFresh={toFresh}
        setRefresh={setRefresh}
        completeStatusFilterValue={completeStatusFilterValue}
        noFilter = {false} 
        groupMode = {false} 
      />
      <header>
        <h4>{pushedTasks.length!==0?`The todos your push to ${selectedFriend.userName}:`:`Push todo to ${selectedFriend.userName}`}</h4>
      </header>
      <GroupTaskList
        tasks={pushedTasks}
        toFresh={toFresh}
        setRefresh={setRefresh}
        editedTask = {editedTask}
        setEditedTask = {setEditedTask} 
        noFilter = {true}
        groupMode = {false}
      />
    </div>
  );
}

export default FriendTask;

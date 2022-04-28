import React, { useEffect, useState } from "react";
import GroupTaskForm from "../components/Group/GroupTaskForm";
import GroupTaskList from '../components/Group/GroupTaskList'
import api from "../Helper/api";

function TaskGroup({userAccount, selectedGroup, groups, editedTask, setEditedTask, setCompleteStatusFilter, completeStatusFilterValue, savedLocations}) {
  const [inputText, setInputText] = useState("");
  const [toFresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    api.get(`todos/${userAccount.userName}/${selectedGroup.groupID}`).then((respons) => {
      setTasks(respons.data);
    });
  }, [toFresh, selectedGroup]);

  return (
    <div className="App">
      <header>
        <h1>{selectedGroup.taskGroupName}</h1>
      </header>
      <GroupTaskForm
        inputText={inputText}
        setInputText={setInputText}
        setCompleteStatusFilter={setCompleteStatusFilter}
        completeStatusFilterValue={completeStatusFilterValue}
        toFresh={toFresh}
        setRefresh={setRefresh}
        userAccount={userAccount}
        editedTask = {editedTask}
        setEditedTask = {setEditedTask}
        selectedGroup = {selectedGroup} 
        groups={groups}
        savedLocations={savedLocations}
      />
      <GroupTaskList
        tasks={tasks}
        toFresh={toFresh}
        setRefresh={setRefresh}
        editedTask = {editedTask}
        setEditedTask = {setEditedTask}
        completeStatusFilterValue={completeStatusFilterValue}
        noFilter = {false}
        groupMode = {true}
      />
    </div>
  );
}

export default TaskGroup;

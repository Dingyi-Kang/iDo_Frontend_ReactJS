import React, { useEffect, useState } from "react";
import TeamMemberTaskForm from "../TeamTask/TeamMemberTaskForm"
import MemberTodoList from "../TeamTask/MemberTodoList"
import api from "/Users/osuappcenter/my-app/src/Helper/api"

function TeamMember({userAccount, selectedTeam, selectedTeamMember, refreshTeam}) {
  //why <Form setInputText={setInputText}/>
  //this is mysterious to me
  //You can only pass states and props downward but upward.
  //this is a string
  const [inputText, setInputText] = useState("");
  //this is an array of objects
  const [todos, setTodos] = useState([]);

  const [toFresh, setRefresh] = useState(false);
  const[editedTask, setEditedTask] = useState(null);

  //all is the default
  const [completeStatusFilterValue, setCompleteStatusFilter] = useState("all");
  const [adminStatusOfMember, setAdminStatusOfMember]=useState(null);

  //with [] being empty, this works like constructor for a function component
  //todo -- update here 
  const isUserItself = (selectedTeamMember.userName === userAccount.userName) ? true:false;


  useEffect(() => {
    api.get(`/userTeamRelation/${selectedTeamMember.userName}/${selectedTeam.teamID}`).then((tasks) => {
      setTodos(tasks.data);
    });

    api.get(`/UserTeamR/admin/${userAccount.userName}/${selectedTeam.teamID}`).then((respons) => {
      setAdminStatusOfMember(respons.data);
      //console.log(adminStatusOfMember);
      //console.log(isUserItself);
    });

  }, [toFresh]);

  return (
    <div className="App">
      <header>
        <h1>{(selectedTeamMember.nickName===""||selectedTeamMember.nickName===null)?`${selectedTeamMember.userName}'s`:`${selectedTeamMember.nickName}'s`} Todo List in {selectedTeam.teamName}</h1>
      </header>
      <TeamMemberTaskForm
        userAccount = {userAccount}
        inputText={inputText}
        setInputText={setInputText}
        setCompleteStatusFilter={setCompleteStatusFilter}
        completeStatusFilterValue={completeStatusFilterValue}
        toFresh={toFresh}
        setRefresh={setRefresh}
        editedTask = {editedTask}
        setEditedTask = {setEditedTask} 
        selectedTeamMember = {selectedTeamMember} 
        selectedTeam={selectedTeam}
        adminStatusOfMember={adminStatusOfMember}
        isUserItself={isUserItself}
      />
      <MemberTodoList
        userAccount = {userAccount}
        todos={todos}
        completeStatusFilterValue={completeStatusFilterValue}
        toFresh={toFresh}
        setRefresh={setRefresh}
        editedTask = {editedTask}
        setEditedTask = {setEditedTask}
        selectedTeam = {selectedTeam}
        selectedTeamMember = {selectedTeamMember}
        adminStatusOfMember={adminStatusOfMember}
        isUserItself={isUserItself}
      />
    </div>
  );
}

export default TeamMember;

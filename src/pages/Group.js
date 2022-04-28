import React, { useEffect, useState } from "react";
import GroupForm from "../components/Group/GroupForm";
import GroupList from "../components/Group/GroupList";
import api from "../Helper/api";

function Group({userAccount, groups, setGroups, setSelectedGroup}) {
  const [inputText, setInputText] = useState("");

  const [toFresh, setRefresh] = useState(false);

  const[editedGroup, setEditedGroup] = useState(null);

  //with [] being empty, this works like constructor for a function component
  useEffect(() => {
    api.get(`/groups/${userAccount.userName}`).then((respons) => {
      setGroups(respons.data);
    });
  }, [toFresh]);

  return (
    <div className="App">
      <header>
        <h1>{(userAccount.nickName===""||userAccount.nickName===null)?"Your":`${userAccount.nickName}'s`} Task Groups</h1>
      </header>
      <GroupForm
        inputText={inputText}
        setInputText={setInputText}
        toFresh={toFresh}
        setRefresh={setRefresh}
        userAccount={userAccount}
        editedGroup = {editedGroup}
        setEditedGroup = {setEditedGroup}
      />
      <GroupList
        groups={groups}
        toFresh={toFresh}
        setRefresh={setRefresh}
        userAccount={userAccount}
        editedGroup = {editedGroup}
        setEditedGroup = {setEditedGroup}
        setSelectedGroup={setSelectedGroup}
      />
    </div>
  );
}

export default Group;

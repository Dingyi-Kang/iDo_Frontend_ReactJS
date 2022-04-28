import React from "react";
import api from "../../Helper/api";
import { useNavigate } from "react-router-dom";


const SingleGroup = ({ group, setRefresh, toFresh, userAccount, editedGroup,
  setEditedGroup, setSelectedGroup}) => {
  const deleteHandler = () => {
   
    api.delete(`/group/${group.groupID}`).then((res) => {
      setRefresh(!toFresh);
    });
    //console.log(res)
    //why i have to clidk twice??? --- it is because there is a heavy delay when dealing with deleting. so, we need make setRefresh within then
    //setRefresh(!toFresh);
  };
  
  let navigation = useNavigate();

  const updateHandler = () => {
      if (editedGroup){
        setEditedGroup(null);
        
      }
      else{
      setEditedGroup(editedGroup=>({
        ...editedGroup,
        ...group
      }));}
      setRefresh(!toFresh);
  };

  return (
    // eslint-disable-next-line react/style-prop-object
    <div className="todo" style={{backgroundColor: group.taskGroupColor}}>
      <li className={`todo-item}`} onClick={() =>{ navigation('/group/one')
    setSelectedGroup(group)
    }}>
        {group.taskGroupName}
      </li>
      <button onClick={updateHandler} className="complete-btn">
        <i className="fas fa-edit"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default SingleGroup;

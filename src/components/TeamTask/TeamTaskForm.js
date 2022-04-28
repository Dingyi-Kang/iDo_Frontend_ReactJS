import React from "react";
import { Card, Button, Input, Space } from "antd";
import api from "../../Helper/api";
import { Tag } from "antd";
import { useRef, useState, useEffect } from "react";


//using setPopUp manbanpai -- worse than using local
const TeamTaskForm = ({
    setInputText,
    inputText,
    setRefresh,
    toFresh,
    userAccount,
    popUp,
    setPopUp,
    sentTIs,
    selectedTeam
}) => {
    const userRef = useRef();
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
        setPopUp("")
    };

    useEffect(() => {
      setRefresh(!toFresh);
    }, [setPopUp]);

    const sendHandler = (e) => {
         e.preventDefault();
         //check inputText !== {userAccount.userName}
        if (inputText.toLowerCase() === userAccount.userName.toLowerCase()){
          setInputText("");
          setRefresh(!toFresh);
          setPopUp("You are already in this team!");
          return
        }
        //check if an inv has been sent to this user
        for (let x in sentTIs) {
            if (sentTIs[x].receiverOfTeamInvitation.userName.toLowerCase() === inputText.toLowerCase()){
              setInputText("");
              setRefresh(!toFresh);
              setPopUp("You have already sent a team invitation to this user!");
              return
            }
        }

        

        api.post(`/tiv/${userAccount.userName}/${inputText}/${selectedTeam.teamID}`).then((res) => {
            setInputText("");
            setRefresh(!toFresh);
            if (res.data === ""){
              setPopUp("No such user");
            }else{
              setPopUp("Your invitation has been sent!");
            }
        });
    };

    return (
        <>
            <form className="friend">
                <input
                    value={inputText}
                    placeholder={"Add team member"}
                    ref={userRef}
                    onChange={inputTextHandler}
                    type="text"
                />
                <button onClick={sendHandler} type="submit">
                    <i className="fas fa-ghost"></i>
                </button>
            </form>
            {popUp!==""?(popUp === "Your invitation has been sent!" ?<h5 style={{ color: "orange" }}>{popUp}</h5>:<h5>{popUp}</h5>):<div></div>}
          
        </>
    );
};

export default TeamTaskForm;

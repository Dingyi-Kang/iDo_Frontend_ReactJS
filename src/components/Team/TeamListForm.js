import React from "react";
import { Card, Button, Input, Space } from "antd";
import api from "../../Helper/api";
import { Tag } from "antd";
import { useRef, useState, useEffect } from "react";

//using setPopUp manbanpai -- worse than using local
const TeamListForm = ({
    teams,
    setInputText,
    inputText,
    setRefresh,
    toFresh,
    userAccount,
    popUp,
    setPopUp,
    editedTeam,
    setEditedTeam,
}) => {
    const userRef = useRef();
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
        setPopUp("");
    };

    const [TIDInputText, setTIDInputText] = useState("");

    const IDInputTextHandler = (e) => {
        setTIDInputText(e.target.value);
        setPopUp("");
    };

    useEffect(() => {
        !editedTeam ? setInputText("") : setInputText(editedTeam.teamName)
        

        setRefresh(!toFresh);
        
    }, [setPopUp, editedTeam]);

    const createHandler = (e) => {
        e.preventDefault();

        if (inputText === "") {
            setPopUp("Team name cannot be empty");
            return;
        }

        if (editedTeam) {
            api.post(`/team`, {
                teamID: editedTeam.teamID,
                teamName: inputText,
            }).then((res) => {
              setEditedTeam(null);
              setRefresh(!toFresh);
              setInputText("");
            });
            
           
        } else {
            //adding mode
            if (TIDInputText === "") {
                setPopUp("TeamID cannot be empty");
                return;
            }

            //check if the team id if alreay being used
            api.get(`/team/${TIDInputText}`).then((res) => {
                if (res.data) {
                    setPopUp("This team id has alreay been used!");
                    return;
                } else {
                    //create a team and create a relation between this team and this user as admib
                    api.post(`/team`, {
                        teamID: TIDInputText,
                        teamName: inputText,
                    }).then((res) => {
                        if (res.data) {
                            api.post(
                                `/UserTeamR/admin/${userAccount.userName}/${res.data.teamID}`
                            ).then((res) => {
                                setRefresh(!toFresh);
                            });
                        } else {
                            setPopUp("Error");
                        }
                        setTIDInputText("");
                        setInputText("");
                    });
                }
            });
        }
    };

    return (
        <>
            <form className="friend">
                {editedTeam ? (
                    <div></div>
                ) : (
                    <input
                        value={TIDInputText}
                        placeholder={"Enter team ID"}
                        ref={userRef}
                        onChange={IDInputTextHandler}
                        type="text"
                    />
                )}
                {editedTeam ? <div></div> : <div className="space"></div>}
                <input
                    value={inputText}
                    placeholder={editedTeam?"Edit team name":"Enter team name"}
                    ref={userRef}
                    onChange={inputTextHandler}
                    type="text"
                />
                <button onClick={createHandler} type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
            </form>
            {popUp !== "" ? <h5>{popUp}</h5> : <div></div>}
        </>
    );
};

export default TeamListForm;

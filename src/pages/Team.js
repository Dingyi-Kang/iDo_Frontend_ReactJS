import React, { useEffect, useState } from "react";
import TeamListForm from "../components/Team/TeamListForm";
import TeamList from "../components/Team/TeamList";
import api from "../Helper/api";

function Team({ userAccount, teams, setTeams, setSelectedTeam,  refreshTeam }) {
    const [inputText, setInputText] = useState("");
    const [toFresh, setRefresh] = useState(false);
    const [receivedTIs, setReceivedTIs] = useState([]);
    //const [receivedTIs, setReceivedTIs] = useState([]);
    const [editedTeam, setEditedTeam] = useState(null);

    const [popUp, setPopUp] = useState("");

    //with [] being empty, this works like constructor for a function component
    useEffect(() => {
        //update here
        api.get(`/tiv/receiver/${userAccount.userName}`).then((respons) => {
            setReceivedTIs(respons.data);
        });

        api.get(`/${userAccount.userName}/teams`).then((respons) => {
            setTeams(respons.data);
            //console.log(teams);
        });
        console.log("refreshRefresh");
    }, [toFresh, userAccount, refreshTeam]);

    return (
        <div className="App">
            <header>
                <h1>
                    {userAccount.nickName === "" ||
                    userAccount.nickName === null
                        ? "Your"
                        : `${userAccount.nickName}'s`}{" "}
                    Team List
                </h1>
            </header>
            <TeamListForm
                teams={teams}
                inputText={inputText}
                setInputText={setInputText}
                toFresh={toFresh}
                setRefresh={setRefresh}
                userAccount={userAccount}
                popUp={popUp}
                setPopUp={setPopUp}
                editedTeam={editedTeam}
                setEditedTeam={setEditedTeam}
            />
            <TeamList
                teams={teams}
                toFresh={toFresh}
                setRefresh={setRefresh}
                userAccount={userAccount}
                receivedTIs={receivedTIs}
                popUp={popUp}
                setPopUp={setPopUp}
                setSelectedTeam={setSelectedTeam}
                editedTeam={editedTeam}
                setEditedTeam={setEditedTeam}
            />
        </div>
    );
}

export default Team;

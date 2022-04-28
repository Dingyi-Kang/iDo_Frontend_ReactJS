import React from "react";
import "../Group/Group.css";
import SingleTeam from "./SingleTeam";
import SingleTeamInvitation from "./SingleTeamInvitation";

const TeamList = ({
    teams,
    setRefresh,
    toFresh,
    userAccount,
    receivedTIs,
    popUp,
    setPopUp,
    setSelectedTeam,
    editedTeam,
    setEditedTeam
}) => {
    return (
        <>
            <div className="todo-container">
                <ul className="todo-list">
                    {receivedTIs.map((receivedTI) => (
                        //it needs key so that it knows which row to modify
                        <SingleTeamInvitation
                            key={receivedTI.teamInvitationID}
                            receivedTI={receivedTI}
                            toFresh={toFresh}
                            setRefresh={setRefresh}
                            popUp={popUp}
                            setPopUp={setPopUp}
                            sender={false}
                            teams={teams}
                        />
                    ))}
                </ul>
            </div>
            <div className="todo-container">
                <ul className="todo-list">
                    {teams.map((team) => (
                        //it needs key so that it knows which row to modify
                        <SingleTeam
                            key={team.teamID}
                            team={team}
                            toFresh={toFresh}
                            setRefresh={setRefresh}
                            popUp={popUp}
                            setPopUp={setPopUp}
                            userAccount={userAccount}
                            setSelectedTeam ={ setSelectedTeam}
                            editedTeam={editedTeam}
                            setEditedTeam={setEditedTeam}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default TeamList;

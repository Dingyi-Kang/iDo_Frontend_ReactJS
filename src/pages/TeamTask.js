import React, { useEffect, useState } from "react";
import TeamTaskForm from "../components/TeamTask/TeamTaskForm";
import SingleTeamInvitation from "../components/Team/SingleTeamInvitation";
import api from "../Helper/api";
import TeamTable from "../components/TeamTask/TeamTable";

function TeamTask({
    userAccount,
    selectedTeam,
    setSelectedTeamMember,
    refreshTeam,
}) {
    const [inputText, setInputText] = useState("");
    const [toFresh, setRefresh] = useState(false);
    const [sentTIs, setSentTIs] = useState([]);

    const [popUp, setPopUp] = useState("");
    const [members, setMembers] = useState([]);
    const [teamCompleteReports, setTeamCompleteReports] = useState([]);
    const [teamUncompleteReports, setTeamUncompleteReports] = useState([]);
    const [allTeamRelations, setAllTeamRelations] = useState([]);
    //with [] being empty, this works like constructor for a function component
    useEffect(() => {
        api.get(
            `/tiv/sender/${userAccount.userName}/${selectedTeam.teamID}`
        ).then((respons) => {
            setSentTIs(respons.data);
        });

        api.get(`/${selectedTeam.teamID}/members`).then((respons) => {
            setMembers(respons.data);
           
        });

        api.get(`/UserTeamR/report/complete/${selectedTeam.teamID}`).then(
            (respons) => {
                setTeamCompleteReports(respons.data);
                //console.log(teamReports)
            }
        );

        api.get(`/UserTeamR/report/uncomplete/${selectedTeam.teamID}`).then(
            (respons) => {
                setTeamUncompleteReports(respons.data);
                //console.log(teamReports)
            }
        );

        api.get(`/UserTeamR/allRelations/${selectedTeam.teamID}`).then(
            (respons) => {
                setAllTeamRelations(respons.data);
                //console.log(teamReports)
            }
        );
    }, [toFresh, refreshTeam, selectedTeam]);

    return (
        <div className="App">
            <header>
                <h1>{selectedTeam.teamName}</h1>
            </header>
            <TeamTaskForm
                inputText={inputText}
                setInputText={setInputText}
                toFresh={toFresh}
                setRefresh={setRefresh}
                userAccount={userAccount}
                popUp={popUp}
                setPopUp={setPopUp}
                sentTIs={sentTIs}
                selectedTeam={selectedTeam}
            />
            <div className="todo-container">
                <ul className="todo-list">
                    {sentTIs.map((sentTI, key) => (
                        //it needs key so that it knows which row to modify
                        <SingleTeamInvitation
                            key={key}
                            sentTI={sentTI}
                            toFresh={toFresh}
                            setRefresh={setRefresh}
                            popUp={popUp}
                            setPopUp={setPopUp}
                            sender={true}
                            members={members}
                            selectedTeam={selectedTeam}
                        />
                    ))}
                </ul>
            </div>
            <div className="space"></div>
            <TeamTable
                userAccount={userAccount}
                members={members}
                setSelectedTeamMember={setSelectedTeamMember}
                teamCompleteReports={teamCompleteReports}
                teamUncompleteReports={teamUncompleteReports}
                selectedTeam={selectedTeam}
                allTeamRelations={allTeamRelations}
                toFresh={toFresh}
                setRefresh={setRefresh}
            />
        </div>
    );
}

export default TeamTask;

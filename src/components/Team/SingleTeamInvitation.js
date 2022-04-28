import React from "react";
import api from "../../Helper/api";
import { useNavigate } from "react-router-dom";

const SingleTeamInvitation = ({
    receivedTI,
    sentTI,
    setRefresh,
    toFresh,
    setPopUp,
    popUp,
    sender,
    members,
}) => {
    const deleteHandler = () => {
        api.delete(`/tiv/${sentTI.teamInvitationID}`).then((res) => {
            setRefresh(!toFresh);
            if (res !== "") {
                setPopUp(
                    "The invitation to " +
                        sentTI.receiverOfTeamInvitation.userName +
                        " has been removed"
                );
            }
        });
    };

    const acceptHandler = () => {
        //check if it is already in team. if it is, delete this one
        //check this user is not aleary in friend list

        //Dont think this is necessary
        for (let x in members) {
            if (
                members[x].userName.toLowerCase() ===
                receivedTI.receiverOfTeamInvitation.userName.toLowerCase()
            ) {
                //setInputText("");
                setRefresh(!toFresh);
                setPopUp("You are already in!");
                return;
            }
        }

        api.put(`/tiv`, {
            teamInvitationID: receivedTI.teamInvitationID,
            invitationStatus: true,
            senderOfTeamInvitation: receivedTI.senderOfTeamInvitation,
            receiverOfTeamInvitation: receivedTI.receiverOfTeamInvitation,
        }).then((res) => {
            //setRefresh(!toFresh);
            if (res !== "") {
                setPopUp(
                    "The invitation from " +
                        receivedTI.senderOfTeamInvitation.userName +
                        " has been accepted"
                );
                api.post(
                  `/UserTeamR/${receivedTI.receiverOfTeamInvitation.userName}/${receivedTI.destinationTeam.teamID}`
              ).then((res) => {
                setRefresh(!toFresh);
              });
            }
        });        
        
    };

    const rejectHandler = () => {
        api.put(`/tiv`, {
            teamInvitationID: receivedTI.teamInvitationID,
            invitationStatus: false,
            senderOfTeamInvitation: receivedTI.senderOfTeamInvitation,
            receiverOfTeamInvitation: receivedTI.receiverOfTeamInvitation,
        }).then((res) => {
            setRefresh(!toFresh);
            if (res !== "") {
                setPopUp(
                    "The invitation from " +
                        receivedTI.senderOfTeamInvitation.userName +
                        " has been rejected"
                );
            }
        });
    };

    return (
        // eslint-disable-next-line react/style-prop-object
        <>
            {sender ? (
                <div className="todo" style={{ backgroundColor: "orange" }}>
                    {sentTI.invitationStatus === null ? (
                        <li className={`todo-item}`}>
                            Awaiting for{" "}
                            {sentTI.receiverOfTeamInvitation.userName}'s
                            response.
                        </li>
                    ) : sentTI.invitationStatus === true ? (
                        <li className={`todo-item}`}>
                            Your invitation to{" "}
                            {sentTI.receiverOfTeamInvitation.userName} has been
                            accepted.
                        </li>
                    ) : (
                        <li className={`todo-item}`}>
                            Your invitation to{" "}
                            {sentTI.receiverOfTeamInvitation.userName} has been
                            rejected.
                        </li>
                    )}

                    <button onClick={deleteHandler} className="trash-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            ) : (
                <div className="todo" style={{ backgroundColor: "coral" }}>
                    <li className={`todo-item}`}>
                        {receivedTI.senderOfTeamInvitation.userName} invite you
                        to group {receivedTI.destinationTeam.teamName}
                    </li>
                    <button onClick={acceptHandler} className="complete-btn">
                        <i className="fas fa-check"></i>
                    </button>
                    <button onClick={rejectHandler} className="trash-btn">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )}
        </>
    );
};

export default SingleTeamInvitation;

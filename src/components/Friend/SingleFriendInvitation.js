import React from "react";
import api from "../../Helper/api";
import { useNavigate } from "react-router-dom";

const SingleFriendInvitation = ({
    sentFI,
    receivedFI,
    setRefresh,
    toFresh,
    setPopUp,
    sender,
    friends,
}) => {
    const deleteHandler = () => {
        api.delete(`/fiv/${sentFI.friendInvitationID}`).then((res) => {
            setRefresh(!toFresh);
            if (res !== "") {
                setPopUp(
                    "The invitation to " +
                        sentFI.receiver.userName +
                        " has been removed"
                );
            }
        });
    };

    const acceptHandler = () => {
        //check if it is already your friend. if it is, delete this one
        //check this user is not aleary in friend list
        for (let x in friends) {
            if (
                friends[x].userName.toLowerCase() ===
                receivedFI.sender.userName.toLowerCase()
            ) {
                //setInputText("");
                setRefresh(!toFresh);
                setPopUp("This user is alreay in your friend list!");
                return;
            }
        }

        api.put(`/fiv`, {
            friendInvitationID: receivedFI.friendInvitationID,
            invitationStatus: true,
            sender: receivedFI.sender,
            receiver: receivedFI.receiver,
        }).then((res) => {
            if (res !== "") {
                setPopUp(
                    "The invitation from " +
                        receivedFI.sender.userName +
                        " has been accepted"
                );
            }
            api.post(
                `/FriendPushR/${receivedFI.sender.userName}/${receivedFI.receiver.userName}`
            ).then((res) => {
                setRefresh(!toFresh);
            });
        });
    };

    const rejectHandler = () => {
        api.put(`/fiv`, {
            friendInvitationID: receivedFI.friendInvitationID,
            invitationStatus: false,
            sender: receivedFI.sender,
            receiver: receivedFI.receiver,
        }).then((res) => {
            setRefresh(!toFresh);
            if (res !== "") {
                setPopUp(
                    "The invitation from " +
                        receivedFI.sender.userName +
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
                    {sentFI.invitationStatus === null ? (
                        <li className={`todo-item}`}>
                            Awaiting for {sentFI.receiver.userName}'s response.
                        </li>
                    ) : sentFI.invitationStatus === true ? (
                        <li className={`todo-item}`}>
                            Your invitation to {sentFI.receiver.userName} has
                            been accepted.
                        </li>
                    ) : (
                        <li className={`todo-item}`}>
                            Your invitation to {sentFI.receiver.userName} has
                            been rejected.
                        </li>
                    )}

                    <button onClick={deleteHandler} className="trash-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            ) : (
                <div className="todo" style={{ backgroundColor: "coral" }}>
                    <li className={`todo-item}`}>
                        {receivedFI.sender.userName} sent you a friend
                        invitation
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

export default SingleFriendInvitation;

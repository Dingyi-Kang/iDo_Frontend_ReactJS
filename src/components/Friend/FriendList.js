import React from "react";
import "../Group/Group.css";
import SingleFriend from "./SingleFriend";
import SingleFriendInvitation from "./SingleFriendInvitation";

const FriendList = ({
    friends,
    setRefresh,
    toFresh,
    userAccount,
    sentFIs,
    receivedFIs,
    popUp,
    setPopUp,
    setSelectedFriend
}) => {
    return (
        <>
            <div className="todo-container">
                <ul className="todo-list">
                    {sentFIs.map((sentFI) => (
                        //it needs key so that it knows which row to modify
                        <SingleFriendInvitation
                            key={sentFI.friendInvitationID}
                            sentFI={sentFI}
                            toFresh={toFresh}
                            setRefresh={setRefresh}
                            popUp={popUp}
                            setPopUp={setPopUp}
                            sender={true}
                            friends={friends}
                        />
                    ))}
                </ul>
            </div>
            <div className="todo-container">
                <ul className="todo-list">
                    {receivedFIs.map((receivedFI) => (
                        //it needs key so that it knows which row to modify
                        <SingleFriendInvitation
                            key={receivedFI.friendInvitationID}
                            receivedFI={receivedFI}
                            toFresh={toFresh}
                            setRefresh={setRefresh}
                            popUp={popUp}
                            setPopUp={setPopUp}
                            sender={false}
                            friends={friends}
                        />
                    ))}
                </ul>
            </div>
            <div className="todo-container">
                <ul className="todo-list">
                    {friends.map((friend) => (
                        //it needs key so that it knows which row to modify
                        <SingleFriend
                            key={friend.userID}
                            friend={friend}
                            toFresh={toFresh}
                            setRefresh={setRefresh}
                            popUp={popUp}
                            setPopUp={setPopUp}
                            userAccount={userAccount}
                            setSelectedFriend={ setSelectedFriend}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default FriendList;

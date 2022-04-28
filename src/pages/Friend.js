import React, { useEffect, useState } from "react";
import FriendListForm from "../components/Friend/FriendListForm";
import FriendList from "../components/Friend/FriendList";
import api from "../Helper/api";

function Friend({ userAccount, friends, setFriends, setSelectedFriend }) {
    const [inputText, setInputText] = useState("");
    const [toFresh, setRefresh] = useState(false);
    const [sentFIs, setSentFIs] = useState([]);
    const [receivedFIs, setReceivedFIs] = useState([]);

    const [popUp, setPopUp] = useState("");

    //with [] being empty, this works like constructor for a function component
    useEffect(() => {
        //update here
        console.log("blablabla")
        api.get(`/fiv/sender/${userAccount.userName}`).then((respons) => {
            setSentFIs(respons.data);
        });

        api.get(`/fiv/receiver/${userAccount.userName}`).then((respons) => {
            setReceivedFIs(respons.data);
        });

        api.get(`/${userAccount.userName}/friends`).then((respons) => {
            setFriends(respons.data);
        });
    }, [toFresh]);

    return (
        <div className="App">
            <header>
                <h1>
                    {userAccount.nickName === "" ||
                    userAccount.nickName === null
                        ? "Your"
                        : `${userAccount.nickName}'s`}{" "}
                    Friend List
                </h1>
            </header>
            <FriendListForm
                friends={friends}
                inputText={inputText}
                setInputText={setInputText}
                toFresh={toFresh}
                setRefresh={setRefresh}
                userAccount={userAccount}
                popUp={popUp}
                setPopUp={setPopUp}
                sentFIs={sentFIs}
                receivedFIs={receivedFIs}
            />
            <FriendList
                friends={friends}
                toFresh={toFresh}
                setRefresh={setRefresh}
                userAccount={userAccount}
                sentFIs={sentFIs}
                receivedFIs={receivedFIs}
                popUp={popUp}
                setPopUp={setPopUp}
                setSelectedFriend={setSelectedFriend}
            />
        </div>
    );
}

export default Friend;

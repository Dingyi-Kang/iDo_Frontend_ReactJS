import React from "react";
import { Card, Button, Input, Space } from "antd";
import api from "../../Helper/api";
import { Tag } from "antd";
import { useRef, useState, useEffect } from "react";


//using setPopUp manbanpai -- worse than using local
const FriendListForm = ({
    setInputText,
    inputText,
    setRefresh,
    toFresh,
    userAccount,
    popUp,
    setPopUp,
    friends,
    sentFIs,
    receivedFIs
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
          setPopUp("Cannot send friend invivation to yourself!");
          return
        }
        //check if an inv has been sent to this user
        for (let x in sentFIs) {
            if (sentFIs[x].receiver.userName.toLowerCase() === inputText.toLowerCase()){
              setInputText("");
              setRefresh(!toFresh);
              setPopUp("You have already sent an invitation to this user!");
              return
            }
        }

         //check this friend has sent an inv
         for (let x in receivedFIs) {
          if (receivedFIs[x].sender.userName.toLowerCase() === inputText.toLowerCase()){
            setInputText("");
            setRefresh(!toFresh);
            setPopUp("This user has already sent you an invitation!");
            return
          }
      }

        for (let x in friends) {
          if (friends[x].userName.toLowerCase() === inputText.toLowerCase()){
            setInputText("");
            setRefresh(!toFresh);
            setPopUp("This user is alreay in your friend list!");
            return
          }
      }


        api.post(`/fiv/${userAccount.userName}/${inputText}`).then((res) => {
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
                    placeholder={"Enter an username"}
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

export default FriendListForm;

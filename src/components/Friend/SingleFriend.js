import React from "react";
import api from "../../Helper/api";
import { useNavigate } from "react-router-dom";

const SingleFriend = ({
    friend,
    setRefresh,
    toFresh,
    setSelectedFriend,
    popUp,
    setPopUp,
    userAccount
}) => {
    const deleteHandler = () => {
        api.delete(`/FriendPushR/${userAccount.userName}/${friend.userName}`).then((res) => {
          //console.log(userAccount.userID);
          //console.log(friend.userID);
            setRefresh(!toFresh);
            //console.log(res);
        });
        
        //why i have to clidk twice??? --- it is because there is a heavy delay when dealing with deleting. so, we need make setRefresh within then
        //setRefresh(!toFresh);
    };

    let navigation = useNavigate();

    return (
        // eslint-disable-next-line react/style-prop-object
        <div
            className="todo"
        >
            <li
                className={`todo-item}`}
                onClick={() => {
                    navigation("/friend/one");
                    setSelectedFriend(friend);
                }}
            >
                {(friend.nickName===null||friend.nickName==="")?friend.userName:friend.nickName}
            </li>
            <button onClick={deleteHandler} className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};

export default SingleFriend;

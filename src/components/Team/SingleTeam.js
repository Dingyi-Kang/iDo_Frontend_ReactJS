import React, { useEffect, useState } from "react";
import api from "../../Helper/api";
import { useNavigate } from "react-router-dom";

const SingleTeam = ({
    team,
    toFresh,
    setRefresh,
    popUp,
    setPopUp,
    userAccount,
    setSelectedTeam,
    editedTeam,
    setEditedTeam,
}) => {
    const [adminStatus, setAdminStatus] = useState(false);

    useEffect(() => {
        //get status for this user for this team
        api.get(`/UserTeamR/admin/${userAccount.userName}/${team.teamID}`).then(
            (res) => {
                setAdminStatus(res.data);
            }
        );
    }, []);

    const deleteHandler = () => {
        api.delete(`/UserTeamR/${userAccount.userName}/${team.teamID}`).then(
            (res) => {
                setRefresh(!toFresh);
            }
        );

        //why i have to clidk twice??? --- it is because there is a heavy delay when dealing with deleting. so, we need make setRefresh within then
        //setRefresh(!toFresh);
    };

    const updateHandler = () => {
        if (editedTeam) {
            setEditedTeam(null);
        } else {
            setEditedTeam((editedTeam) => ({
                ...editedTeam,
                ...team,
            }));
        }
        setRefresh(!toFresh);
    };

    let navigation = useNavigate();

    return (
        //if it is admin, it has edit and delete button.
        //else, it has no button
        
        adminStatus ? (
            // eslint-disable-next-line react/style-prop-object
            <div className="todo">
                <li
                    className={`todo-item}`}
                    onClick={() => {
                        navigation("/team/one");
                        setSelectedTeam(team);
                    }}
                >
                    {team.teamName}
                </li>
                
                <button onClick={updateHandler} className="complete-btn">
                    <i className="fas fa-edit"></i>
                </button>
                <button onClick={deleteHandler} className="trash-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        ) : (
          <div className="todo">
          <li
              className={`todo-item}`}
              onClick={() => {
                  navigation("/team/one");
                  setSelectedTeam(team);
              }}
          >
              {team.teamName}
          </li>
          <button onClick={() => {
                  navigation("/team/one");
                  setSelectedTeam(team);
              }} className="complete-btn">
              <i className="fas fa-sign-in-alt"></i>
          </button>
      </div>
        )
    );
};

export default SingleTeam;

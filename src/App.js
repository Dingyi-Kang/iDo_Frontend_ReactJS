import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import Home from "./pages/Home";
import SideBar from "./components/SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Friend from "../src/pages/Friend";
import Group from "./pages/Group";
import ErrorPage from "./pages/ErrorPage";
import TaskMap from "./pages/TaskMap";
import Team from "./pages/Team";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TaskGroup from "./pages/TaskGroup";
import FriendTask from "./pages/FriendTask";
import TeamTask from "./pages/TeamTask";
import TeamMember from "./components/TeamTask/TeamMember";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [sideBarStatus, setSideBarStatus] = useState(true);
    const [loginStatus, setLoginStatus] = useState(false);
    const [userAccount, setUserAccount] = useState({});
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState({});
    const [editedTask, setEditedTask] = useState(null);
    const [completeStatusFilterValue, setCompleteStatusFilter] =
        useState("all");
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState({});
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState({});
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    //this is used by side bar to refresh the teamMemeberTable page. and in the home page, when user first time log in, refresh the team -- reload in team module
    const [refreshTeam, setRefreshTeam] = useState(false);

    const [savedLocations, setSavedLocations] = useState([]);
    const [refreshLocation, setRefreshLocation] = useState(false);

    const [mappedTodos, setMappedTodos] = useState([]);

    const [startRoute, setStartRoute] = useState(false);

    useEffect(() => {}, []);

    if (!loginStatus) {
        return (
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Login
                                setLoginStatus={setLoginStatus}
                                setUserAccount={setUserAccount}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Register
                                setLoginStatus={setLoginStatus}
                                setUserAccount={setUserAccount}
                            />
                        }
                    />
                </Routes>
            </Router>
        );
    }

    return (
        <Router>
            <div
                className={classNames(
                    "container",
                    sideBarStatus ? "shortLeftSapce" : "longLeftSpace"
                )}
            >
                <SideBar
                    setCompleteStatusFilter={setCompleteStatusFilter}
                    setSideBarStatus={setSideBarStatus}
                    userAccount={userAccount}
                    groups={groups}
                    setGroups={setGroups}
                    setSelectedGroup={setSelectedGroup}
                    setEditedTask={setEditedTask}
                    setSelectedFriend={setSelectedFriend}
                    friends={friends}
                    teams={teams}
                    setSelectedTeam={setSelectedTeam}
                    refreshTeam={refreshTeam}
                    setRefreshTeam={setRefreshTeam}
                    todos={todos}
                    mappedTodos={mappedTodos}
                    setMappedTodos={setMappedTodos}
                    startRoute={startRoute}
                    setStartRoute={setStartRoute}
                />
                <div className="container-item">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    userAccount={userAccount}
                                    groups={groups}
                                    refreshTeam={refreshTeam}
                                    setRefreshTeam={setRefreshTeam}
                                    refreshLocation={refreshLocation}
                                    setRefreshLocation={setRefreshLocation}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            }
                        />
                        <Route
                            path="/account"
                            element={
                                <Account
                                    userAccount={userAccount}
                                    setLoginStatus={setLoginStatus}
                                    setUserAccount={setUserAccount}
                                    savedLocations={savedLocations}
                                    setSavedLocations={setSavedLocations}
                                    refreshLocation={refreshLocation}
                                    setRefreshLocation={setRefreshLocation}
                                />
                            }
                        />
                        <Route
                            path="/friend"
                            element={
                                <Friend
                                    setSelectedFriend={setSelectedFriend}
                                    userAccount={userAccount}
                                    friends={friends}
                                    setFriends={setFriends}
                                />
                            }
                        />
                        <Route
                            path="/friend/one"
                            element={
                                <FriendTask
                                    userAccount={userAccount}
                                    selectedFriend={selectedFriend}
                                    editedTask={editedTask}
                                    setEditedTask={setEditedTask}
                                    completeStatusFilterValue={
                                        completeStatusFilterValue
                                    }
                                    setCompleteStatusFilter={
                                        setCompleteStatusFilter
                                    }
                                />
                            }
                        />
                        <Route
                            path="/group"
                            element={
                                <Group
                                    userAccount={userAccount}
                                    groups={groups}
                                    setGroups={setGroups}
                                    setSelectedGroup={setSelectedGroup}
                                />
                            }
                        />
                        <Route
                            path="/group/one"
                            element={
                                <TaskGroup
                                    userAccount={userAccount}
                                    selectedGroup={selectedGroup}
                                    groups={groups}
                                    editedTask={editedTask}
                                    setEditedTask={setEditedTask}
                                    completeStatusFilterValue={
                                        completeStatusFilterValue
                                    }
                                    setCompleteStatusFilter={
                                        setCompleteStatusFilter
                                    }
                                    savedLocations={savedLocations}
                                />
                            }
                        />
                        <Route
                            path="/team"
                            element={
                                <Team
                                    userAccount={userAccount}
                                    teams={teams}
                                    setTeams={setTeams}
                                    setSelectedTeam={setSelectedTeam}
                                    refreshTeam={refreshTeam}
                                />
                            }
                        />
                        <Route
                            path="/team/one"
                            element={
                                <TeamTask
                                    userAccount={userAccount}
                                    selectedTeam={selectedTeam}
                                    setSelectedTeamMember={
                                        setSelectedTeamMember
                                    }
                                    refreshTeam={refreshTeam}
                                />
                            }
                        />
                        <Route
                            path="/teamMember"
                            element={
                                <TeamMember
                                    userAccount={userAccount}
                                    selectedTeam={selectedTeam}
                                    selectedTeamMember={selectedTeamMember}
                                    refreshTeam={refreshTeam}
                                />
                            }
                        />
                        <Route
                            path="/taskMap"
                            element={
                                <TaskMap
                                    userAccount={userAccount}
                                    mappedTodos={mappedTodos}
                                    setMappedTodos={setMappedTodos}
                                    startRoute={startRoute}
                                    setStartRoute={setStartRoute}
                                />
                            }
                        />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

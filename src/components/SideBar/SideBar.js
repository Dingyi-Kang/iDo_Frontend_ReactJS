import React, { useEffect, useState } from "react";
import { SideBarData } from "./SideBarData";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { BiPalette, BiPaperPlane, BiPlanet } from "react-icons/bi";
import "./SideBar.css";
import api from "/Users/osuappcenter/my-app/src/Helper/api";

function SideBar({
    setSideBarStatus = () => {},
    userAccount,
    groups,
    setSelectedGroup,
    setEditedTask,
    setCompleteStatusFilter,
    friends,
    setSelectedFriend,
    teams,
    setSelectedTeam,
    refreshTeam,
    setRefreshTeam,
    todos,
    mappedTodos,
    setMappedTodos,
    startRoute,
    setStartRoute
}) {
    const [openSideBar, setSideBar] = useState(true);

    const showSideBar = () => {
        setSideBar(!openSideBar);
        setSideBarStatus(!openSideBar);
    };

    const [openGroup, setGroup] = useState(false);
    const showGroup = () => setGroup(!openGroup);

    const [openFriend, setFriend] = useState(false);
    const showFriend = () => setFriend(!openFriend);

    const [openTeam, setTeam] = useState(false);
    const showTeam = () => setTeam(!openTeam);

    const [innerSideBarData, setInnerSideBarData] = useState(SideBarData);

    useEffect(() => {
        const data = [
            ...groups.map((group) => {
                return {
                    name: group.taskGroupName,
                    bgColor: group.taskGroupColor || "#FFF",
                    icon: <BiPalette />,
                    link: "/group/one",
                };
            }),
        ];

        const friendsData = [
            ...friends.map((friend) => {
                return {
                    name: friend.userName,
                    icon: <BiPaperPlane />,
                    link: "/friend/one",
                };
            }),
        ];

        const teamData = [
            ...teams.map((team) => {
                return {
                    name: team.teamName,
                    icon: <BiPlanet />,
                    link: "/team/one",
                };
            }),
        ];

        const newBarData = innerSideBarData.map((v, i) =>
            i === 2
                ? { ...v, subNav: data }
                : i === 3
                ? { ...v, subNav: friendsData }
                : i === 4
                ? { ...v, subNav: teamData }
                : v
        );
        setInnerSideBarData(newBarData);
    }, [groups, friends, teams]);

    useEffect(() => {
        const todosWithLocations = todos.filter(
            (todo) => todo.locationAddr !== null
        );

        const mapData = [
            ...todosWithLocations.map((todo) => {
                return {
                    id: todo.taskID,
                    content: todo.content,
                    addr: todo.locationAddr,
                    checked: false,
                };
            }),
        ];
        setMappedTodos(mapData);
        console.log("mappedTodos", mappedTodos);
    }, [todos]);

    const handleOnChange = (id) => {
        const newMapData = mappedTodos.map((todo) =>
            todo.id === id
                ? {
                      id: todo.id,
                      content: todo.content,
                      addr: todo.addr,
                      checked: !todo.checked,
                  }
                : todo
        );

        setMappedTodos(newMapData);
        console.log("newMappedTodos", mappedTodos);
    };

    const selectAllHandler = () => {
        const newMapData = mappedTodos.map((todo) => ({
            id: todo.id,
            content: todo.content,
            addr: todo.addr,
            checked: true,
        }));

        setMappedTodos(newMapData);
        console.log("newMappedTodos", mappedTodos);
    };

    const clearAllHandler = () => {
        const newMapData = mappedTodos.map((todo) => ({
            id: todo.id,
            content: todo.content,
            addr: todo.addr,
            checked: false,
        }));

        setMappedTodos(newMapData);
        setStartRoute(false)
        console.log("newMappedTodos", mappedTodos);
    };

    const routeHandler =() =>{setStartRoute(!startRoute)}

    let navigation = useNavigate();
    return (
        <div className="menu-box">
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className={openSideBar ? "SideBarHide" : "sideBarButton"}>
                    <FaBars onClick={showSideBar} />
                </div>
                <div className={openSideBar ? "SideBar active" : "SideBarHide"}>
                    <div className="void-space"></div>

                    <div className="sideBarButton">
                        <AiOutlineClose onClick={showSideBar} />
                    </div>
                    <ul className="SideBarList">
                        {innerSideBarData.map((val, key) => {
                            return val.subNav ? (
                                <div>
                                    <li
                                        key={key}
                                        className="row"
                                        id={
                                            window.location.pathname ===
                                            val.link
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() => {
                                            // eslint-disable-next-line no-unused-expressions
                                            window.location.pathname ===
                                            val.link
                                                ? val.title === "Task Group"
                                                    ? showGroup()
                                                    : val.title === "Friends"
                                                    ? showFriend()
                                                    : val.title === "Team"
                                                    ? showTeam()
                                                    : null
                                                : null;

                                            window.location.pathname !==
                                            val.link
                                                ? val.title === "Task Group"
                                                    ? setGroup(true)
                                                    : val.title === "Friends"
                                                    ? setFriend(true)
                                                    : val.title === "Team"
                                                    ? setTeam(true)
                                                    : console.log("")
                                                : console.log("");

                                            navigation(`${val.link}`);
                                        }}
                                    >
                                        <div id="icon">{val.icon}</div>
                                        <div id="title">{val.title}</div>
                                        <div
                                            className={
                                                val.title === "Friends"
                                                    ? openFriend
                                                        ? "subNavToggleUp"
                                                        : "subNavToggle"
                                                    : val.title === "Task Group"
                                                    ? openGroup
                                                        ? "subNavToggleUp"
                                                        : "subNavToggle"
                                                    : val.title === "Team"
                                                    ? openTeam
                                                        ? "subNavToggleUp"
                                                        : "subNavToggle"
                                                    : "subNavToggle"
                                            }
                                        >
                                            {val.subIcon}
                                        </div>
                                    </li>
                                    <ul
                                        className={
                                            val.title === "Friends"
                                                ? openFriend
                                                    ? "sideBarList"
                                                    : "sideBarListHide"
                                                : val.title === "Task Group"
                                                ? openGroup
                                                    ? "sideBarList"
                                                    : "sideBarListHide"
                                                : val.title === "Team"
                                                ? openTeam
                                                    ? "sideBarList"
                                                    : "sideBarListHide"
                                                : "sideBarListHide"
                                        }
                                    >
                                        {val.title === "Task Group"
                                            ? val.subNav.map((item, key) => {
                                                  return (
                                                      <div>
                                                          <li
                                                              key={key}
                                                              className="subRow"
                                                              style={{
                                                                  borderLeftColor:
                                                                      item.bgColor,
                                                              }}
                                                              onClick={() => {
                                                                  navigation(
                                                                      `${item.link}`
                                                                  );
                                                                  setSelectedGroup(
                                                                      groups[
                                                                          key
                                                                      ]
                                                                  );
                                                                  setEditedTask(
                                                                      null
                                                                  );
                                                                  console.log(
                                                                      "setCompleteStatusFilter={setCompleteStatusFilter}"
                                                                  );
                                                                  setCompleteStatusFilter(
                                                                      "all"
                                                                  );
                                                              }}
                                                          >
                                                              <div id="icon">
                                                                  {" "}
                                                                  {
                                                                      item.icon
                                                                  }{" "}
                                                              </div>
                                                              <div id="title">
                                                                  {item.name}
                                                              </div>
                                                          </li>
                                                      </div>
                                                  );
                                              })
                                            : val.title === "Friends"
                                            ? val.subNav.map((item, key) => {
                                                  return (
                                                      <div>
                                                          <li
                                                              key={key}
                                                              className="subRow"
                                                              style={{
                                                                  borderLeftColor:
                                                                      item.bgColor,
                                                              }}
                                                              onClick={() => {
                                                                  navigation(
                                                                      `${item.link}`
                                                                  );
                                                                  setSelectedFriend(
                                                                      friends[
                                                                          key
                                                                      ]
                                                                  );
                                                                  setEditedTask(
                                                                      null
                                                                  );
                                                                  console.log(
                                                                      "setCompleteStatusFilter={setCompleteStatusFilter}"
                                                                  );
                                                                  setCompleteStatusFilter(
                                                                      "all"
                                                                  );
                                                              }}
                                                          >
                                                              <div id="icon">
                                                                  {" "}
                                                                  {
                                                                      item.icon
                                                                  }{" "}
                                                              </div>
                                                              <div id="title">
                                                                  {item.name}
                                                              </div>
                                                          </li>
                                                      </div>
                                                  );
                                              })
                                            : val.subNav.map((item, key) => {
                                                  return (
                                                      <div>
                                                          <li
                                                              key={key}
                                                              className="subRow"
                                                              style={{
                                                                  borderLeftColor:
                                                                      item.bgColor,
                                                              }}
                                                              onClick={() => {
                                                                  navigation(
                                                                      `${item.link}`
                                                                  );
                                                                  setSelectedTeam(
                                                                      teams[key]
                                                                  );
                                                                  setRefreshTeam(
                                                                      !refreshTeam
                                                                  );
                                                              }}
                                                          >
                                                              <div id="icon">
                                                                  {" "}
                                                                  {
                                                                      item.icon
                                                                  }{" "}
                                                              </div>
                                                              <div id="title">
                                                                  {item.name}
                                                              </div>
                                                          </li>
                                                      </div>
                                                  );
                                              })}
                                    </ul>
                                </div>
                            ) : (
                                <>
                                    <li
                                        key={key}
                                        className="row"
                                        id={
                                            window.location.pathname ===
                                            val.link
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            navigation(`${val.link}`)
                                        }
                                    >
                                        <div id="icon"> {val.icon} </div>
                                        <div id="title">{val.title}</div>
                                        <div className="subNavToggleVoid"></div>
                                    </li>

                                    {val.title === "TaskMap" ? (
                                        <fieldset className={window.location.pathname ===
                                          val.link?"mapTodoContainer": "mapTodoContainer mapTodoContainer-hidden"}>
                                            {mappedTodos.map((todo) => {
                                                return (
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id={todo.id}
                                                            name="mappedTodo"
                                                            value={todo.addr}
                                                            checked={
                                                                todo.checked
                                                            }
                                                            onChange={() =>
                                                                handleOnChange(
                                                                    todo.id
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            for={todo.id}
                                                            className="mapTodoContent"
                                                        >
                                                            {todo.content}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="mapEdit-btn"
                                                    onClick={selectAllHandler}
                                                >
                                                    Select All
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="mapEdit-btn2"
                                                    onClick={clearAllHandler}
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                            <div></div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="maproute-btn"
                                                    onClick={routeHandler}
                                                >
                                                    {startRoute?"Stop Routing":"Get the Route"}
                                                </button>
                                            </div>
                                        </fieldset>
                                    ) : (
                                        <div></div>
                                    )}
                                </>
                            );
                        })}
                    </ul>
                </div>
            </IconContext.Provider>
        </div>
    );
}

export default SideBar;

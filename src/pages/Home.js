import React, { useEffect, useState } from "react";
import Form from "../components/Todo/Form";
import TodoList from "../components/Todo/TodoList";
import api from "../Helper/api";

function Home({
    userAccount,
    groups,
    refreshTeam,
    setRefreshTeam,
    refreshLocation,
    setRefreshLocation,
    todos,
    setTodos
}) {
    //why <Form setInputText={setInputText}/>
    //this is mysterious to me
    //You can only pass states and props downward but upward.
    //this is a string
    const [inputText, setInputText] = useState("");
    //this is an array of objects
    

    const [toFresh, setRefresh] = useState(false);
    const [editedTask, setEditedTask] = useState(null);

    //all is the default
    const [completeStatusFilterValue, setCompleteStatusFilter] =
        useState("all");

    //with [] being empty, this works like constructor for a function component
    useEffect(() => {
        setRefreshTeam(!refreshTeam);
        setRefreshLocation(!refreshLocation)
        api.get(`/realAllTodos/${userAccount.userName}`).then((tasks) => {
            setTodos(tasks.data);
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
                    Todo List
                </h1>
            </header>
            <Form
                userAccount={userAccount}
                inputText={inputText}
                setInputText={setInputText}
                setCompleteStatusFilter={setCompleteStatusFilter}
                toFresh={toFresh}
                setRefresh={setRefresh}
                editedTask={editedTask}
                setEditedTask={setEditedTask}
                groups={groups}
            />
            <TodoList
                userAccount={userAccount}
                todos={todos}
                completeStatusFilterValue={completeStatusFilterValue}
                toFresh={toFresh}
                setRefresh={setRefresh}
                editedTask={editedTask}
                setEditedTask={setEditedTask}
            />
        </div>
    );
}

export default Home;

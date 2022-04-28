import { useState, useEffect } from "react";
import { Card, Button, Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../Helper/api";

function Account({
    userAccount,
    setLoginStatus,
    setUserAccount,
    savedLocations,
    setSavedLocations,
    refreshLocation,
    setRefreshLocation
}) {
    const [inputText, setInputText] = useState("");
    //0 is not editing, 1 is editing userNaem, 2 is editing nickName, 3 is editing location
    const [editing, setEditMode] = useState(0);
    const [errMsg, setErrMsg] = useState("");
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");

    let navigation = useNavigate();

    useEffect(() => {
        api.get(`/locations/${userAccount.userName}`).then((res) => {
            setSavedLocations(res.data);
        });
    }, [refreshLocation]);

    useEffect(() => {
        setInputText("");
    }, [editing]);

    const inputTextHandler = (e) => {
        //console.log(e.target.value);
        //passing that information in here
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        //e.preventDefault();
        //if userNickName is changerd
        if (editing === 1) {
            //first, search if this user has been created
            try {
                const response = await api.put(
                    `/user/${userAccount.userName}`,
                    {
                        password: userAccount.password,
                        nickName: inputText,
                    }
                );
                console.log(response?.data);
                if (response?.data === null) {
                    setErrMsg("No such account");
                } else {
                    setUserAccount((userAccount) => ({
                        ...userAccount,
                        ...response?.data,
                    }));
                    setEditMode(0);
                    setInputText("");
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg("No Server Response");
                } else if (err.response?.status === 400) {
                    setErrMsg("Missing Username or Password");
                } else if (err.response?.status === 401) {
                    setErrMsg("Unauthorized");
                } else if (err.response?.status === 404) {
                    setErrMsg("No Such Account");
                } else {
                    setErrMsg("Login Failed");
                }
            }
        }
        //if it is editing password
        else if (editing === 2) {
            //TODO: should show dot
        }
    };


    const removeLocationHandler = (locationID) =>{
      console.log("Removed location: " +locationID);
      api.delete(`/locations/${locationID}`).then(
          (res) => {
            setRefreshLocation(!refreshLocation)
          }
      );
    }

    return (
        <>
            <div>
                <h1>Your account information</h1>
                <Card title="User Name">
                    {userAccount.userName}{" "}
                    <Button
                        type="link"
                        onClick={() => {
                            editing === 2 ? setEditMode(0) : setEditMode(2);
                        }}
                    >
                        {editing === 2 ? "Cancel Edit" : "Change Password"}
                    </Button>
                </Card>
                ;
                <Card title="User Nickname">
                    {userAccount.nickName === null ||
                    userAccount.nickName === ""
                        ? "N/A"
                        : userAccount.nickName}
                    <Button
                        type="link"
                        onClick={() => {
                            editing === 1 ? setEditMode(0) : setEditMode(1);
                            setInputText(userAccount.nickName);
                        }}
                    >
                        {editing === 1 ? "Cancel Edit" : "Edit"}
                    </Button>
                </Card>
                ;
                <Card title="Saved Locations">
                    {savedLocations.map((location) => {
                        return (
                            <div>
                                {location.formattedAddr}
                                <Button
                                    type="link"
                                    onClick={() => {
                                       removeLocationHandler(location.relationID);
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        );
                    })}
                </Card>
                ;
                <Button
                    type="primary"
                    className="signout"
                    onClick={() => {
                        setUserAccount((userAccount) => ({
                            ...userAccount,
                            ...{},
                        }));
                        setLoginStatus(false);
                        navigation("/");
                    }}
                >
                    Sign Out
                </Button>
            </div>

            {editing !== 0 && editing !== 2 ? (
                <div className="site-input-group-wrapper">
                    <Input.Group compact>
                        <Input
                            style={{
                                width: "calc(100% - 200px)",
                                height: "60px",
                                font: "20px",
                            }}
                            defaultValue={inputText}
                            onChange={inputTextHandler}
                        />
                        <Button
                            className="input"
                            style={{ height: "60px" }}
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Submit
                        </Button>
                    </Input.Group>

                    {errMsg !== "" ? (
                        <Input
                            style={{
                                width: "calc(100% - 200px)",
                                height: "30px",
                                font: "18px",
                            }}
                            defaultValue={errMsg}
                        />
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : editing === 2 ? (
                <Space direction="vertical">
                    <Input.Password placeholder="input current password" />
                    <Input.Password
                        placeholder="input new password"
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                    <Button>Submit</Button>

                    {errMsg !== "" ? (
                        <Input
                            style={{
                                width: "calc(100% - 200px)",
                                height: "30px",
                                font: "18px",
                            }}
                            defaultValue={errMsg}
                        />
                    ) : (
                        <div></div>
                    )}
                </Space>
            ) : (
                <div></div>
            )}
        </>
    );
}

export default Account;

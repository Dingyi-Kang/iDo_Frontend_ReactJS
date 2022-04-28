/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Space, Tag } from "antd";
import api from "/Users/osuappcenter/my-app/src/Helper/api";

const TeamTable = ({
    userAccount,
    members,
    setSelectedTeamMember,
    teamUncompleteReports,
    teamCompleteReports,
    selectedTeam,
    allTeamRelations,
    toFresh,
    setRefresh,
}) => {
    let navigation = useNavigate();

    const userAdminRelations = allTeamRelations.filter(
        (relation) => relation.user.userName === userAccount.userName
    );

    var userAdminStatus = false;
    if (userAdminRelations.length > 0) {
        userAdminStatus = userAdminRelations[0].adminStatus;
    }

    var dataSource = [
        ...members.map((member, key) => {
            const completedTaskReports = teamCompleteReports.filter(
                (rep) => rep.userName === member.userName
            );

            const uncompletedTaskReports = teamUncompleteReports.filter(
                (rep) => rep.userName === member.userName
            );

            const relations = allTeamRelations.filter(
                (relation) => relation.user.userName === member.userName
            );

            var adminStatus;

            if (relations.length === 0) {
                adminStatus = false;
            } else {
                adminStatus = relations[0].adminStatus;
            }

            var completedTaskReportCount;
            var uncompletedTaskReportCount;
            if (completedTaskReports.length === 0) {
                completedTaskReportCount = 0;
            } else {
                completedTaskReportCount = completedTaskReports[0].count;
            }

            if (uncompletedTaskReports.length === 0) {
                uncompletedTaskReportCount = 0;
            } else {
                uncompletedTaskReportCount = uncompletedTaskReports[0].count;
            }

            return {
                name: member.userName,
                tags: [
                    completedTaskReportCount,
                    uncompletedTaskReportCount,
                    member.userName,
                    "bla",
                ],
                status: adminStatus,
                index: key,
                key: member.userName,
            };
        }),
    ];

    const removeHandler = (member) => {
        console.log("Edited Username:" + member.userName);
        api.delete(`/UserTeamR/${member.userName}/${selectedTeam.teamID}`).then(
            (res) => {
                setRefresh(!toFresh);
                //setEditedMember(null);
            }
        );
    };

    const addAdminHandler = (member) => {
        console.log("Edited Username:" + member.userName);
        api.put(
            `/UserTeamR/asveAdmin/${member.userName}/${selectedTeam.teamID}`
        ).then((res) => {
            setRefresh(!toFresh);
            //setEditedMember(null);
        });
    };

    const columns = [
        {
            title: "Team members",
            dataIndex: "name",
            key: "name",
            render: (name, record) => (
                <a
                    onClick={() => {
                        navigation("/teamMember");
                        setSelectedTeamMember(members[record.index]);
                    }}
                >
                    {name}
                </a>
            ),
        },
        {
            title: "Todos",
            key: "tags",
            dataIndex: "tags",
            render: (tags) => (
                <>
                    {
                        <Tag color={"green"} key={tags[2]}>
                            {tags[0]}
                        </Tag>
                    }
                    {
                        <Tag color={"volcano"} key={tags[3]}>
                            {tags[1]}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) =>
                record.status === false && userAdminStatus === true ? (
                    <Space size="middle">
                        <a
                            onClick={() => {
                                navigation("/teamMember");
                                setSelectedTeamMember(members[record.index]);
                            }}
                        >
                            View detail
                        </a>
                        <a
                            onClick={() => {
                                addAdminHandler(members[record.index]);
                            }}
                        >
                            Add as admin
                        </a>
                        <a
                            onClick={() => {
                                removeHandler(members[record.index]);
                            }}
                        >
                            Remove from team
                        </a>
                    </Space>
                ) : (
                    <Space size="middle">
                        <a
                            onClick={() => {
                                navigation("/teamMember");
                                setSelectedTeamMember(members[record.index]);
                            }}
                        >
                            View detail
                        </a>
                        {record.name === userAccount.userName ? (
                            <div>
                                {" "}
                                <a
                                    onClick={() => {
                                        removeHandler(members[record.index]);
                                    }}
                                >
                                    Leave this team
                                </a>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </Space>
                ),
        },
    ];

    return <Table columns={columns} dataSource={dataSource} />;
};

export default TeamTable;

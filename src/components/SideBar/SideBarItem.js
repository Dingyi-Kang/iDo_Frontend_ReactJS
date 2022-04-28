import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SideBarItem(val, key) {
  const [openNavBar, setNavBar] = useState(false);
  const showSubNav = () => setNavBar(!openNavBar);
  let navigation = useNavigate();
  if (val.subNav) {
    return (
      <div>
        <li
          key={key}
          className="row"
          id={window.location.pathname == val.link ? "active" : ""}
          onClick={() => navigation(`${val.link}`)}
        >
          <div id="icon" onClick={showSubNav}>
            {val.icon}
          </div>
          <div id="title" onClick={showSubNav}>
            {val.title}
          </div>
          <div className="subNavToggle  up">{val.subIcon}</div>
        </li>
        <ul className={openNavBar ? "sideBarList" : "sideBarListHide"}>
          {val.subNav.map((item, key) => {
            return (
              <div>
                <li
                  key={key}
                  className="subRow"
                  onClick={() => navigation(`${val.link}`)}
                >
                  <div id="icon"> {item.icon} </div>
                  <div id="title">{item.name}</div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <li
        key={key}
        className="row"
        id={window.location.pathname == val.link ? "active" : ""}
        onClick={() => navigation(`${val.link}`)}
      >
        <div id="icon"> {val.icon} </div>
        <div id="title" onClick={showSubNav}>
          {val.title}
        </div>
        <div className={openNavBar ? "subNavToggle up" : "subNavToggle"}>
          {val.subNav ? val.subIcon : null}
        </div>
      </li>
    );
  }
}

export default SideBarItem;

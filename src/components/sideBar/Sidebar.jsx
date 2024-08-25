import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const { prevPrompt, onSend, setResendPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setResendPrompt(prompt);
    await onSend(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={assets.menu_icon}
          alt=""
          className="menu"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {toggleSidebar ? <p>New Chat</p> : null}
        </div>
        {toggleSidebar ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(item)}
                >
                  <img src={assets.message_icon} alt="" />

                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {toggleSidebar ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {toggleSidebar ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {toggleSidebar ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

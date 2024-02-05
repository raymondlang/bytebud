import React, { useEffect, useState } from "react";
import { useHistory, Link, Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./channels.css";
import {
  getServerChannels,
  getChannelDetails,
  createChannel,
} from "../../store/channels";
import { getServer } from "../../store/server";
import OpenModalButton from "../OpenModalButton";
import NewChannel from "../CreateChannel";
import "./channels.css";

// Create logic for if user

function Channels() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();

  let allChannels = useSelector((state) => state.channels.currServerChannels);
  let currChannel = useSelector((state) => state.channels.oneChannel);
  let currServer = useSelector((state) => state.server.currentServer);

  const [showModal, setShowModal] = useState(false);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    dispatch(getServerChannels(serverId));
    dispatch(getChannelDetails(channelId));
    dispatch(getServer(serverId));
  }, [dispatch, serverId, channelId]);

  if (!allChannels) allChannels = [];
  else allChannels = Object.values(allChannels);
  if (!currServer) currServer = {};
  else currServer = currServer[1];

  if (!currChannel) currChannel = {};
  else currChannel = currChannel;

  const handleCreateChannel = (e) => {
    e.preventDefault();
    dispatch(createChannel(serverId, channelName));
    setShowModal(false);
    setChannelName("");
  };

  return (
    <div className="channel-sidebar">
      {currServer && (
        <div className="server-name-container">
          <span className="server-name-text">{currServer.name}</span>
        </div>
      )}
      <div className="text-channels-container">
        <span className="text-channels">TEXT CHANNELS</span>
        <div className="modal-new-channel">
          <OpenModalButton
            buttonText="+"
            modalComponent={<NewChannel serverId={serverId} />}
          />
        </div>
      </div>
      {allChannels.map((channel) => (
        <Link
          key={channel.id}
          to={`/channels/${channel.serverId}/${channel.id}`}
          className={`channel-divs${
            channel.id === currChannel?.id ? " selected" : ""
          }`}
        >
          <span
            className={`hashtag${
              channel.id === currChannel?.id ? " selected" : ""
            }`}
          >
            #
          </span>
          <span
            className={`channel-text-name${
              channel.id === currChannel?.id ? " selected" : ""
            }`}
          >
            {channel.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Channels;

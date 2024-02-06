import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  getUpdatedChannel,
  updateChannel,
  removeChannel,
  getServerChannels,
} from "../../store/channels";
import "./update-channel.css";

function UpdateChannel({ channelId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();
  const updatedChannel = useSelector((state) => state.channels.updatedChannel);

  useEffect(() => {
    dispatch(getUpdatedChannel(channelId));
  }, [dispatch, channelId]);

  useEffect(() => {
    if (updatedChannel) setName(updatedChannel.name);
  }, [updatedChannel]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await dispatch(updateChannel(channelId, name));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      dispatch(getServerChannels(updatedChannel.serverId));
    }
  };

  return (
    <div className="channel-update-form-container">
      <form className="channel-update-form">
        <h2 className="channel-update-form-title">Update Channel</h2>
        {errors.length > 0 && (
          <ul className="channel-update-form-errors">
            {errors.map((error, idx) => (
              <li key={idx} className="channel-update-form-error">
                {error}
              </li>
            ))}
          </ul>
        )}
        <div className="channel-update-form-field">
          <label htmlFor="name" className="channel-update-form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="channel-update-form-input"
          />
        </div>
        <button
          type="submit"
          className="channel-update-form-submit"
          onClick={handleUpdate}
        >
          Update Channel
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="channel-update-form-cancel"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateChannel;

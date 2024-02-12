import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteServer, getServers } from "../../store/server";
import "./ServerDelete.css";

function ServerDeleteModal({ server }) {
  console.log(server);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [server_picture, setServerPicture] = useState("");
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await dispatch(deleteServer(server.id));
      await dispatch(getServers(user));
      closeModal();
      history.push(`/channels/@me`);
    } catch (response) {
      const data = await response.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const handleNo = () => {
    closeModal();
  };

  return (
    <div>
      <div>
        <h1>Delete '{server.name}'</h1>
      </div>
      <div>
        <p>
          Are you sure you want to delete {server.name}? This action cannot be
          undone.
        </p>
      </div>
      <div>
        <span>
          <button onClick={handleDelete}>Yes</button>
        </span>
        <span>
          <button onClick={handleNo}>No</button>
        </span>
      </div>
    </div>
  );
}

export default ServerDeleteModal;

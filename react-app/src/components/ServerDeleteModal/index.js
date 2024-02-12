import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteServer } from "../../store/server";
import "./ServerDelete.css";

function ServerDeleteModal({ server }) {
  console.log(server);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  o;
  const [server_picture, setServerPicture] = useState("");
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteServer(server.id)).then(closeModal);
  };

  const handleNo = () => {
    closeModal();
  };

  return (
    <div>
      <div>
        <h1>Confirm Delete</h1>
      </div>
      <div>
        <p>Are you sure you want to remove this spot from the listings?</p>
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

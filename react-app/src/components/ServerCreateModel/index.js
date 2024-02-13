import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./CreateServer.css";
import { addServer } from "../../store/server";

function ServerCreateModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [server_picture, setServerPicture] = useState("");
  const [errors, setErrors] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const { closeModal } = useModal();

  const user = useSelector((state) => state.session.user);

  const validateForm = (newServer) => {
    let err = {};

    if (newServer.name === "") {
      err.name = "Server Name is required";
    }

    if (newServer.server_picture === null) {
      newServer.server_picture = "";
    }

    if (
      newServer.server_picture !== "" &&
      !(
        newServer.server_picture.endsWith(".jpg") ||
        newServer.server_picture.endsWith(".jpeg") ||
        newServer.server_picture.endsWith(".png")
      )
    ) {
      err.serverImage = "Server Image must end in .jpg, .jpeg, or .png";
    }

    setFormErrors({ ...err });
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.alert("hi");

    let newServer = {
      name: name,
      description: description,
      owner_id: user.id,
      server_picture: server_picture,
    };

    try {
      let createdServer = await dispatch(addServer(newServer, user.username));
      if (createdServer) {
        history.push(
          `/channels/${createdServer.id}/${createdServer.channels[0].id}`
        );
        closeModal();
      }
    } catch (response) {
      const data = await response.json();
      if (data && data.errors) setErrors(data.errors);
    }

    // if (password === confirmPassword) {
    // 	const data = await dispatch(signUp(username, email, password));
    // 	if (data) {
    // 		setErrors(data);
    // 	} else {
    // 		closeModal();
    // 	}
    // } else {
    // 	setErrors([
    // 		"Confirm Password field must be the same as the Password field",
    // 	]);
    // }
  };

  return (
    <>
      <div className="create-server-page">
        <div className="create-server-modal">
          <h1 className="create-server-header">Create A Server </h1>
          <p className="create-server-para">
            Your server is where your and your friends hang out. Make yours and
            start talking.{" "}
          </p>
          <form className="create-server-form" onSubmit={handleSubmit}>
            <h1 className="create-server-header">Create A Server </h1>
            <p className="create-server-para">
              Your server is where your and your friends hang out. Make yours
              and start talking.{" "}
            </p>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="create-server-form-group">
              <label className="create-server-form-label">Description</label>
              <br></br>
              <textarea
                className="create-server-form-input"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="create-server-form-group">
              <span className="create-server-form-label">Server Image</span>
              <br></br>
              <input
                className="create-server-form-input"
                type="text"
                id="server_picture"
                value={server_picture}
                onChange={(e) => setServerPicture(e.target.value)}
                required
              />
            </div>

            <div>
              <button className="create-server-form-button" type="submit">
                Create Server
              </button>
              <span onClick={closeModal} className="channel-update-form-cancel">
                Cancel
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ServerCreateModal;

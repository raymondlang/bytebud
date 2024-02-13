import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

// Create logic for if user

export default function Home() {
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  // (user === null ? history.push(`/channels/@me`) : history.push("/login"))

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    } else {
      history.push("/channels/@me");
    }
  }, [history, user]);

  console.log(user);

  return null;
}

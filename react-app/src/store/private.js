// ----------------------------------- constants  ----------------------------------------
const LOAD_DMS = "private/LOAD_DMS";
const LOAD_DM_MESSAGES = "private/LOAD_DM_MESSAGES";
const CLEAR_DM_MESSAGES = "private/CLEAR_DM_MESSAGES";
const CREATE_DM_REACTION = "private/CREATE_DM_REACTION";
const DELETE_DM_REACTION = "private/DELETE_DM_REACTION";

// ----------------------------------- action creators   ---------------------------------
const loadAllDMs = (directMessages) => ({
  type: LOAD_DMS,
  directMessages,
});

const dmMessages = (messages) => ({
  type: LOAD_DM_MESSAGES,
  messages,
});

export const clearDMMessages = () => ({
  type: CLEAR_DM_MESSAGES,
});

const createDMReaction = (reaction) => ({
  type: CREATE_DM_REACTION,
  reaction,
});

const deleteDMReaction = (reactionId, messageId) => ({
  type: DELETE_DM_REACTION,
  reactionId,
  messageId,
});

// ----------------------------------- thunks  ----------------------------------------

export const loadAllDmsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/private/dms/${userId}`);

  if (res.ok) {
    let data = await res.json();
    dispatch(loadAllDMs(data));
    return data;
  }
};

export const loadDMMessagesThunk = (dmId) => async (dispatch) => {
  const res = await fetch(`/api/private/messages/${dmId}`);

  if (res.ok) {
    let data = await res.json();
    dispatch(dmMessages(data));
    return data;
  }
};

export const createDMReactionThunk =
  (emoji, messageId, userId) => async (dispatch) => {
    const res = await fetch("/api/emojis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emojiId: emoji,
        messageId: messageId,
        userId: userId,
      }),
    });

    if (res.ok) {
      const newDMReaction = await res.json();
      dispatch(createDMReaction(newDMReaction));
      return newDMReaction;
    }
  };

export const deleteDMReactionThunk =
  (reactionId, messageId) => async (dispatch) => {
    const res = await fetch(`/api/emojis/${reactionId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      dispatch(deleteDMReaction(reactionId, messageId));
      return "Successfully deleted!";
    }
  };

// ----------------------------------- reducer  ----------------------------------------
let initialState = {
  allDMs: {},
  currentDM: {},
};

export default function privateReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_DMS:
      newState = { ...state, allDMs: {} };
      action.directMessages.forEach((dm) => {
        newState.allDMs[dm.id] = dm;
      });
      return newState;

    case LOAD_DM_MESSAGES:
      newState = { ...state, currentDM: {} };
      action.messages.forEach((message) => {
        newState.currentDM[message.id] = message;
      });
      return newState;

    case CLEAR_DM_MESSAGES:
      newState = { ...state, currentDM: {} };
      return newState;

    case CREATE_DM_REACTION:
      newState = { ...state, currentDM: { ...state.currentDM } };
      newState.currentDM[action.reaction.messageId].reactions.push(
        action.reaction
      );
      return newState;

    case DELETE_DM_REACTION:
      newState = { ...state, currentDM: { ...state.currentDM } };
      newState.currentDM[action.messageId].reactions.filter(
        (reaction) => reaction.id === action.reactionId
      );
      return newState;

    default:
      return state;
  }
}

//types
const LOAD_MESSAGES = "messages/LOAD_MESSAGES";
const ADD_MESSAGE = "messages/ADD_MESSAGE";
const CREATE_REACTION = "emojis/CREATE_REACTION";
const DELETE_REACTION = "emojis/DELETE_REACTION";
const CLEAR_MESSAGES = "messages/CLEAR_MESSAGES";

// const EDIT_MESSAGE = 'messages/EDIT_MESSAGE';

// POJO action creators:

const loadMessages = (messages) => ({
  type: LOAD_MESSAGES,

  messages,
});

const addMessage = (message) => ({
  type: ADD_MESSAGE,

  message,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

const createReaction = (reaction) => ({
  type: CREATE_REACTION,
  reaction,
});

const deleteReaction = (reactionId, messageId) => ({
  type: DELETE_REACTION,
  reactionId,
  messageId,
});
// const editMessage = message => ({

//     type: EDIT_MESSAGE,

//     message

// });

// thunk action creators:

export const getChannelMessages = (channelId) => async (dispatch) => {
  let resMessages;
  try {
    resMessages = await fetch(`/api/channels/${channelId}/messages`);
  } catch (error) {
    console.error("Failed to fetch channel messages", error);
  }
  if (resMessages.ok) {
    const channelMessages = await resMessages.json();
    dispatch(loadMessages(channelMessages));
  }
};

export const createMessage = (message) => async (dispatch) => {
  const resMessage = await fetch(`/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (resMessage.ok) {
    const message = await resMessage.json();
    dispatch(addMessage(message));
    return message;
  }
};

// export const updateMessage = (message, messageId) => async dispatch => {

// };
export const createReactionThunk =
  (emoji, messageId, userId) => async (dispatch) => {
    const response = await fetch("/api/emojis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emojiId: emoji,
        messageId: messageId,
        userId: userId,
      }),
    });

    if (response.ok) {
      const newReaction = await response.json();
      //   console.log('new reaction created if response.ok', newReaction)

      //   console.log('newreaction, did switching the URL work?', newReaction)

      dispatch(createReaction(newReaction));
      return newReaction;
    }
  };

export const deleteReactionThunk =
  (reactionId, messageId) => async (dispatch) => {
    const response = await fetch(`/api/emojis/${reactionId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      dispatch(deleteReaction(reactionId, messageId));
      return "successfully deleted!";
    }
  };
// initial state for reducer:

const initialState = { messages: null };

// reducer:

const messageReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_MESSAGES:
      const messagesArr = Object.values(action.messages);
      messagesArr.forEach((message) => {
        newState[message.id] = message;
      });
      return newState;
    case ADD_MESSAGE:
      newState = { ...state };
      newState[action.message.id] = action.message;
      return newState;
    // case EDIT_MESSAGE:
    //     return {

    //     }
    case CREATE_REACTION:
      newState = { ...state };
      newState[action.reaction.messageId].reactions.push(action.reaction);
      return newState;
    case DELETE_REACTION:
      newState = { ...state };
      delete newState[action.messageId].reactions[action.reactionId];
      return newState;
    case CLEAR_MESSAGES:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default messageReducer;

const SET_VOTES = 'vote/SET_VOTES';
const ADD_VOTE = 'vote/ADD_VOTE';
const DELETE_VOTE = 'vote/DELETE_VOTE';
const UPDATE_VOTE = 'vote/UPDATE_VOTE';

export const setVotesAction = (votes) => ({
  type: SET_VOTES,
  payload: votes
});

export const addVoteAction = (newVote) => ({
  type: ADD_VOTE,
  payload: newVote
});

export const deleteVoteAction = (voteId) => ({
  type: DELETE_VOTE,
  payload: voteId
});

export const updateVoteAction = (updateVote) => ({
  type: UPDATE_VOTE,
  payload: updateVote
});

const initialState = {
  votes: []
};

export default function (state = initialState, action) {
  switch(action.type) {
    case ADD_VOTE: {
      return {
        ...state,
        votes: state.votes.concat(action.payload)
      }
    }
    case SET_VOTES: {
      return {
        ...state,
        votes: action.payload
      }
    }
    case DELETE_VOTE: {
      return {
        ...state,
        votes: state.votes.filter(({ id }) => id !== action.payload)
      }
    }
    case UPDATE_VOTE: {
      return {
        ...state,
        votes: state.votes.map((vote) => vote.id === action.payload.id ? action.payload : vote)
      }
    }
    default: return state;
  }
}
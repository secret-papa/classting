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
    default: return state;
  }
}
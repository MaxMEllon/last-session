import _ from 'lodash'
import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { routerReducer as router } from 'react-router-redux'
import * as actions from '~/actions'
import List from '~/models/List'
import Comment from '~/models/Comment'
import data from '~/constants/slide.json'

export const initialState = {
  currentPage: {
    page: _.first(data.pages),
    index: 0,
  },
  socket: {
    instance: null,
  },
  comments: {
    list: new List(),
  },
}

const currentPage = createReducer(
  {
    [actions.changePage]: (_1, payload) => payload,
  },
  initialState.currentPage,
)

const socket = createReducer(
  {
    [actions.connectToServer]: (state, payload) =>
      state.instance?.connected !== payload.instance?.connected ? payload : state,
  },
  initialState.socket,
)

const comments = createReducer(
  {
    [actions.recieveComment]: (state, payload) => {
      const comment = new Comment(payload.comment)
      return { list: state.list.push(comment) }
    },
    [actions.disposeComment]: (state, payload) => {
      console.log(state.list)
      return { list: state.list.remove(payload.id) }
    },
  },
  initialState.comments,
)

export default combineReducers({
  currentPage,
  router,
  socket,
  comments,
})

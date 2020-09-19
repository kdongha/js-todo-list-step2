import {FAILURE, SUCCESS} from './constant.js'
import {actionCreator} from "./redux.js";

const SET_STATUS = 'setStatus';
const SET_USER_LIST = 'setUserList';
const SET_USER_ID = 'setUserId';
const SET_APP = 'setApp';
const SET_TODO_LIST = 'setTodoList';
const ADD_USER = 'addUser';

export const setStatus = ({status}) => actionCreator(SET_STATUS,{status});
export const setUserList = ({userList, selectedUserId}) => actionCreator(SET_USER_LIST,{userList, selectedUserId});
export const setApp = ({userList, selectedUserId, todoList}) => actionCreator(SET_APP,{userList, selectedUserId, todoList});
export const setUserId = ({selectedUserId}) => actionCreator(SET_USER_ID, {selectedUserId});
export const setTodoList = ({todoList}) => actionCreator(SET_TODO_LIST, {todoList});
export const addUser = ({user}) => actionCreator(ADD_USER,{user});

const initState = {
	status: '',
	userList: [],
	todoList:[],
	selectedUserId: null,
}

const reducer = (state = initState, {type, payload}) => {
	switch (type) {
		case SET_STATUS: {
			const {status} = payload;
			return {
				...state,
				status
			}
		}
		case SET_USER_LIST: {
			const {userList, selectedUserId} = payload;
			return {
				...state,
				userList,
				selectedUserId,
			}
		}
		case SET_APP: {
			const {userList, selectedUserId, todoList} = payload;
			return {
				...state,
				status: SUCCESS,
				selectedUserId,
				userList,
				todoList,
			}
		}
		case SET_USER_ID: {
			const {selectedUserId} = payload;
			return {
				...state,
				selectedUserId
			}
		}
		case SET_TODO_LIST: {
			const {todoList} = payload;
			return {
				...state,
				todoList,
			}
		}
		case ADD_USER: {
			const {user} = payload;
			return {
				...state,
				userList: [...state.userList, user],
			};
		}
		default:
			return state;
	}
}

export default reducer;
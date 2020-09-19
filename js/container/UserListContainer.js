import {addUser, setStatus, setTodoList, setUserId} from "../reducer.js";
import UserList from "../components/UserList.js";
import {PENDING, SUCCESS} from "../constant.js";
import {getTodoList, createUser} from "../api/index.js";

function UserListContainer($dom, store) {
    let prevSelectedUserId;
    let prevUserList;

    $dom.addEventListener('click', async ({target: {dataset}}) => {
        const {userId, role} = dataset;
        switch (role){
            case 'select':{
                store.dispatch(setUserId({selectedUserId:userId}));
                store.dispatch(setStatus({status:PENDING}));
                const todoList = await getTodoList(userId);
                store.dispatch(setTodoList({todoList}));
                store.dispatch(setStatus({status:SUCCESS}));
                break;
            }
            case 'create': {
                store.dispatch(setStatus({status:PENDING}));
                const userName = window.prompt('username?');
                const {_id, todoList, name} = await createUser(userName);
                store.dispatch(addUser({user:{_id, name}}));
                store.dispatch(setUserId({selectedUserId:_id}))
                store.dispatch(setTodoList({todoList}));
                store.dispatch(setStatus({status:SUCCESS}));
            }
        }

    })

    return () => {
        const {selectedUserId, userList} = store.getState();
        if (prevSelectedUserId !== selectedUserId || prevUserList !== userList) {
            prevSelectedUserId = selectedUserId;
            prevUserList = userList;
            $dom.innerHTML = UserList({userList, selectedUserId});
        }
    }
}

export default UserListContainer;

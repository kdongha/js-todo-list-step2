import {setTodoItem, setTodoList, toggleTodoItem} from "../reducer.js";
import TodoList from "../components/TodoList.js";
import {deleteTodoItem, toggleTodoItemComplete} from "../api/index.js";
import TodoSkeleton from '../components/TodoSkeleton.js';
import {PENDING, SUCCESS} from "../constant.js";

function TodoListContainer($dom, store) {
    let prevStatus;
    let prevTodoList;

    $dom.addEventListener('change', async ({target:{dataset}}) => {
        const {id:targetId} = dataset;
        const {selectedUserId} = store.getState();
        const todoItem = await toggleTodoItemComplete(selectedUserId, targetId);
        store.dispatch(setTodoItem({todoItem}));
    })

    $dom.addEventListener('click', async ({target:{dataset}}) => {
        const {role, id:targetId} = dataset;
        if(role==='delete'){
            const {selectedUserId} = store.getState();
            const {todoList} = await deleteTodoItem(selectedUserId, targetId);
            store.dispatch(setTodoList({todoList}));
        }
    })

    $dom.addEventListener('dblclick', ({target:{dataset}})=>{
        const {id:todoItemId} = dataset;
        store.dispatch(toggleTodoItem({todoItemId}))
    })

    $dom.addEventListener('keyup', ({target:{dataset},key})=>{
        const {id:todoItemId} = dataset;
        switch (key){
            case 'Escape':
                store.dispatch(toggleTodoItem({todoItemId}))
        }
    })

    return () => {
        const {status, todoList} = store.getState();
        if (prevStatus !== status || prevTodoList !== todoList) {
            prevStatus = status;
            prevTodoList = todoList;
            switch (status) {
                case PENDING: {
                    $dom.innerHTML = TodoSkeleton();
                    break;
                }
                case SUCCESS: {
                    $dom.innerHTML = TodoList({todoList});
                    break;
                }
            }
        }
    }
}

export default TodoListContainer;

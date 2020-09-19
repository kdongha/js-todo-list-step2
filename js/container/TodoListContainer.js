import {setTodoItem, setTodoList, toggleTodoItem} from "../reducer.js";
import TodoList from "../components/TodoList.js";
import {deleteTodoItem, toggleTodoItemComplete , updateTodoItem} from "../api/index.js";
import TodoSkeleton from '../components/TodoSkeleton.js';
import {PENDING, SUCCESS} from "../constant.js";

function TodoListContainer($dom, store) {
    let prevFilter;
    let prevStatus;
    let prevTodoList;

    $dom.addEventListener('change', async ({target:{dataset}}) => {
        const {id:targetId, role} = dataset;
        const {selectedUserId} = store.getState();
        switch (role){
            case 'complete':{
                const todoItem = await toggleTodoItemComplete(selectedUserId, targetId);
                store.dispatch(setTodoItem({todoItem}));
            }
        }
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
        console.log(store.getState());
        store.dispatch(toggleTodoItem({todoItemId}))
    })

    $dom.addEventListener('keyup', async ({target:{dataset, value},key})=>{
        const {id:todoItemId} = dataset;

        switch (key){
            case 'Escape':
                store.dispatch(toggleTodoItem({todoItemId}));
                break;
            case 'Enter':
                const {selectedUserId} = store.getState();
                const todoItem = await updateTodoItem(selectedUserId , todoItemId,  value);
                console.log(todoItem, "todoItem");
                store.dispatch(setTodoItem({todoItem}));
        }
    })

    return () => {
        const {filter, status, todoList} = store.getState();
        if (prevFilter!==filter || prevStatus !== status || prevTodoList !== todoList) {
            prevFilter = filter;
            prevStatus = status;
            prevTodoList = todoList;
            switch (status) {
                case PENDING: {
                    $dom.innerHTML = TodoSkeleton();
                    break;
                }
                case SUCCESS: {
                    const filteredTodoList = todoList.filter(({isCompleted})=>{
                        switch (filter){
                            case 'all':
                                return true;
                            case 'active':
                                return !isCompleted;
                            case 'completed':
                                return isCompleted;
                        }
                    })
                    $dom.innerHTML = TodoList({todoList:filteredTodoList});
                    break;
                }
            }
        }
    }
}

export default TodoListContainer;

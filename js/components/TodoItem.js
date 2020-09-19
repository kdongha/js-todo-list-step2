const TodoItem = ({_id, contents, isCompleted, priority}) => `
	<li ${isCompleted ? 'class=completed' : ''}>
		<div class="view">
            <input data-id="${_id}" class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
            <label class="label">
              <span class="chip primary">${priority}순위</span>
              ${contents}
            </label>
            <button class="destroy" data-id="${_id}"></button>
	 	</div>
	</li>
`;

export default TodoItem;
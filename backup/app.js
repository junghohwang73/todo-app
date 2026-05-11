class TodoApp {
    constructor() {
        this.todos = [];
        this.completedTodos = [];
        this.init();
    }

    init() {
        // 로컬스토리지에서 데이터 로드
        this.loadFromStorage();
        
        // DOM 요소 캐싱
        this.form = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.priorityInput = document.getElementById('priorityInput');
        this.deadlineInput = document.getElementById('deadlineInput');
        this.todoList = document.getElementById('todoList');
        this.completedList = document.getElementById('completedList');
        this.toggleBtn = document.getElementById('toggleCompleted');
        this.completedSection = document.getElementById('completedSection');
        this.emptyMessage = document.getElementById('emptyMessage');
        this.emptyCompletedMessage = document.getElementById('emptyCompletedMessage');

        // 이벤트 리스너
        this.form.addEventListener('submit', (e) => this.handleAddTodo(e));
        this.toggleBtn.addEventListener('click', () => this.toggleCompleted());

        // 초기 렌더링
        this.render();
    }

    handleAddTodo(e) {
        e.preventDefault();

        const text = this.todoInput.value.trim();
        const priority = parseInt(this.priorityInput.value);
        const deadline = this.deadlineInput.value;

        if (!text) {
            alert('업무를 입력해주세요');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            priority: priority,
            deadline: deadline,
            createdDate: new Date().toISOString(),
            completedDate: null,
            isCompleted: false
        };

        this.todos.push(todo);
        this.sortTodos();
        this.saveToStorage();
        this.render();

        // 입력창 초기화
        this.todoInput.value = '';
        this.priorityInput.value = '2';
        this.deadlineInput.value = '';
        this.todoInput.focus();
    }

    sortTodos() {
        // 우선순위순으로 정렬 (1이 가장 높음)
        this.todos.sort((a, b) => a.priority - b.priority);
    }

    toggleTodo(id) {
        const todoIndex = this.todos.findIndex(t => t.id === id);
        if (todoIndex !== -1) {
            const todo = this.todos[todoIndex];
            todo.isCompleted = !todo.isCompleted;
            
            if (todo.isCompleted) {
                todo.completedDate = new Date().toISOString();
                this.completedTodos.push(this.todos.splice(todoIndex, 1)[0]);
            }

            this.saveToStorage();
            this.render();
        }
    }

    deleteTodo(id, isCompleted = false) {
        if (isCompleted) {
            this.completedTodos = this.completedTodos.filter(t => t.id !== id);
        } else {
            this.todos = this.todos.filter(t => t.id !== id);
        }
        this.saveToStorage();
        this.render();
    }

    toggleCompleted() {
        this.completedSection.style.display = 
            this.completedSection.style.display === 'none' ? 'block' : 'none';
        this.toggleBtn.classList.toggle('active');
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    getPriorityText(priority) {
        const priorityMap = {
            1: '높음',
            2: '중간',
            3: '낮음'
        };
        return priorityMap[priority] || '중간';
    }

    createTodoElement(todo, isCompleted = false) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.isCompleted ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.isCompleted;
        checkbox.addEventListener('change', () => {
            if (!isCompleted) {
                this.toggleTodo(todo.id);
            }
        });

        const content = document.createElement('div');
        content.className = 'todo-content';

        const todoText = document.createElement('p');
        todoText.className = 'todo-text';
        todoText.textContent = todo.text;

        const meta = document.createElement('div');
        meta.className = 'todo-meta';

        // 우선순위 배지
        const priorityBadge = document.createElement('span');
        priorityBadge.className = `priority-badge priority-${todo.priority}`;
        priorityBadge.textContent = `우선순위: ${this.getPriorityText(todo.priority)}`;
        meta.appendChild(priorityBadge);

        // 마감일
        if (todo.deadline) {
            const deadlineItem = document.createElement('span');
            deadlineItem.className = 'meta-item';
            deadlineItem.innerHTML = `<span class="meta-icon">📅</span> 마감일: ${this.formatDate(todo.deadline)}`;
            meta.appendChild(deadlineItem);
        }

        // 종료일 (완료된 항목만)
        if (isCompleted && todo.completedDate) {
            const completedItem = document.createElement('span');
            completedItem.className = 'meta-item';
            completedItem.innerHTML = `<span class="meta-icon">✓</span> 종료일: ${this.formatDate(todo.completedDate)}`;
            meta.appendChild(completedItem);
        }

        content.appendChild(todoText);
        content.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id, isCompleted));

        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(actions);

        return li;
    }

    render() {
        // 활성 To Do 리스트 렌더링
        this.todoList.innerHTML = '';
        
        if (this.todos.length === 0) {
            this.emptyMessage.style.display = 'block';
        } else {
            this.emptyMessage.style.display = 'none';
            this.todos.forEach(todo => {
                this.todoList.appendChild(this.createTodoElement(todo));
            });
        }

        // 완료된 To Do 리스트 렌더링
        this.completedList.innerHTML = '';
        
        if (this.completedTodos.length === 0) {
            this.emptyCompletedMessage.style.display = 'block';
        } else {
            this.emptyCompletedMessage.style.display = 'none';
            this.completedTodos.forEach(todo => {
                this.completedList.appendChild(this.createTodoElement(todo, true));
            });
        }

        // 완료된 업무 섹션 토글 버튼 업데이트
        if (this.completedTodos.length > 0) {
            this.toggleBtn.textContent = `완료된 업무 (${this.completedTodos.length})`;
        } else {
            this.toggleBtn.textContent = '완료된 업무';
        }
    }

    saveToStorage() {
        const data = {
            todos: this.todos,
            completedTodos: this.completedTodos
        };
        localStorage.setItem('todoAppData', JSON.stringify(data));
    }

    loadFromStorage() {
        const data = localStorage.getItem('todoAppData');
        if (data) {
            const parsed = JSON.parse(data);
            this.todos = parsed.todos || [];
            this.completedTodos = parsed.completedTodos || [];
        }
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { ClipboardText, PlusCircle } from '@phosphor-icons/react';
import { Task, TaskItem } from './Task'


export const TaskManager = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.setCustomValidity('');
        setNewTaskTitle(event.target.value)
    }

    const handleCreateNewTask = (event: FormEvent) => {
        event.preventDefault();
        const newTask: TaskItem = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false,
        }

        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewTaskTitle('');
    }

    const handleTaskDelete = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    const handleTaskDoneToggle = (id: number) => {
        const taskToBeToggled = tasks.find(task => task.id === id);
        if(!taskToBeToggled) return;
        taskToBeToggled.done = !taskToBeToggled.done;
        const newTasks = tasks.map(task => task.id === id ? taskToBeToggled : task);

        setTasks(newTasks)
    }

    const handleInvalidNewTaskTitle = (event: InvalidEvent<HTMLInputElement>) => {
        event.target.setCustomValidity('O nome da nova tarefa não pode ser vazio!');
    }

    const tasksDoneAmount = tasks.filter(task => task.done).length;

    return (
    <>
        <form className='task-form' onSubmit={handleCreateNewTask}>
            <input
            type='text'
            value={newTaskTitle}
            onChange={handleNewTaskChange}
            placeholder='Adicionar uma nova tarefa'
            required
            onInvalid={handleInvalidNewTaskTitle}
            />
            <button type='submit'>
                Criar
                <PlusCircle size='1rem'/>
            </button>
        </form>
        <section className='tasks'>
            <div className='tasks-header'>
                <span>
                    <h3>Tarefas criadas</h3>
                    <p className='task-tooltip'>{tasks.length}</p>
                </span>
                <span>
                    <h3 className='task-concluded-title'>Concluídas</h3>
                    <p className='task-tooltip'>
                        {tasks.length === 0 ? '0' : `${tasksDoneAmount} de ${tasks.length}`}
                    </p>
                </span>
            </div>
            {tasks.length === 0 ? (
            <div className='tasks-empty'>
                <ClipboardText size='3.5rem'/>
                <span>
                    <h6>Você ainda não tem tarefas cadastradas</h6>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </span>
            </div>
            ) : (
            tasks.map((item) => (
                    <Task
                        task={item}
                        key={item.id}
                        onTaskDelete={handleTaskDelete}
                        onTaskDoneToggle={handleTaskDoneToggle}
                    />
                ))
            )}
        </section>
    </>
    )
}

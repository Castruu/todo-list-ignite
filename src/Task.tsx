import styles from './Task.module.css'
import { Check, Trash } from '@phosphor-icons/react';

export interface TaskItem {
    id: number;
    title: string;
    done: boolean;
}

interface Task {
    task: TaskItem;
    onTaskDelete: (id: number) => void;
    onTaskDoneToggle: (id: number) => void;
}

export const Task = ({ task, onTaskDelete, onTaskDoneToggle }: Task) => {

    const handleTaskDelete = () => {
        onTaskDelete(task.id);
    }

    const handleTaskDoneToggle = () => {
        onTaskDoneToggle(task.id);
    }


    return (
    <div className={`${styles.task} ${task.done && styles.done}`}>
        <span>
            <span className={`${styles.iconWrapper} ${task.done && styles.done}`} onClick={handleTaskDoneToggle}>
                {task.done && <Check size='0.8rem'/>}
            </span>
            <p>{task.title}</p>
        </span>
        <Trash size='1.5rem' className={styles.delete} onClick={handleTaskDelete} />
    </div>
    );
};

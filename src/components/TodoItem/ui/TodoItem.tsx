import { memo, useCallback, useState } from 'react'
import { classNames } from '../../../shared'
import { ITodo } from '../model/types/TodoSchema'
import cls from './TodoItem.module.scss'
import { Button, Checkbox } from '../../../shared/ui'
import { SelectionTodoAction } from '../model/const'
import { ConfirmModal } from '../../ConfirmModal/ConfirmModal'
import { NavigateOptions } from 'react-router'

export type SelectedTodoPayload = { id: number, action: SelectionTodoAction, completed?: boolean }

export interface ITodoItemProps {
    className?: string
    todo: ITodo
    onSelectTodo: (payload: SelectedTodoPayload) => void
    onNavigate: (path: string, extra: NavigateOptions) => void
}

export const TodoItem = memo((props: ITodoItemProps) => {
    const {
        className = '',
        todo: { id, title, completed },
        onNavigate,
        onSelectTodo
    } = props

    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

    const onHandlerTodo = () => {
        onSelectTodo({ id, action: SelectionTodoAction.Complete, completed: !completed });
    }

    const onSwitchHandler = useCallback(
        () => {
            setIsShowConfirmModal(prev => !prev);
        },
        [],
    );

    const onEditHandler = useCallback(
        () => {
            onSelectTodo({ id, action: SelectionTodoAction.Edit })
        },
        [],
    );

    const onDeleteHandler = useCallback(
        () => {
            onSelectTodo({ id, action: SelectionTodoAction.Delete })
        },
        [],
    );

    const mods = {
        [cls.greenRow]: completed
    };

    return (
        <>
            <tr
                className={classNames(cls.TodoItem, mods, [className])}
            >
                <td>
                    {id}
                </td>
                <td>
                    <Checkbox checked={completed} onChange={onHandlerTodo} />
                </td>
                <td>
                    {title}
                </td>
                <td>
                    <Button onClick={onEditHandler}>Редактировать</Button>
                </td>
                <td>
                    <Button onClick={onSwitchHandler}>Удалить</Button>
                </td>
                <td>
                    <a
                        tabIndex={0}
                        className={cls.link}
                        onClick={() => onNavigate(`/todo/${id}`, { state: { id } })}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onNavigate(`/todo/${id}`, { state: { id } });
                            }
                        }}
                    >
                        Link
                    </a>
                </td>
            </tr>
            {isShowConfirmModal && (
                <ConfirmModal
                    isOpen={isShowConfirmModal}
                    onClose={onSwitchHandler}
                    onConfirm={onDeleteHandler}
                />
            )}
        </>
    )
})

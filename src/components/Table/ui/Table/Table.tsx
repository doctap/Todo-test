import { useCallback, useState } from 'react'
import { ITodo, SelectedTodoPayload, SelectionTodoAction, TodoItem } from '../../../../components/TodoItem'
import { classNames, getSearchParams, useAppDispatch } from '../../../../shared'
import cls from './Table.module.scss'
import { Button } from '../../../../shared/ui'
import { EditModal } from '../../../EditModal/ui/EditModal/EditModal'
import { deleteTodoById } from '../../../../app/store/todoSlice/services/deleteTodoById'
import { updatingTodo } from '../../../../app/store/todoSlice/services/updateTodo'
import { NavigateOptions } from 'react-router'

export interface ITableProps {
    className?: string
    items: ITodo[]
    onFilter: (step: number) => void
    onNavigate: (path: string, options?: NavigateOptions) => void
}

export const Table = (props: ITableProps) => {
    const {
        className = '',
        items,
        onFilter,
        onNavigate
    } = props

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [filterByCompleting, setFilterByCompleting] = useState(0);
    const [editableTodoId, setEditableTodoId] = useState(-1);
    const dispatch = useAppDispatch();

    const onFilterHandler = useCallback(() => {
        setFilterByCompleting(prev => {
            if (prev > 1) {
                return 0;
            } else {
                return prev + 1;
            }
        })

        onFilter(filterByCompleting);
    }, [onFilter]);

    const onCloseEditModal = useCallback(() => {
        setIsModalEditOpen(prev => !prev)
    }, []);

    const onSelectTodo = useCallback(({ id, action, completed }: SelectedTodoPayload) => {
        if (action === SelectionTodoAction.Edit) {
            setIsModalEditOpen(prev => !prev);
            setEditableTodoId(id);
        }

        if (action === SelectionTodoAction.Delete) {
            dispatch(deleteTodoById(id));
        }

        if (action === SelectionTodoAction.Complete && completed !== undefined) {
            dispatch(updatingTodo({ id, completed }));
        }
    }, []);

    const onNavigateTodoPage = useCallback((path: string, options?: NavigateOptions) => {
        onNavigate(path, options)
    }, [onNavigate]);

    const onNavigateCreateTodoPage = useCallback(() => {
        onNavigate('/add')
    }, [onNavigate]);

    const mods = {
        [cls.filterEnabled]: getSearchParams(window.location.search).completed !== undefined
    }

    const todos = items.map(todo => (
        <TodoItem
            onNavigate={onNavigateTodoPage}
            onSelectTodo={onSelectTodo}
            key={todo.id}
            todo={todo}
        />
    ));

    return (
        <>
            <table className={classNames(cls.Table, {}, [className])}>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            <Button
                                className={classNames(cls.button, mods)}
                                onClick={onFilterHandler}
                            >
                                Статус
                            </Button>
                        </th>
                        <th>
                            Задача
                        </th>
                        <th>
                            <Button onClick={onNavigateCreateTodoPage}>
                                Создать задачу
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {todos}
                </tbody>
            </table>

            {isModalEditOpen && (
                <EditModal
                    editableTodoId={editableTodoId}
                    isOpen={isModalEditOpen}
                    onClose={onCloseEditModal}
                    className={cls.EditModal}
                />
            )}
        </>
    )
}

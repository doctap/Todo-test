import { useLocation, useNavigate } from 'react-router'
import { classNames, useAppDispatch } from '../../../shared'
import cls from './TodoPage.module.scss'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Checkbox } from '../../../shared/ui'
import { getCurrentUsebleTodo } from '../../../app/store/tableSlice/selectors/getCurrentUsebleTodo'
import { fetchTodoById } from '../../../app/store/todoSlice/services/fetchTodoById'
import { getLoading } from '../../../app/store/todoSlice/selectors/getLoading'
import { getError } from '../../../app/store/todoSlice/selectors/getError'
import { todoAction } from '../../../app/store/todoSlice/slice/todoSlice'
import { updatingTodo } from '../../../app/store/todoSlice/services/updateTodo'

export interface ITodoPageProps {
	className?: string
}

export const TodoPage = (props: ITodoPageProps) => {
	const {
		className = '',
	} = props

	const navigate = useNavigate();
	const { state: { id } } = useLocation();

	const isLoading = useSelector(getLoading);
	const error = useSelector(getError);
  
	const usebleTodo = useSelector(getCurrentUsebleTodo);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTodoById(id))

		return () => {
			dispatch(todoAction.resetTodoSlice());
		}
	}, []);

	const updateTodo = useCallback(
		() => {
			if (usebleTodo) {
				dispatch(updatingTodo({
					id: usebleTodo.id,
					completed: !usebleTodo.completed,
					title: usebleTodo.title
				}))
			}
		},
		[usebleTodo],
	);

	if (error) {
		return <>{error}</>
	}

	if (isLoading) {
		return 'Loading...'
	}

	return (
		<div className={classNames(cls.TodoPage, {}, [className])}>
			<h1>{usebleTodo?.title}</h1>
			<label htmlFor={id}>
				Status:
				<Checkbox onChange={updateTodo} id={id} checked={usebleTodo?.completed} />
			</label>
			<Button type='button' onClick={() => navigate(-1)}>Назад</Button>
		</div>
	)
}

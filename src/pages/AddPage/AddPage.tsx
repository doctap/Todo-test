import { useNavigate } from 'react-router'
import { CreateForm } from '../../components/CreateForm/CreateForm'
import { classNames } from '../../shared'
import cls from './AddPage.module.scss'
import { useCallback } from 'react'

export interface IAddPageProps {
	className?: string
}

export const AddPage = (props: IAddPageProps) => {
	const {
		className = '',
	} = props

	const navigate = useNavigate();
	const onNavigate = useCallback(() => {
		navigate('/');
	}, []);

	return (
		<div className={classNames(cls.AddPage, {}, [className])}>
			<h1>Создать заметку</h1>

			<div className={cls.form}>
				<CreateForm
					onFinish={onNavigate}
				/>
			</div>
		</div>
	)
}

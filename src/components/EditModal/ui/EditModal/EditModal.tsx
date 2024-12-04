import { tableAction } from '../../../../app/store/tableSlice/slice/tableSlice'
import { useAppDispatch } from '../../../../shared'
import { Button, Modal } from '../../../../shared/ui'
import { EditForm } from '../EditForm/EditForm'
import cls from './EditModal.module.scss'

export interface IEditModalProps {
    className?: string
    editableTodoId: number
    isOpen: boolean
    onClose: () => void
}

export const EditModal = ({ className, onClose, isOpen, editableTodoId }: IEditModalProps) => {
    const dispatch = useAppDispatch();
    dispatch(tableAction.setCurrentTodo(editableTodoId));

    return (
        <Modal
            className={className}
            onClose={onClose}
            isOpen={isOpen}
        >
            <Button className={cls.closeButton} type='button' onClick={onClose}>X</Button>
            <div className={cls.EditModalBlock}>
                <h3 className={cls.title}>Редактировать</h3>
                <EditForm
                    onClose={onClose}
                />
            </div>
        </Modal>
    )
}

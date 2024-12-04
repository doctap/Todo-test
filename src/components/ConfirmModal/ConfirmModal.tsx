import { Button, Modal } from '../../shared/ui'
import cls from './ConfirmModal.module.scss'

export interface IConfirmModalProps {
    className?: string
    onConfirm: () => void
    isOpen: boolean
    onClose: () => void
}

export const ConfirmModal = ({ className, onClose, isOpen, onConfirm }: IConfirmModalProps) => {
    return (
        <Modal
            className={className}
            onClose={onClose}
            isOpen={isOpen}
        >
            <Button className={cls.closeButton} type='button' onClick={onClose}>X</Button>
            <div className={cls.ConfirmModalBlock}>
                <h3 className={cls.title}>Удалить</h3>
                <div className={cls.buttonBlock}>
                    <Button type="button" onClick={onConfirm}>Удалить</Button>
                    <Button type="button" onClick={onClose}>Отмена</Button>
                </div>
            </div>
        </Modal>
    )
}

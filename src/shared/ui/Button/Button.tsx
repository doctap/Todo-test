import { ButtonHTMLAttributes, memo } from 'react'
import { classNames } from '../../lib'
import cls from './Button.module.scss'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

export const Button = memo((props: IButtonProps) => {
    const {
        className = '',
        children,
        ...otherProps
    } = props

    return (
        <button
            {...otherProps}
            className={classNames(cls.Button, {}, [className])}
        >
            {children}
        </button>
    )
})

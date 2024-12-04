import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../app/index';

export const useAppDispatch: () => AppDispatch = useDispatch;

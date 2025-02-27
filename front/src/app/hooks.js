// Этот файл служит центральным хабом для экспорта хуков Redux.
// Мы импортируем их здесь и экспортируем для использования в приложении.
import { useDispatch, useSelector } from "react-redux";

// Используйте эти хуки в приложении вместо обычных `useDispatch` и `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
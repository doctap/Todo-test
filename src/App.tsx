import { Suspense, useEffect } from 'react'
import './App.css'
import { AppRouter } from './app/router/ui/AppRouter'
import { getSearchParamsObj, useAppDispatch } from './shared';
import { fetchTodos } from './app/store/tableSlice/services/fetchTodos';
import { tableAction } from './app/store/tableSlice/slice/tableSlice';
import { useLocation } from 'react-router';

function App() {
  const dispatch = useAppDispatch();
  const { search } = useLocation();

  useEffect(() => {
    dispatch(fetchTodos())
      .then(() => dispatch(tableAction.filterBy(getSearchParamsObj(search))))
    return () => {

    }
  }, []);

  return (
    <div className='app'>
      <Suspense fallback='Loadig...'>
        <AppRouter />
      </Suspense>
    </div>
  )
}

export default App

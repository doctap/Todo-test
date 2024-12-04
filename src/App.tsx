import { Suspense, useEffect } from 'react'
import './App.css'
import { AppRouter } from './app/router/ui/AppRouter'
import { getSearchParams, useAppDispatch } from './shared';
import { fetchTodos } from './app/store/tableSlice/services/fetchTodos';
import { tableAction } from './app/store/tableSlice/slice/tableSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos())
      .then(() => dispatch(tableAction.filterBy(getSearchParams(window.location.search))))
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

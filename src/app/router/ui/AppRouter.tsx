import { Suspense } from "react";
import { routerConfig } from "../routerConfig/routerConfig";
import { Route, Routes } from "react-router";

export const AppRouter = () => (
    <Suspense fallback={'loading....'}>
        <Routes>
            {routerConfig.map(({path, element}) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <div className='page-wrapper'>
                            {element}
                        </div>
                    )}
                />
            ))}
        </Routes>
    </Suspense>
)

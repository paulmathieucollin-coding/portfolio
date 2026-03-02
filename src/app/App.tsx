import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  return (
    <>
      <CustomCursor />
      <RouterProvider router={router} />
    </>
  );
}

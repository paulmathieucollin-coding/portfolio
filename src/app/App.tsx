import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CustomCursor } from './components/CustomCursor';
import { useAmbientAudio } from './hooks/useAmbientAudio';

function AmbientAudioInit() {
  useAmbientAudio();
  return null;
}

export default function App() {
  return (
    <>
      <AmbientAudioInit />
      <CustomCursor />
      <RouterProvider router={router} />
    </>
  );
}

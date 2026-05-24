import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CustomCursor } from './components/CustomCursor';
import { useAmbientAudio } from './hooks/useAmbientAudio';
import { Loader } from './components/Loader';
import { VolumeToggle } from './components/VolumeToggle';

function AmbientAudioInit() {
  useAmbientAudio();
  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <AmbientAudioInit />
        <CustomCursor />
        <VolumeToggle />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Login from './Login';
import PsilocybinAddictionGame from './PsilocybinAddictionGame';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? <PsilocybinAddictionGame /> : <Login />}
    </div>
  );
}

export default App;
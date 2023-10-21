
import { useEffect } from 'react';
import { Routing } from './routes/Routing';
import { getUserProfile } from './store/actions/userActions';
import './styles/app.less';
import {store} from './store/store'
function App() {
  
  useEffect(() => {
    // store.dispatch(getUserProfile())
    return () => {
    }
  }, [])
  
  return (
    <div className="app">
      <Routing/>
    </div>
  );
}

export default App;

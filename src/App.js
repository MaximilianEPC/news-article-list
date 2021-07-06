import { StylesProvider } from '@material-ui/styles';
import List from './components/List';
import './styles.scss';

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="app">
        <List/>
      </div>
    </StylesProvider>
  );
}

export default App;

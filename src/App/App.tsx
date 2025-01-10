import FetchProvider from 'App/FetchProvider';
import NotificationProvider from 'App/NotificationProvider';
import QueryProvider from 'App/QueryProvider';
import Routes from 'App/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <FetchProvider>
    <QueryProvider>
      <NotificationProvider>
        <Router>
          <Routes />
        </Router>
      </NotificationProvider>
    </QueryProvider>
  </FetchProvider>
);

export default App;

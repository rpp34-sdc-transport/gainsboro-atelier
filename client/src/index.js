import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, useParams} from 'react-router-dom';
import App from './components/App.jsx';

// ReactDOM.render(
//   <App/>,
//   document.getElementById('app')
// );

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path=":productId" element={<App/>} />
      </Route>
    </Routes>
    {/* <Routes>
      <Route path="/product" element={<App/>} />
    </Routes> */}
  </BrowserRouter>,
  document.getElementById('app')
);
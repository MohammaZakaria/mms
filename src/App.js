import React, { useEffect } from 'react';
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import './assets/css/index.css'
import SiteNavBar from './components/global/SiteNavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NotFound from './components/global/NotFound';
import AddBranchForm from './components/Forms/AddBranchForm';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Footer from "./components/global/Footer"
import Board from './components/Board/Board';
import Preload from './components/global/Preload';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div className="app">
        <Router>
          <Preload />
          <SiteNavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/add-branch" component={AddBranchForm} />
            <Route exact path="/branch/:id" component={Board} />
            <Route component={NotFound} /> {/* If nothing gets found, select the last page which is the not found page. */}
          </Switch>
          <Footer />
        </Router>
      </div>
    </AlertProvider>
  );
}

export default App;

// 1. Make reusable cards components.
// 2. make the contact page.
  // a. cards with [phones, emails, live chat]
  // b. contact form 
// 3. solve images sizes and change the titles 
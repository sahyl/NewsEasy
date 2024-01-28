

import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'  
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";



export default function App() {
  const pageSize = 8;
  const [progress, setProgress] = useState(0);
  const apiKey = process.env.REACT_APP_NEWS_API
    return (
      <div>
        <BrowserRouter>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        
      />

          <Routes>


            <Route exact path="/General"
              element={<News setProgress = { setProgress} pageSize={pageSize}  apiKey = {apiKey} country="in" category="general" />} />


            <Route exact path="/business"
              element={<News setProgress = { setProgress} key="business" pageSize={pageSize}  apiKey = {apiKey} country="in" category="business" />} />


            <Route exact path="/entertainment"
              element={<News setProgress = { setProgress} key="entertainment" pageSize={pageSize}  apiKey = {apiKey} country="in" category="entertainment" />} />


            

            <Route exact path="/health"
              element={<News setProgress = { setProgress} key="health" pageSize={pageSize}  apiKey = {apiKey} country="in" category="health" />} />


            <Route exact path="/science"
              element={<News setProgress = { setProgress} key="science"  pageSize={pageSize}  apiKey = {apiKey} country="in" category="science" />} />


            <Route exact path="/sports"
              element={<News setProgress = { setProgress} key="sports" pageSize={pageSize}  apiKey = {apiKey} country="in" category="sports" />} />


            <Route exact path="/technology"
              element={<News setProgress = { setProgress} key="technology" pageSize={pageSize}  apiKey = {apiKey} country="in" category="technology" />} />




          </Routes>


</BrowserRouter>
      </div>
    )
  
}



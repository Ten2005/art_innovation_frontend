import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ContentsArea from './components/ContentsArea'
import  { useState } from 'react'

function App() {
  // consultation or absurdity
  const [choicedModel, setChoicedModel] = useState("consultation");
  // first, consultation, absurdity, validation
  const [appState, setAppState] = useState("first");
  const [history, setHistory] = useState<string[]>([]);
  return (
    <>
      <Header
      appState={appState}
      setAppState={setAppState}
      />
      <ContentsArea
      appState={appState}
      setAppState={setAppState}
      choicedModel={choicedModel}
      setChoicedModel={setChoicedModel}
      history={history}
      setHistory={setHistory}
      />
      <Footer
      choicedModel={choicedModel}
      appState={appState}
      setAppState={setAppState}
      history={history}
      setHistory={setHistory}
      />
    </>
  )
}

export default App

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ContentsArea from './components/ContentsArea'
import OptionalScreen from './components/OptionalScreen'
import  { useState } from 'react'

function App() {
  // consultation or absurdity
  const [choicedModel, setChoicedModel] = useState("latest");
  // first, consultation, absurdity, latest, validation
  const [appState, setAppState] = useState("first");
  const [history, setHistory] = useState<string[]>([]);
  // when OptionalScreen added, change false to true
  const [isOptionalScreen, setIsOptionalScreen] = useState(true);
  return (
    <>
    {isOptionalScreen
    ?
    <OptionalScreen
      setIsOptionalScreen={setIsOptionalScreen}
    />
    : <>
      <Header
      appState={appState}
      setAppState={setAppState}
      history={history}
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
    }
    </>
  )
}

export default App

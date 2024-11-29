import './App.css'
import TextFlagCursor from './components/TextFlagCursor'
// import SpotlightCursor from './components/SpotlightCursor'

const App = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
     <h1 className='font-bold text-5xl text-gray-900'> hello world</h1>
      {/* <SpotlightCursor/>
<SpotlightCursor 
  config={{
    radius: 250,
    brightness: 0.2
  }} 
/> */}

{/* <SpotlightCursor 
  config={{
    radius: 300,
    brightness: 0.50,
    color: '#f0f0f0',
    smoothing: 0.15
  }} 
/> */}
<TextFlagCursor 
        text=" Techeunoia International"
        color="blue"
        font="Arial"
        textSize={12}
        gap={10}
      />
    </div>
  )
}

export default App

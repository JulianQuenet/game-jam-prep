import { Suspense, useState} from 'react'
import { Bloom, DepthOfField, BrightnessContrast, EffectComposer, Noise, Vignette} from '@react-three/postprocessing'
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Controls } from "./Controls";
import Scene from './Scene';
import { Book1, Book2, Book3, Menu, Recorder, Intro } from './Components/Overlays';
import { StartScreen } from './Components/StartScreen';
import './index.css'
import { End } from './End';

function Game() {
  const [show, setShow] = useState<Boolean>(false)
  const [diary1, setDiary1] = useState<Boolean>(false)
  const [diary2, setDiary2] = useState<Boolean>(false)
  const [diary3, setDiary3] = useState<Boolean>(false)
  const [deja, setDeja] = useState<Boolean>(false)
  const [keepClosed, setKeepClosed] = useState<Boolean>(false)
  const [start, setStart] = useState<Boolean>(false)
  const [door, setDoor] = useState<Boolean>(true)
  const [lady, setLady] = useState<Boolean>(false)
  const [key, setKey]= useState<Boolean>(false)
  const [hasKey, setHasKey] = useState<Boolean>(false)
  const [canInput, setCanInput] = useState<Boolean>(false)
  const [startKnocking, setStartKnocking] = useState<Boolean>(false)
  const [scp, setScp] = useState<Boolean>(false)
  const [end, setEnd]  = useState<Boolean>(false)
  const [intro, setIntro] = useState<Boolean>(true)
  const handleStart = () =>{
    setStart(true)
  }

return(
    <>
   { start && !end && <Canvas  shadows camera={{ fov: 50, position: [5, 3, 2] }}>
    <color attach="background" args={["black"]} />
    <Suspense>
    <Physics >
     <Scene  setShow={setShow} 
     diary1={setDiary1}
     diary2={setDiary2}
     diary3={setDiary3}
     door={door}
     lady={lady}
     showKey={key}
     setShowKey={setKey}
     hasKey={hasKey}
     setHasKey={setHasKey}
     knock={startKnocking}
     canInput={canInput}
     scp={scp}
     end={setEnd}
     />
     <Controls seeScp={scp} scp={setScp} knock={setStartKnocking} setDeja={setDeja} door={setDoor} show={show} deja={deja}/>
    </Physics>
    </Suspense>
    <EffectComposer>
        <BrightnessContrast contrast={lady? 0.35 : 0.15 } />
        <DepthOfField  focusDistance={0} focalLength={0.2} bokehScale={0} height={480} />
        <Bloom opacity={0.25} intensity={0.1} luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.1} />
        <Vignette eskil={false} offset={0.1} darkness={1.05} />
      </EffectComposer>
    </Canvas > }
    {(show && !deja && canInput) && <Menu setShow={setShow}/>}
    { (diary1 && !keepClosed) && <Book1 setDiary1={setDiary1} />}
    {(diary2 && !keepClosed) && <Book2 safe={setCanInput} setDiary2={setDiary2} />}
    {(diary3 && !keepClosed) && <Book3 showLady={setLady} close={setKeepClosed} 
    deja={setDeja} setDiary3={setDiary3} door={setDoor} showKey={setKey} /> }
    {(start && intro) && <Intro start={setIntro} skip={intro}/>}
    {!start && <StartScreen toggle={handleStart} /> }
   { end && <End />}
    { (!end && start) && <Recorder/>}
    </>
  )
  
}

export default Game

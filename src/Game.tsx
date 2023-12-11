import { Suspense, useEffect, useState} from 'react'
import { Bloom, DepthOfField, BrightnessContrast, EffectComposer, Noise, Vignette, Outline } from '@react-three/postprocessing'
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Controls } from "./Controls";
import Scene from './Scene';
import { Stars } from '@react-three/drei';
import { Book1, Book2, Book3, Menu, Recorder } from './Components/Overlays';
import { StartScreen } from './Components/StartScreen';
import './index.css'
import { AmbientLight } from 'three';

function Game() {
  const [show, setShow] = useState<Boolean>(false)
  const [diary1, setDiary1] = useState<Boolean>(false)
  const [diary2, setDiary2] = useState<Boolean>(false)
  const [diary3, setDiary3] = useState<Boolean>(false)
  const [openSafe, setOpenSafe] = useState<Boolean>(false)
  const [deja, setDeja] = useState<Boolean>(false)
  const [start, setStart] = useState<Boolean>(false)
  const [door, setDoor] = useState<Boolean>(true)
  const handleStart = () =>{
    setStart(true)
  }
 
  useEffect(()=>{
  setTimeout(()=>{
     setDoor(false)
  },5000)
  },[])

return(
    <>
   { true && <Canvas  shadows camera={{ fov: 50, position: [5, 3, 2] }}>
     {/* <ambientLight intensity={0.5}/> */}
    <color attach="background" args={["black"]} />
    <Suspense>
    <Physics >
     <Scene  setShow={setShow} 
     openSafe={openSafe} diary1={setDiary1}
     diary2={setDiary2}
     diary3={setDiary3}
     door={door}
     />
     <Controls show={show} deja={deja}/>
    </Physics>
    </Suspense>
    <Stars />
    <EffectComposer>
        <BrightnessContrast contrast={0.1} />
        <DepthOfField  focusDistance={0} focalLength={0.2} bokehScale={0} height={480} />
        <Bloom opacity={0.25} intensity={0.1} luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.1} />
        <Vignette eskil={false} offset={0.1} darkness={1.05} />
      </EffectComposer>
    </Canvas > }
    {(show && !deja) && <Menu setShow={setShow}/>}
    { diary1 && <Book1 setDiary1={setDiary1} />}
    {diary2 && <Book2 setDiary2={setDiary2} />}
    {diary3 && <Book3 setDiary3={setDiary3} door={setDoor}/> }
    {/* {!start && <StartScreen toggle={handleStart} /> } */}
    
    <Recorder/>
    </>
  )
  
}

export default Game

import { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Controls } from "./Controls";
import Scene from './Scene';
import { Stars } from '@react-three/drei';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import './index.css'

function Game() {
  const [bullets, setBullets] = useState<any>([])
  const [show, setShow] = useState<Boolean>(false)
  const [openSafe, setOpenSafe] = useState<Boolean>(false)
  const [deja, setDeja] = useState<Boolean>(false)

const onFire = (bullet:any) => {
    setBullets((bullets:any) => [...bullets, bullet]);
  };


 const finHit = (hitId:any) => {
    setBullets((hits:any) => hits.filter((h:any) => h.id !== hitId));
  };


  function Menu(){
    const [code, setCode] = useState<any>("")
    function Submit(e:any){
      if(e.code === "Enter"){
        if(code.toString() === "2265"){
          setShow(false)
          setOpenSafe(true)
          setTimeout(()=>{
          setOpenSafe(false)
          }, 500)
          setDeja(true)
        }
      }else if(e.code === "Space"){
       setShow(false)
      }
    }

    function handleChange(e:any){
      e.preventDefault
      setCode(e.target.value)
    }

    window.addEventListener("keydown", Submit )

    return(
      <div className='menu'> 
        <div className="holder">
            <h2 style={{textAlign:"center", fontWeight: 300}}>
              Input code
            </h2>
            <p style={{fontSize: "10px", textAlign: "center"}}>Press "TAB" to interact</p>
            <input type='text' placeholder='0000' onChange={handleChange}>
            </input>
            <div className='buttons-holder' >
               <div className='button-return'>
                  <div>Return</div>
                  <div style={{textAlign:"center"}}><SpaceBarIcon fontSize='small'/></div>
               </div>
               <div className='button-enter'>
                  <div>Enter</div>
                  <div style={{textAlign:"center"}}><KeyboardReturnIcon fontSize='small'/></div>
               </div>
            </div>
        </div>
      </div>
    )
  }

  return(
    <>
    <Canvas frameloop='demand' shadows camera={{ fov: 50, position: [5, 3, 2] }}>
      {/* <ambientLight intensity={0.5}/> */}
      {/* <fog attach="fog" args={["0xDFE9F3", 0.0, 25]}/> */}
    {/* <directionalLight
        position={[0, 5, 0]}
        castShadow
        shadow-mapSize={1024}
      /> */}
    <color attach="background" args={["black"]} />
    <Suspense>
    <Physics updateLoop="independent"  >
     <Scene projectiles={bullets} finHit={finHit} setShow={setShow} openSafe={openSafe}/>
     <Controls shot={onFire} show={show} deja={deja}/>
    </Physics>
    </Suspense>
    <Stars />
    </Canvas>
    {(show && !deja) && <Menu />}
    </>
  )
  
}

export default Game

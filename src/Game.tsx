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
  const [diary1, setDiary1] = useState<Boolean>(false)
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
      if(deja){
        return
      }
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


  function Book1(){
    
    function closeDiary(e:any){
       if(e.code === "Space"){
        setDiary1(false)
       }
    }

    window.addEventListener("keydown", closeDiary )

    return(
      <div className='diary' style={{width:'100vw', height:"100vh", display:"flex",
      justifyContent :"center", alignItems : "center"
      }}>
        <div className='page' style={{display:"flex", flexDirection: "column", gap : "10px", width:"400px" }}>
          <div>
            Date: 08 Feb 2003 18:49
            <br/>
            Johnny Eckard
          </div>
          <div>
            I don't know what's happening anymore...I haven't slept for 3 days.
            I keep hearing things...seeing things, I decided 
            to start writing things down as I fear my mind is starting to fail me, though
            I guess the best case scenario is that I am going crazy and that all this is my mind 
            playing tricks on me...I don't want to be part of a reality where that thing...that place exists.
            I should've listened to her.
            <br/>
            <br/>
            <br/>
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
              <SpaceBarIcon fontSize='small'/> to close
            </div>
            
          </div>
        </div>
      </div>
    )
  }

  function Book2(){

    return(
      <div className='diary' style={{width:'100vw', height:"100vh", display:"flex",
      justifyContent :"center", alignItems : "center"
      }}>
        <div className='page' style={{display:"flex", flexDirection: "column", gap : "10px", width:"400px" }}>
          <div>
            Date: 09 Feb 2003 07:49
            <br/>
            Johnny Eckard
          </div>
          <div>
            I managed to fall sleep last night...though I dreamt about that place again,
            that girl was there too, or at least I could hear her, when I woke I found that door open again 
            and seems like all the other pages of my diary were torn out...I can't help but feel like someone
            watches me as I sleep, as if they're taking shelter in the corners observing from the cold
            of the darkness. From now on I'm going to lock that door, as well as the bathroom for now or at least when 
            it's not in use. I gotta get out of here soon, apparently there's a new apartment block right next to the local 
            mall, got a nice name too, Ridge Mead...just sounds like a new chapter to me, I'm seeing the landlord soon, 
            maybe I can be gone from all this. 
            <br/>
            NB new code to safe 2265
            <br/>
            <br/>
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
              <SpaceBarIcon fontSize='small'/> to close
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
    <Physics updateLoop="independent"  debug>
     <Scene projectiles={bullets} finHit={finHit} setShow={setShow} openSafe={openSafe} diary1={setDiary1}/>
     <Controls shot={onFire} show={show} deja={deja}/>
    </Physics>
    </Suspense>
    <Stars />
    </Canvas>
    {(show && !deja) && <Menu />}
    { diary1 && <Book1 />}
    </>
  )
  
}

export default Game

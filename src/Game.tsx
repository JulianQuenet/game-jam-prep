import { Suspense, useEffect, useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Controls } from "./Controls";
import Scene from './Scene';

function Game() {
  const [bullets, setBullets] = useState<any>([])

const onFire = (bullet:any) => {
    setBullets((bullets:any) => [...bullets, bullet]);
  };


 const finHit = (hitId:any) => {
    setBullets((hits:any) => hits.filter((h:any) => h.id !== hitId));
  };

  return(
    <>
    <Canvas frameloop='demand' shadows camera={{ fov: 50, position: [5, 3, 2] }}>
      <ambientLight intensity={0.1}/>
      {/* <fog attach="fog" args={["0xDFE9F3", 0.0, 25]}/> */}
    {false && <directionalLight
        position={[10, 10, 5]}
        castShadow
        shadow-mapSize={1024}
      />}
    <color attach="background" args={["lightblue"]} />
    <Suspense>
    <Physics updateLoop="independent"  debug>
     <Scene projectiles={bullets} finHit={finHit}/>
     <Controls shot={onFire} />
    </Physics>
    </Suspense>
    </Canvas>
    
    </>
  )
  
}

export default Game

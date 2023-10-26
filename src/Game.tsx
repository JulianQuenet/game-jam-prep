// import { useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Controls } from "./Controls";
import Scene from './Scene';


function Game() {
  
  return(
    <>
    <Canvas shadows camera={{ fov: 50, position: [5, 3, 2] }}>
      <ambientLight intensity={1}/>
    <directionalLight
        position={[10, 10, 5]}
        castShadow
        shadow-mapSize={1024}
      />
    <color attach="background" args={["lightblue"]} />
    <Physics>
     <Scene />
     <Controls />
    </Physics>
    </Canvas>
    </>
  )
  
}

export default Game

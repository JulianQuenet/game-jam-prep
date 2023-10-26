import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Capsule, PointerLockControls } from "@react-three/drei/core";
import { useThree, useFrame } from "@react-three/fiber";
import usePlayerControls from "./Components/inputs";
import { RigidBody } from "@react-three/rapier";
import { Hands } from "./Components/Animatedpistol";




export const Controls = ()=>{
const playerRef = useRef<any>()
const handsRef = useRef<any>()
const { camera } = useThree();
const { forward, backward, left, right } = usePlayerControls();
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const SPEED = 4.125

useFrame(()=>{

    if (playerRef.current) {
        const time = Date.now() * 0.0005;
        playerRef.current.lockRotations(true, true); //Locks rotation because of capsule body
        const position = playerRef.current.translation();
        // Setting camera position and creating walking/breathing affect
        camera.position.x = position.x;
        camera.position.z = position.z;
        if (right || left || forward || backward) {
            camera.position.y = position.y + 1.5
        } else {
          camera.position.y = position.y + Math.sin(time * 7.5) * 0.0095 + 1.5
        }
        //Player movement base on camera direction/rotation
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);
        direction
          .subVectors(frontVector, sideVector)
          .normalize()
          .multiplyScalar(SPEED)
          .applyEuler(camera.rotation);
  
        playerRef.current.setLinvel(
          { x: direction.x, y: 0.0, z: direction.z },
          true
        );
        }

       handsRef.current.rotation.copy(camera.rotation)
        handsRef.current.position.x = camera.position.x -0.1
        handsRef.current.position.z = camera.position.z -0.35
        handsRef.current.position.y = camera.position.y -0.85
        
    
})

return (
    <> 
    <PointerLockControls camera={camera}/>
    <RigidBody
        position={[-2, 1, 10]}
        ref={playerRef}
        colliders={"ball"}
        args={[2, 2, 2]}
      >
        <Capsule args={[0.48, 0.4, 0.4]}>
          <meshStandardMaterial />
         
        </Capsule>
      </RigidBody>
    
    <mesh ref={handsRef} position={[-2,2.125,5]} >
        <Hands />
    </mesh>
    

    </>
   
)

}
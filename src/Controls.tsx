import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Capsule, PointerLockControls } from "@react-three/drei/core";
import { useThree, useFrame } from "@react-three/fiber";
import usePlayerControls from "./Components/inputs";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Hands } from "./Components/Animatedpistol";


interface controlProps {
  shot:any,
}


export const Controls = (props: controlProps)=>{
const {shot} = props


const playerRef = useRef<any>();
const handsRef = useRef<any>();
const { camera } = useThree();
const { forward, backward, left, right } = usePlayerControls();
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const SPEED = 5.125

useFrame(()=>{

    if (playerRef.current) {
        const time = Date.now() * 0.0005;
        playerRef.current.lockRotations(true, true); // Locks rotation because of capsule body
        const position = playerRef.current.translation();
        // Setting camera position and creating walking/breathing affect
        camera.position.x = position.x;
        camera.position.z = position.z ;
        if (right || left || forward || backward) {
            camera.position.y = position.y + 1
        } else {
          camera.position.y = position.y + Math.sin(time * 7.5) * 0.0095 + 1
        }
        // Player movement base on camera direction/rotation
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
       setHands()
})

function setHands(){
  const time = Date.now() * 0.00035;
  handsRef.current.rotation.copy(camera.rotation)
  handsRef.current.position.copy(camera.position)
  handsRef.current.translateY(-0.525 + Math.sin(time * 5.5) * 0.0095 )
  handsRef.current.translateZ(-0.2875)
  handsRef.current.translateX(-0.165)
}



return (
    <> 
    <PointerLockControls camera={camera}/>
    <RigidBody
    colliders={false}
        gravityScale={0}
        position={[-2, 2.75, 10]}
        ref={playerRef}
        userData={{
          type:"player",
          health:"100"
        }
        }
      >
        <CapsuleCollider args={[0.6,1.2]}>
        </CapsuleCollider>
      </RigidBody>
    
    <mesh name="hands" ref={handsRef}  position={[-2,2.125,5]}>
        <Hands shot={shot} />
    </mesh>

    </>
   
)

}
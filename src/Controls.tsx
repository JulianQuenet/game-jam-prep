import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Box, PointerLockControls, Sphere } from "@react-three/drei/core";
import { useThree, useFrame } from "@react-three/fiber";
import usePlayerControls from "./Components/inputs";
import { RigidBody, BallCollider, useRevoluteJoint } from "@react-three/rapier";
import { Hands } from "./Components/Animatedpistol";


interface controlProps {
  shot:any,
}


export const Controls = (props: controlProps)=>{
const {shot} = props
const playerRef = useRef<any>();
const handsRef = useRef<any>();
const bodyA = useRef<any>();
const bodyB = useRef<any>();
const { camera, scene } = useThree();
const { forward, backward, left, right } = usePlayerControls();
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const SPEED = 7.125



useFrame(()=>{
  // Player movement base on camera direction/rotation
  frontVector.set(0, 0, Number(backward) - Number(forward));
  sideVector.set(Number(left) - Number(right), 0, 0);
  direction
    .subVectors(frontVector, sideVector)
    .normalize()
    .multiplyScalar(SPEED)
    .applyEuler(camera.rotation);

    if (playerRef.current) {
        const time = Date.now() * 0.0005;
        const position = playerRef.current.translation();
        // Setting camera position and creating walking/breathing affect
        camera.position.x = position.x;
        camera.position.z = position.z ;
        if (right || left || forward || backward) {
            camera.position.y = position.y + 2.5
           
        } else {
          camera.position.y = position.y + Math.sin(time * 7.5) * 0.0095 + 2.5

        }
        
        playerRef.current.setLinvel(
          { x: direction.x, y: 0, z: direction.z },
          true
        );

       
        }
      //  setHands()
       
})

function setHands(){
  const time = Date.now() * 0.00035;
  handsRef.current.rotation.copy(camera.rotation)
  handsRef.current.position.copy(camera.position)
  handsRef.current.translateY(-0.525 + Math.sin(time * 5.5) * 0.0095 )
  handsRef.current.translateZ(-0.0875)
  handsRef.current.translateX(-0.165)
}

// const joint = useRevoluteJoint(bodyA, bodyB, [
//   // Position of the joint in bodyA's local space
//   [0, 0, 0],
//   // Position of the joint in bodyB's local space
//   [-0.85, 0, 0],
//   // Axis of the joint, expressed in the local-space of
//   // the rigid-bodies it is attached to. Cannot be [0,0,0].
//   [0, 1, 0]
// ])



return (
    <> 
    <PointerLockControls camera={camera}/>
    <RigidBody
        gravityScale={9.18}
        colliders={false}
        position={[5, 2.5, 0]}
        ref={playerRef}
        userData={{
          type:"player",
          health:"100"
        }
        }
      >
        <BallCollider   args={[0.5]} >
        </BallCollider>
      </RigidBody>
    
       {/* <mesh name="hands" ref={handsRef} >
        <Hands shot={shot} />
    </mesh> */}


    {/* <group>
      <RigidBody type='fixed' ref={bodyA}  position={[1,2,0]}>
        <Box args={[0.5,0.5,0.5]}/>
      </RigidBody>
      <RigidBody ref={bodyB} position={[1,2,0]}>
        <Box />
      </RigidBody>
    </group> */}
    

    </>
   
)

}
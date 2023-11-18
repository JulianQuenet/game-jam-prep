import { useRef } from "react";
import * as THREE from "three";
import { Box, PointerLockControls} from "@react-three/drei/core";
import { useThree, useFrame } from "@react-three/fiber";
import usePlayerControls from "./Components/inputs";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { Hands } from "./Components/Animatedpistol";
import { CeilingLight } from "./Components/Ceiling_light_with_chain";


interface controlProps {
  shot:any,
}


export const Controls = (props: controlProps)=>{
const {shot} = props
const flashRef = useRef<any>();
const playerRef = useRef<any>();
const handsRef = useRef<any>();
const lightRef1 = useRef<any>()
const lightRef2 = useRef<any>()
const lightRef3 = useRef<any>()
const { camera} = useThree();
const { forward, backward, left, right } = usePlayerControls();
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const SPEED = 6.125



useFrame(()=>{
  // Player movement base on camera direction/rotation
  const time = Date.now() * 0.0005;
  frontVector.set(0, 0, Number(backward) - Number(forward));
  sideVector.set(Number(left) - Number(right), 0, 0);
  direction
    .subVectors(frontVector, sideVector)
    .normalize()
    .multiplyScalar(SPEED)
    .applyEuler(camera.rotation);

    if (playerRef.current) {
       
        const position = playerRef.current.translation();
        // Setting camera position and creating walking/breathing affect
        camera.position.x = position.x;
        camera.position.z = position.z ;
        if (right || left || forward || backward) {
            camera.position.y = position.y + 1.5
           
        } else {
          camera.position.y = position.y + Math.sin(time * 7.5) * 0.0095 +1.5

        }
        
        playerRef.current.setLinvel(
          { x: direction.x, y: -1, z: direction.z },
          true
        );

       
        }
       setHands()

       if(flashRef.current && lightRef2.current){
        flashRef.current.position.x = 1
        flashRef.current.position.z = 0
        //First main light
        lightRef1.current.intensity = 12.5;
        lightRef1.current.angle = 1.95;
        lightRef1.current.distance = 25;
        lightRef1.current.penumbra = 0.8;
        flashRef.current.add(lightRef1.current);
        flashRef.current.add(lightRef1.current.target);
        //Backflash of light
        lightRef2.current.target = flashRef.current
       }
       
})

function setHands(){
  if(handsRef.current){const time = Date.now() * 0.00035;
  handsRef.current.rotation.copy(camera.rotation)
  handsRef.current.position.copy(camera.position)
  handsRef.current.translateY(-0.225 + Math.sin(time * 5.5) * 0.0095 )
  handsRef.current.translateZ(-0.0975)
  handsRef.current.translateX(-0.065)}
}


return (
    <> 
    <spotLight ref={lightRef1}/>
    <spotLight intensity={10} penumbra={0.8} ref={lightRef2}/>
    <PointerLockControls camera={camera}/>
    <RigidBody
        friction={0}
        lockRotations
        colliders={false}
        position={[5, 2.5, 5]}
        gravityScale={0}
        ref={playerRef}
        userData={{
          type:"player",
          health:"100"
        }
        }
      >
        <CapsuleCollider  args={[0.5, 0.7]} >
        </CapsuleCollider>
      </RigidBody>

      <mesh ref={flashRef} >
    <CeilingLight />
    </mesh>

      
      
      <spotLight  intensity={35} penumbra={0.1} angle={1.5} ref={lightRef3}/>
    
      { false && <mesh name="hands" ref={handsRef} >
        <Hands shot={shot} />
    </mesh>
    }
    

   
    
  
    </>
   
)

}
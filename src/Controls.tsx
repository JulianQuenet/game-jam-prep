import { useRef } from "react";
import * as THREE from "three";
import { Box, Sphere, PointerLockControls} from "@react-three/drei/core";
import { useThree, useFrame } from "@react-three/fiber";
import usePlayerControls from "./Components/inputs";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { Hands } from "./Components/Animatedpistol";
import { CeilingLight } from "./Components/Ceiling_light_with_chain";


interface controlProps {
  shot:any,
  show:Boolean,
  deja : Boolean
}


export const Controls = (props: controlProps)=>{
const {shot, show, deja} = props
const playerRef = useRef<any>();
const handsRef = useRef<any>();
const light1 = useRef<any>();
const light2 = useRef<any>();
const sourceRef = useRef<any>();
const { camera} = useThree();
const { forward, backward, left, right } = usePlayerControls();
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const SPEED = (show && !deja) ? 0 : 6.125 



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
            camera.position.y = position.y + 2.5
           
        } else {
          camera.position.y = position.y + Math.sin(time * 4.5) * 0.0095 + 2.5

        }
        
        playerRef.current.setLinvel(
          { x: direction.x, y: -1, z: direction.z },
          true
        );

       
        }
    

      setFlash()
      if(sourceRef.current && camera){
        sourceRef.current.position.copy(camera.position)
        sourceRef.current.rotation.copy(camera.rotation)
        sourceRef.current.updateMatrix()
        sourceRef.current.position.y = camera.position.y - 0.25 + Math.sin(time * 3.5) * 0.01
        sourceRef.current.translateZ(-2)
        sourceRef.current.translateX(0.65)
      } 
})



function setFlash(){
  if(light1.current && sourceRef.current){
    //Main light
    light1.current.position.copy(camera.position)
    light1.current.rotation.copy(camera.rotation)
    light1.current.translateX(0.65)
    light1.current.intensity = 100
    light1.current.distance = 45
    light1.current.angle = 0.35
    light1.current.penumbra = 0.45
    //Ambient light 
    light2.current.position.copy(camera.position)
    light2.current.rotation.copy(camera.rotation)
    light2.current.translateX(0.65)
    light2.current.intensity = 35
    light2.current.distance = 35
    light2.current.angle = 0.75
    light2.current.penumbra = 0.85
  }
}


return (
    <> 
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

    
    <CeilingLight />
    
    
      { false && <mesh name="hands" ref={handsRef} >
        <Hands shot={shot} />
    </mesh>
    }
    
    <mesh ref={sourceRef}>
    <Box args={[0.00001,0.00001,0.000001]}>
      <meshStandardMaterial color={"red"} />
    </Box>
    </mesh>
    
    <Sphere args={[0.14]} position={[0.85,4.7,-7.15]}>
      <meshStandardMaterial color={"black"}/>
    </Sphere>

    <Sphere args={[0.14]} position={[3.14,4.7,-7.15]}>
      <meshStandardMaterial color={"black"}/>
    </Sphere>

    {/* <spotLight color={"#ECF6FF"} target={sourceRef.current}  ref={light1}  name="main"/>
    <spotLight color={"#ECF6FF"} target={sourceRef.current} ref={light2} name="ambient"/> */}

    </>
   
)

}
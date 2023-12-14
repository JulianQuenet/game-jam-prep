import { useRef, useState } from "react";
import * as THREE from "three";
import { Box, Sphere, PointerLockControls, Capsule, PositionalAudio} from "@react-three/drei/core";
import { useThree, useFrame } from "@react-three/fiber";
import usePlayerControls from "./Components/inputs";
import { RigidBody} from "@react-three/rapier";
import { CeilingLight } from "./Components/Ceiling_light_with_chain";


interface controlProps {
  show:Boolean,
  deja : Boolean,
  door : any,
  setDeja : any,
}


export const Controls = (props: controlProps)=>{
const {show, deja, door, setDeja} = props
const [toggle, setToggle] = useState<Boolean>(false)
const playerRef = useRef<any>();
const light1 = useRef<any>();
const light2 = useRef<any>();
const sourceRef = useRef<any>();
const { camera} = useThree();
const { forward, backward, left, right, submit, light } = usePlayerControls();
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const SPEED = (show && !deja) ? 0 : 4.5
const [canPlay, setCanPlay] = useState<Boolean>(false);
const doorRip = new Audio('./Sounds/door-rip.mp3');

useFrame(()=>{
  // Player movement base on camera direction/rotation
  const time = Date.now() * 0.00095;
  frontVector.set(0, 0, Number(backward) - Number(forward));
  sideVector.set(Number(left) - Number(right), 0, 0);
  direction
    .subVectors(frontVector, sideVector)
    .normalize()
    .multiplyScalar(SPEED)
    .applyEuler(camera.rotation);

    if (playerRef.current) {
        playerRef.current.setAdditionalMass(0.5)
        playerRef.current.lockRotations(true, true); //Locks rotation because of capsule body
        const position = playerRef.current.translation();
        // Setting camera position and creating walking/breathing affect
        camera.position.x = position.x;
        camera.position.z = position.z;
        if (right || left || forward || backward) {
            camera.position.y = position.y + Math.sin(time * 7) * 0.065 + 3
            setCanPlay(true)
           
        } else {
          camera.position.y = position.y + Math.sin(time * 4.5) * 0.0095 + 3
          setCanPlay(false)
        }
        
        playerRef.current.setLinvel(
          { x: direction.x, y: 0, z: direction.z },
          true
        );
        
        if(show && submit && !deja){
              const error = new Audio("./Sounds/error.mp3")
              error.play()
              setTimeout(()=>{
              doorRip.play()
              },750)
              setTimeout(()=>{
               setDeja(true)
               door(false)
              },5000)
        }
       
        }
      
        if(light){
          setToggle(!toggle)
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

const walking = './Sounds/walking.mp3'
const background = './Sounds/deepSpace.mp3'

const listener = new THREE.AudioListener();
return (
    <> 
    <PointerLockControls camera={camera}/>
    <RigidBody
        gravityScale={0}
        position={[0, 1, 0]}
        ref={playerRef}
        colliders={"ball"}
        userData={
          {name : "player"}
        }
      >
       <Capsule args={[0.48, 0.4, 0.4]}>
      { canPlay && <PositionalAudio 
              url={walking} 
              autoplay
              listener={listener}
               />}
           <PositionalAudio 
              url={background} 
              autoplay
              listener={listener}
               />
       <meshStandardMaterial />
        </Capsule>
      </RigidBody>

    
    <CeilingLight />
    
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

   { toggle && 
   <><spotLight color={"#ECF6FF"} target={sourceRef.current}  ref={light1}  name="main"/>
   <spotLight color={"#ECF6FF"} target={sourceRef.current} ref={light2} name="ambient"/>
   </>
    }

    </>
   
)

}
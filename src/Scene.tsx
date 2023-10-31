import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState, useRef } from "react";
import { Bullet } from "./Components/Bullet";
import { floor } from "three/examples/jsm/nodes/Nodes.js";


interface sceneProps {
    projectiles:any,
}

export const Scene = (props:sceneProps)=> {
   const {projectiles} = props
   const [fired, setFired] = useState<Boolean>(false)
   const ref =useRef<any>()
   const floor = useRef<any>()

   useEffect(()=>{
     if(projectiles.length >0){
        setFired(true)
     }
   }, [projectiles])

    return (
       <>

       <RigidBody type="fixed" userData={{
         child: floor.current
       }}>
        <Box name="floor" ref={floor} receiveShadow position={[0,0,0]} args={[25,2,25]}>
        <meshStandardMaterial color={"lightgrey"} />
       </Box>
       </RigidBody>

       <RigidBody lockRotations  userData={{
         health: 100,
         child: ref.current
       }}>
        <Box name="wall" ref={ref} castShadow position={[0,5,-5]} args={[3,2,0.25]} >
        <meshStandardMaterial color={"red"} />
       </Box>
       </RigidBody>

       {fired && projectiles.map((projectile:any)=>(
          <Bullet key={projectile.id} bullet={projectile} />
       ))}

       </> 
    )
}


export default Scene
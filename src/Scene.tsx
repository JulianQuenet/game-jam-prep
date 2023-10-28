import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import { Bullet } from "./Components/Bullet";


interface sceneProps {
    projectiles:any,
}

export const Scene = (props:sceneProps)=> {
   const {projectiles} = props
   const [fired, setFired] = useState<Boolean>(false)

   useEffect(()=>{
     if(projectiles.length >0){
        setFired(true)
     }
   }, [projectiles])

    return (
       <>

       <RigidBody type="fixed">
        <Box receiveShadow position={[0,0,0]} args={[25,2,25]}>
        <meshStandardMaterial color={"lightgrey"} />
       </Box>
       </RigidBody>

       <RigidBody >
        <Box castShadow position={[0,5,-5]} args={[3,2,3]}>
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
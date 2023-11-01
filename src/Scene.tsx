import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState, useRef } from "react";
import { Bullet } from "./Components/Bullet";
import { Model } from "./Components/Old_toy";



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

   useEffect(()=>{
      if(ref.current){
         ref.current.position.copy([2,3,4])
      }
   })

    return (
       <>

       <RigidBody type="fixed" userData={{
         child: floor.current
       }}>
        <Box name="floor" ref={floor} receiveShadow position={[0,0,0]} args={[25,2,25]}>
        <meshStandardMaterial color={"lightgrey"} />
       </Box>
       </RigidBody>

       <RigidBody  userData={{
         health: 100,
         child: ref.current
       }}>
        <Box name="wall" ref={ref} position={[0,5,0]} args={[3,2,0.5]} >
        <meshStandardMaterial color={"red"} />
       </Box>
       </RigidBody>

       {fired && projectiles.map((projectile:any)=>(
          <Bullet key={projectile.id} bullet={projectile} />
       ))}
         

         <RigidBody name="box" colliders="trimesh" position={[5,2,0]}>
            <Model /> 
         </RigidBody>


         <RigidBody  type={"fixed"}  userData={{
         child: floor.current
       }}>
        <Box name="floor" ref={ref} receiveShadow position={[0,0,0]} args={[5,12,5]}>
        <meshStandardMaterial color={"lightgrey"} />
       </Box>
       </RigidBody>
         
        
        
       </> 
    )
}


export default Scene
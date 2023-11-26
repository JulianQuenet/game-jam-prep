import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState, useRef } from "react";
import { Bullet } from "./Components/Bullet";
import { Backrooms } from "./Components/Backrooms_another_level";
import { Room } from "./Components/Room"
import { Safe } from "./Components/Safe";
import * as THREE from "three"



interface sceneProps {
    projectiles:any,
    finHit : (hitId: any) => void
    setShow : any
    openSafe : Boolean
}

export const Scene = (props:sceneProps)=> {
   const {projectiles, finHit, setShow, openSafe} = props
   const [fired, setFired] = useState<Boolean>(false)
   const [hitObject, setHitObject] = useState<any>({})

   useEffect(()=>{
     if(projectiles.length > 0){
        setFired(true)
        
     }
     
   
   }, [projectiles])
   
   

    return (
       <>

       {fired && projectiles.map((projectile:any)=>(
          <Bullet setObj={setHitObject} key={projectile.id} bullet={projectile} finHit={finHit}/>
       ))}
       
       {false && <RigidBody type="fixed" colliders="trimesh" position={[5,2,10]}>
       
      <Backrooms />
      
      </RigidBody>}
       
      <Room />

      <Safe setShow={setShow} openSafe={openSafe}/>
       
       </> 
    )
}


export default Scene

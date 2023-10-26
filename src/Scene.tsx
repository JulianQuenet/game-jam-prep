import { Box } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";

export const Scene = ()=> {


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

       </> 
    )
}


export default Scene
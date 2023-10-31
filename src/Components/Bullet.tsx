import { Decal, Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry.js";

interface bulletProps {
  bullet: any;
}

export const Bullet = (props: bulletProps) => {
  const { bullet } = props;
  const {camera, scene} = useThree()



  useEffect(() => {

      const raycast = new THREE.Raycaster()
      const pos:any = {x:0.025,y:0}
      raycast.setFromCamera(pos, camera)
      const hit:any = raycast.intersectObjects(scene.children.filter((child)=>{
        return child.children.length > 1
      }))
      
      if(hit.length){
        const position = hit[0].point.clone()
        const eye = position.clone()
        eye.add(hit[0].face.normal)
     
      const rotation = new THREE.Matrix4()
      rotation.lookAt(eye, position, THREE.Object3D.DEFAULT_UP)
      const euler1 = new THREE.Euler()
      euler1.setFromRotationMatrix(rotation)

      const decalGeometry = new DecalGeometry(
        hit[0].object, hit[0].point, euler1, new THREE.Vector3(1,1,1)
      )
      
      const decalMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
      })
      const decal = new THREE.Mesh(decalGeometry, decalMat)
      decal.receiveShadow = true
      scene.add(decal)
      console.log(hit[0].object)
      }
      

  }, []);

  return (
    <>
        <mesh position={[bullet.position.x, bullet.position.y, bullet.position.z]}>
            <Sphere  args={[0.000005]}>
          <meshStandardMaterial color={"black"} />
        </Sphere>
        </mesh>
    </>
  );
};

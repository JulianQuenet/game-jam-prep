import { Decal, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface bulletProps {
  bullet: any;
}

export const Bullet = (props: bulletProps) => {
  const { bullet } = props;
  const bulletRef = useRef<any>();
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const SPEED = 300;
  useEffect(() => {
    if(bulletRef.current){frontVector.set(0, 0, -1);
        sideVector.set(0, 0, 0);
        direction
          .subVectors(frontVector, sideVector)
          .normalize()
          .multiplyScalar(SPEED)
          .applyEuler(bullet.direction);

    bulletRef.current.setLinvel(
        { x: direction.x, y: direction.y, z: direction.z },
        true
      );}
  }, []);


  return (
    <>
      <RigidBody
        gravityScale={0}
        ref={bulletRef}
        userData={{
          type: "bullet",
          damage: 10,
        }}
        sensor
        onIntersectionEnter={(e: any) => {
          if (e.other.rigidBody.userData?.type !== "bullet" && e.other.rigidBody.userData?.type !== "player") {
            bulletRef.current.setEnabled(false);
            console.log(e.other.rigidBody.userData?.child)
          }
        }}
      >
        <mesh position={[bullet.position.x, bullet.position.y, bullet.position.z]}>
            <Sphere  args={[0.0125]}>
          <meshStandardMaterial color={"black"} />
        </Sphere>
        </mesh>
        
      </RigidBody>
    </>
  );
};

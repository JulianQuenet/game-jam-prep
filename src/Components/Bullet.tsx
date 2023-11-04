import { Instance, Instances } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry.js";

interface bulletProps {
  bullet: any;
  setObj: any;
  finHit : (hitId: any) => void
}

interface boxProps{
  scale: any,
  speed:any,
  target: any
}



export const Bullet = (props: bulletProps) => {
  const { bullet, setObj, finHit } = props;
  const {camera, scene} = useThree()
  const [positionBlt, setPositionBlt] = useState<any>();
  const [rotationBlt, setRotationBlt] = useState<any>();
  const [ number, setNumber] = useState<any>()
  const textureLoader = new THREE.TextureLoader()
  const recoilX = (camera.position.y - 3 ) / 100
  const raycast = new THREE.Raycaster()
  let recoilY = bullet.recoil *2.65


  const AnimatedBox = (props:boxProps) => {
    const{scale, speed, target} = props
    const ref = useRef<any>();
    useFrame((_, delta) => {
      if (ref.current.scale.x > 0) {
        ref.current.scale.x =
          ref.current.scale.y =
          ref.current.scale.z -=
            speed * delta;
      }
      ref.current.position.lerp(target, speed);
    });
    return <Instance ref={ref} scale={scale} position={[0, 0, 0]} />;
  };
 
  const boxes = useMemo(
    () =>
      Array.from({ length: number }, () => ({
        target: new THREE.Vector3(
          THREE.MathUtils.randFloat(-0.1, 0.4),
          THREE.MathUtils.randFloat(-0.1, 0.4),
          THREE.MathUtils.randFloat(-0.1, 0.4)
        ),
        scale: 0.015, 
        speed: Math.random()/10,
      })),
    [number]
  );

  useEffect(() => {
      
      const pos:any = {x:recoilX,y: recoilY}
      raycast.setFromCamera(pos, camera)
      const hit:any = raycast.intersectObjects(scene.children.filter((child)=>{
        return child.children.length > 1
      }))
      
      
      if(hit.length ){
        setTimeout(() => {
          finHit(bullet.id);
      }, 700);
        const position = hit[0].point.clone()
        const eye = position.clone()
        eye.add(hit[0].face.normal)
       setPositionBlt(position)
       setNumber(100)
      const rotation = new THREE.Matrix4()
      rotation.lookAt(eye, position, THREE.Object3D.DEFAULT_UP)
      const euler1 = new THREE.Euler()
      euler1.setFromRotationMatrix(rotation)
      setRotationBlt(euler1)
      const enem:number = hit[0].object.name !== "enem"? 0.05 :  0.75 

      const decalGeometry = new DecalGeometry(
        hit[0].object, hit[0].point, euler1, new THREE.Vector3(enem,enem,enem)
      )
      const texture = hit[0].object.name !== "enem"? 'bullet.png'  : 'splat.png'
      
      const decalMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: textureLoader.load(`./textures/${texture}`),
        polygonOffset: true,
        polygonOffsetFactor: -4,
        transparent: true,
        depthWrite: true,
      })
      const decal = new THREE.Mesh(decalGeometry, decalMat)
      decal.receiveShadow = true
      scene.add(decal)
      setObj(hit[0].object)
      
      }

  }, []);



  return (
    <> 
    <group position={positionBlt} rotation={rotationBlt}>
<Instances>
            <sphereGeometry />
           <meshStandardMaterial   color="maroon" />
           {boxes.map((box, i) => (
          <AnimatedBox key={i} {...box} />
        ))}
</Instances>
</group>
    </>
  );
};

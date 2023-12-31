/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 roselle_composition_book.glb 
Author: Anthony Yanez (https://sketchfab.com/paulyanez)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/roselle-composition-book-639955874f824bc381702faf7684d779
Title: Roselle Composition Book
*/

import {  useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import usePlayerControls from './inputs'
import { useFrame, useThree } from '@react-three/fiber'

interface bookProps{
  openDiary : any,

}

export function Diary1(props:bookProps) {
  const {openDiary} = props
  const [canOpen, setCanOpen] = useState<Boolean>(false)
  const { nodes, materials }:any = useGLTF('/roselle_composition_book.glb')
  const bookRef = useRef<any>()
  const {interact} = usePlayerControls()
  const {camera} = useThree()

  useFrame(()=>{
    const time = Date.now() * 0.0005
    const position = bookRef.current.position
    const distance = position.distanceTo(camera.position)
    if(interact && canOpen && distance < 2.5){
      bookRef.current.rotation.y = 0
      openDiary(true)
      setCanOpen(false)
    }if(canOpen && distance < 2.5){
      bookRef.current.rotation.y = Math.sin(time *4.5) * 0.25
    }
  })
 
  function openBook(){
     if(bookRef.current){
      setCanOpen(true)
  }
}

  return (
    <RigidBody>
    <group dispose={null} position={[0,2,5.5]} scale={0.00055} ref={bookRef} onPointerOver={openBook}>
      <group position={[0, 0.035, 0.542]} rotation={[0, 0, Math.PI]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-8.83, 4.194, 0]} scale={[1, 1, 0.5]}>
            <mesh geometry={nodes['Book_01_-_Default_0'].geometry} material={materials['01_-_Default']} />
            <mesh geometry={nodes['Book_02_-_Default_0'].geometry} material={materials['02_-_Default']} />
            <mesh geometry={nodes['Book_03_-_Default_0'].geometry} material={materials['03_-_Default']} />
          </group>
        </group>
      </group>
    </group>
    </RigidBody>
  )
}

useGLTF.preload('/roselle_composition_book.glb')

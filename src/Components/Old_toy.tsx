/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 old_toy.glb 
Author: suramis (https://sketchfab.com/suramis)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/toy-monkey-319ae87bdd364a70afd13b26026f0944
Title: Toy monkey
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model() {
  const { nodes, materials }:any = useGLTF('/old_toy.glb')
  return (
    <group  dispose={null}>
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.defaultMaterial.geometry} material={materials.material} />
        <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.defaultMaterial} />
      </group>
    </group>
  </group>
  )
}

useGLTF.preload('/old_toy.glb')
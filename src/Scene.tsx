
import { useEffect, useState, useRef } from "react";
import { Room } from "./Components/Room"
import { Safe } from "./Components/Safe";
import { Diary2 } from "./Components/Prop_pen_and_paper";
import { Diary1 } from "./Components/Roselle_composition_book";
import { Lady } from "./Components/Lady";
import { Corridor } from "./Components/Corridor";


interface sceneProps {
    setShow : any,
    openSafe : Boolean,
    diary1 : any,
    diary2 : any,
}

export const Scene = (props:sceneProps)=> {
   const {setShow, openSafe, diary1, diary2} = props

    return (
       <>
      <Room />
      <Diary1   openDiary={diary1}/>
      <Diary2  openDiary={diary2}/>
      { false && <Lady />}
      <Safe setShow={setShow} openSafe={openSafe}/>
      <Corridor />
       </> 
    )
}


export default Scene

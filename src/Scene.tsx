
import { useEffect, useState, useRef } from "react";
import { Room } from "./Components/Room"
import { Safe } from "./Components/Safe";
import { Diary2 } from "./Components/Prop_pen_and_paper";
import { Diary1 } from "./Components/Roselle_composition_book";
import { Diary3 } from "./Components/Prop_pen_and_paper1";
import { Lady } from "./Components/Lady";
import { Corridor } from "./Components/Corridor";


interface sceneProps {
    setShow : any,
    openSafe : Boolean,
    diary1 : any,
    diary2 : any,
    diary3 :any,
    door:Boolean,
}

export const Scene = (props:sceneProps)=> {
   const {setShow, openSafe, diary1, diary2, diary3,door} = props

    return (
       <>
      <Room door={door}/>
      <Diary1   openDiary={diary1}/>
      <Diary2  openDiary={diary2}/>
      <Diary3 openDiary={diary3}/>
      { false && <Lady />}
      <Safe setShow={setShow} openSafe={openSafe}/>
      <Corridor />
       </> 
    )
}


export default Scene

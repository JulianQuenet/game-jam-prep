
import { Room } from "./Components/Room"
import { Safe } from "./Components/Safe";
import { Diary2 } from "./Components/Prop_pen_and_paper";
import { Diary1 } from "./Components/Roselle_composition_book";
import { Diary3 } from "./Components/Prop_pen_and_paper1";
import { Lady } from "./Components/Lady";
import { Corridor } from "./Components/Corridor";
import { Mannequin } from "./Components/Mannequin";
import { Keys } from "./Components/Key_with_tag";



interface sceneProps {
    setShow : any,
    diary1 : any,
    diary2 : any,
    diary3 :any,
    door:Boolean,
    lady : Boolean,
    showKey : Boolean,
    setShowKey : any,
    hasKey : Boolean,
    setHasKey : any,
    knock : Boolean,
    setKnock : any,
}

export const Scene = (props:sceneProps)=> {
   const {setShow, diary1, diary2, diary3, door, lady, showKey, 
    setShowKey, hasKey, setHasKey, knock, setKnock} = props

    return (
       <>
      <Room knock={knock} setKnock={setKnock} hasKey={hasKey} door={door}/>
      <Diary1   openDiary={diary1}/>
      <Diary2   openDiary={diary2}/>
      <Diary3   openDiary={diary3}/>
      { (lady && showKey )&& <Lady />}
      <Safe lady={lady} setShow={setShow}/>
      <Corridor />
      <Mannequin />
      {showKey && <Keys setHasKey={setHasKey} showKey={showKey} setShowKey={setShowKey}/>}
       </> 
    )
}


export default Scene

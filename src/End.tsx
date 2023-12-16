import { useState, useEffect } from "react"
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './index.css'



export function End(){
   const [outro, setOutro] = useState<Boolean>(false)
   const [recorder, setRecorder] = useState<Boolean>(true)
   
  
 useEffect(()=>{
    setTimeout(()=>{
        setRecorder(false) 
        setOutro(true)
        },1500)
       setTimeout(()=>{
        setOutro(false)
       },3500)
 },[])
   
   function Recorder(){
    return (
        <div className='vcr'>
         <div style={{display:"flex", justifyContent:"space-between", padding:" 0 50px"}}>
          <div style={{display:"flex", alignItems:"center", gap:"5px"}}>Play  <div><PlayArrowIcon /></div></div>
         <div><h6>Date: 20/02/2023</h6></div>
         </div>
         <div style={{width:"100vw", height:"90vh", display:"flex", justifyContent:"center"}}>
          <div  style={{display:"flex", alignItems:"center", gap:"5px"}}>Video corrupted <BrokenImageIcon/></div>
         </div>
          </div>
      )
   }

    return(
        <>
        { recorder && <Recorder />}
        <div className="end-screen" style={{ margin:"0 auto", width : "80vw",
        backgroundColor : "black", color:"white", 
        display:"flex", justifyContent:"center", alignItems:"center", 
        fontFamily:"monospace", padding:"40px", textAlign:"center",}}>
           { outro && <div className="outro" style={{height:"80vh", display:"flex", alignItems:"center"}}>
            <div>To be continued...</div>
           </div>}
        { (!outro &&!recorder) && <div className="credits-section">
        This project was made for the 7dfps game jam but will be continued, as it is  a two 
        part series so to speak, and hopefully the second part is a bit more polished as I'll be
        moving to using a proper game engine seeing as I'm currently using react three fiber which is 
        great, though I feel like I might be able to achieve more with something like Godot or Unity. Nonetheless
        none of this project would've been possible if it weren't for the following artists, I edited some of them
        in unity as well as adding some animations however the bulk of the work came from there side;
        <br/>
        <br/>
        <div className="credit">
        Ceiling light;
        <div>Author: rhcreations (https://sketchfab.com/rhcreations)</div>
        
        <div>License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://sketchfab.com/3d-models/ceiling-light-with-chain-7467af164bd64d0db09565b70b216e12</div>
        
        <div>Title: Ceiling Light with Chain</div>
        
        </div>
        <br/>
        <br/>
        <div className="credit">
        Key;
        <div >Author AxonFXDesigns (https://sketchfab.com/AxonFXDesigns)</div>
        
        <div>License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://sketchfab.com/3d-models/key-with-tag-16ea3fbecc6346df9859f0e18406951b</div>
        
        <div>Title: Key with Tag </div>
        
        </div>
        <br/>
        <br/>
        <div className="credit">
        Main room;
        <div>Author: Qifan Zhang (https://sketchfab.com/qifanzhang)</div>
        
        <div>License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://sketchfab.com/3d-models/an-old-cheap-room-in-chinatown-9c2ec26be3cb4d9b91d51755e7210fdd</div>
        
        <div>Title: An Old Cheap Room in Chinatown</div>
        
        </div>
        <br/>
        <br/>
        <div className="credit">
        Mannequin;
        <div>Author: Veterock (https://sketchfab.com/windofglass)</div>
        
        <div>License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://sketchfab.com/3d-models/mannequin-9266cb240ed343c3b69b675e1b4930c4</div>
        
        <div>Title: Mannequin</div>
        
        </div>
        <br/>
        <br/>
        <div className="credit">
        Paper;
        <div>Author: Pieter (https://sketchfab.com/cartonpieter)</div>
        
        <div>License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://sketchfab.com/3d-models/prop-pen-and-paper-d14d5015fd774987a0988c973b798753</div>
        
        <div>Title: PROP: pen and paper</div>
        
        </div>
        <br/>
        <br/>
        <div className="credit">
        Text book;
        <div> Author: Anthony Yanez (https://sketchfab.com/paulyanez)</div>
       
        <div>License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://sketchfab.com/3d-models/roselle-composition-book-639955874f824bc381702faf7684d779</div>
        
        <div>Title: Roselle Composition Book</div>
        
        </div>
        <br/>
        <br/>
        <div className="credit">
        Corridor;
        <div>Author: Nevermoredmb (https://sketchfab.com/nevermoredmb)</div>
        
        <div>License: CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://skfb.ly/6SG6R</div>
        
        <div>Title: Doors corridor</div>
        
        </div>
        <br/>
        <br/>
        <div className="credit">
        SCP;
        <div>Author: Kooale325 (https://sketchfab.com/Kooale325)</div>
        
        <div>License: CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://skfb.ly/oy6yC</div>
        
        <div>Title: SCP-6699</div>
        
        </div>
        <br/>
        <br/>
        <div className="credit">
        Safe;
        <div>Author: Shedmon (https://sketchfab.com/shedmon)</div>
        
        <div>License: CC-BY-4.0 (https://creativecommons.org/licenses/by/4.0/)</div>
        
        <div>Source: https://skfb.ly/6GspX</div>
        
        <div>Title: Safe</div>
        
        </div>
        <br/>
        <br/>
        <div className="sound">
        Most of the sounds were gotten from Pixabay for free
        under the Pixaby content license.
        <div className="credit">
        <div> Outro music;</div>
        <div>Title : Earth music by Kris</div>
        <div>Source : https://pixabay.com/sound-effects/earth-music-by-kris-20138/</div>
        </div>
        </div>
        <br/>
        <br/>
        <div style={{width:'100%', margin:"0 auto"}}>
        And a big thanks to all those who decided to give this game a try, it's not that great
        in terms of how I wanted to make but nonetheless had a real fun time making it and am definitely
        looking forward to making more games in the future...
        </div>
        </div>}
        </div>
        </>
    )
}
import {  useState } from 'react'
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Typewriter from 'typewriter-effect';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface menuProps {
    setShow : any,
}

interface book1Props{
    setDiary1 : any,
}

interface book2Props{
    setDiary2 : any,
    safe : any,
}

interface book3Props{
  setDiary3 : any,
  door : any,
  deja : any,
  close : any,
  showLady : any,
  showKey : any,
}


interface introProps{
  start: any,
  skip : Boolean,
}

export function Menu(props : menuProps){
    const {setShow} = props
    const sound = new Audio('./Sounds/code_input.mp3')
    function Submit(e:any){
      if(e.code === "Space"){
       setShow(false)
       
      }
    }

    function handleChange(e:any){
      e.preventDefault
      sound.play()
      
    }
    
    window.addEventListener("keydown", Submit )

    return(
      <div className='menu'> 
        <div className="holder">
            <h2 style={{textAlign:"center", fontWeight: 300}}>
              Input code
            </h2>
            <p style={{fontSize: "10px", textAlign: "center"}}>Press "TAB" to interact</p>
            <input type='text' placeholder='0000' onChange={handleChange}>
            </input>
            <div className='buttons-holder' >
               <div className='button-return'>
                  <div>Return</div>
                  <div style={{textAlign:"center"}}><SpaceBarIcon fontSize='small'/></div>
               </div>
               <div className='button-enter'>
                  <div>Enter</div>
                  <div style={{textAlign:"center"}}><KeyboardReturnIcon fontSize='small'/></div>
               </div>
            </div>
        </div>
      </div>
    )
  }


 export function Book1(props:book1Props){
    const {setDiary1} = props
    function closeDiary(e:any){
       if(e.code === "Space"){
        setDiary1(false)
       }
    }

    window.addEventListener("keydown", closeDiary )

    return(
      <div className='diary' style={{width:'100vw', height:"100vh", display:"flex",
      justifyContent :"center", alignItems : "center"
      }}>
        <div className='page' style={{display:"flex", flexDirection: "column", gap : "10px", width:"400px" }}>
          <div>
            Date: 08 Feb 2003 18:49
            <br/>
            Johnny Eckard
          </div>
          <div>
            I don't know what's happening anymore...I haven't slept for 3 days.
            I keep hearing things...seeing things, I decided 
            to start writing things down as I fear my mind is starting to fail me, though
            I guess the best case scenario is that I am going crazy and that all this is my mind 
            playing tricks on me...I don't want to be part of a reality where that thing...that place exists.
            I should've listened to her.
            <br/>
            <br/>
            <br/>
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
              <SpaceBarIcon fontSize='small'/> to close
            </div>
            
          </div>
        </div>
      </div>
    )
  }

  export function Book2(props : book2Props){
    const  {setDiary2, safe} = props

    function closeDiary(e:any){
        if(e.code === "Space"){
         setDiary2(false)
         safe(true)
        }
     }
 
     window.addEventListener("keydown", closeDiary )

    return(
      <div className='diary' style={{width:'100vw', height:"100vh", display:"flex",
      justifyContent :"center", alignItems : "center"
      }}>
        <div className='page' style={{display:"flex", flexDirection: "column", gap : "10px", width:"400px" }}>
          <div>
            Date: 09 Feb 2003 07:49
            <br/>
            Johnny Eckard
          </div>
          <div>
            I managed to fall sleep last night...though I dreamt about that place again,
            that girl was there too, or at least I could hear her, when I woke I found that door open again 
            and seems like all the other pages of my diary were torn out...I can't help but feel like someone
            watches me as I sleep, as if they're taking shelter in the corners, observing from the
            the infinite darkness. From now on I'm going to lock that door, as well as the bathroom or at least when 
            it's not in use. I gotta get out of here soon, apparently there's a new apartment block right next to the local 
            mall, got a nice name too, Ridge Mead...just sounds like a new chapter to me, I'm seeing the landlord soon, 
            maybe I can be gone from all this. 
            <br/>
            NB new code to safe 6522
            <br/>
            <br/>
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
              <SpaceBarIcon fontSize='small'/> to close
            </div>
            
          </div>
        </div>
      </div>
    )
  }


  export function Book3(props:book3Props){
    const {setDiary3,door,deja,close, showLady, showKey} = props
    const [canClose, setCanClose] = useState<Boolean>(false)
    
  
    function closeDiary(e:any){
      if(e.code === "Space"){
       door(false)
       setDiary3(false)
       deja(true)
       if(canClose){
        close(true)
       }
      }
   }

   window.addEventListener("keydown", closeDiary )

    return (
      <div className='diary' style={{width:'100vw', height:"100vh", display:"flex",
      justifyContent :"center", alignItems : "center"
      }}>
        <div className='page' style={{display:"flex", flexDirection: "column", gap : "10px", width:"400px" }}>
          <div>
            Date: 10 Feb 2003 19:35
            <br/>
            Johnny Eckard
          </div>
          <div>
            I was about to leave to see the landlord until I heard voices coming from that room,I decided
            to get the key and open it, though seems like the safe had already been opened...maybe that thing 
            read my journal entries...could it really be that sentient, maybe that means it can also change the code? 
            Nonetheless I decided it was time to face my fears, after all this is my home...I make the rules,
            not it. After opening the door the voices stopped but soon after laughter followed coming from what 
            seemed like an endless corridor, soon they started calling my name,
            I felt an overwhelming force pulling me closer...all my worries in that moment had vanished, I could feel myself 
            getting ready to step forward, in the very last moment I pulled back and shut the door, deafening screams followed 
            surrounding every corner of the house, I ran to the bathroom and shut the door, soon the screaming stopped. I decided 
            that this will be my last day, I'm leaving this place, I have enough money to leave with nothing, I can start over
            and build a new life.<Typewriter  onInit={(typewriter) => {
             typewriter.pauseFor(30000).typeString(`Johnny didn't even make it out the bathroom, I broke his legs and threw him in that room
             where he belonged, where you all belong. It's the beginning and the end, what was and what will be, a place 
             where even time can't escape.`)
             .pauseFor(300)
             .callFunction(()=>{
              const openSafe = new Audio ("./Sounds/safe-opening.mp3")
              setCanClose(true)
              showKey(true)
              openSafe.play()
              showLady(true)
             })
             .start();
           }}/> 
            <br/>
            <br/>
            <br/>
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
              <SpaceBarIcon fontSize='small'/> to close
            </div>
            
          </div>
        </div>
      </div>
    )
  }



  export function Intro(props:introProps){
    const {start, skip} = props
    
    function startGame(e:any){
      if(!skip){
        return
      }else if(
        e.code ==="Space"
      ){
        start(false)
      }
    }
    
    window.addEventListener("keydown", startGame)
   
    return (
      <div className='diary' style={{width:'100vw', height:"100vh", display:"flex",
      justifyContent :"center", alignItems : "center"
      }}>
        <div className='page' style={{display:"flex", flexDirection: "column", gap : "10px", width:"400px" }}>
           <div>
             Third investigation in the mysterious missing persons cases.
             <br/>
            February 20 2003
            <br/>
            David Henshaw : Private investigator
           </div>
           <br/> 
            Found a curious post online detailing similar events to the two other investigations I
            conducted...both unsolved and ongoing. Each detailing an ominous place that seems to haunt and
            follow them, though no evidence to their claims have been brought to the surface. This one seems to 
            be a bit different though...it's alot newer in terms of the date of the post and the start of this investigation. 
            In the two other investigations there was a difference of a few years, in this investigation there is a difference
            of a few days. Evidence is still fresh and the police haven't cased out the house yet...seems like they have other 
            things on their plates to deal with. I tried getting a beat on the address though without difficulty as similar to the 
            two other investigations I received an anonymous letter with an address and a name, Johnny Eckard.
            <br/>
            <br/>
            <br/>
            <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
              <SpaceBarIcon fontSize='small'/> to start...
            </div>
            
          </div>
        </div>
    )
  }


export function Recorder(){

    return (
      <div className='vcr'>
       <div style={{display:"flex", justifyContent:"space-between", padding:" 0 50px"}}>
        <div style={{display:"flex", alignItems:"center", gap:"5px"}}>Play  <div><PlayArrowIcon /></div></div>
       <div><h6>Date: 20/02/2023</h6></div>
       </div>
        </div>
    )
  }



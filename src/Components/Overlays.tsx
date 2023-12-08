import { useEffect, useState } from 'react'
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Typewriter from 'typewriter-effect';

interface menuProps {
    setShow : any,
}

interface book1Props{
    setDiary1 : any
}

interface book2Props{
    setDiary2 : any
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
    const  {setDiary2} = props

    function closeDiary(e:any){
        if(e.code === "Space"){
         setDiary2(false)
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
            the infinite darkness. From now on I'm going to lock that door, as well as the bathroom for now or at least when 
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


  export function Book3(){
    
    const [startTyping, setStartTyping] = useState<Boolean>(false)
    
    useEffect(()=>{
     setStartTyping(false)
     setTimeout(()=>{
      setStartTyping(true)
     },5000)
    },[])

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
            and build a new life.{ startTyping && <Typewriter  onInit={(typewriter) => {
             typewriter.typeString(`Johnny didn't even make it out the bathroom, I broke his legs and threw him in that room
             where he belonged, where you all belong. It's the beginning and the end, what was and what will be, a place 
             where even time can't escape.`)
             .pauseFor(300)
             .deleteAll()
             typewriter.typeString("You're next...")
             .start();
           }}/> }
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

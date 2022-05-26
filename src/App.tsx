import React, { useEffect, useState } from 'react';
import * as C from './App.styles'
import logoImg from './assets/logo/logo.png'
import { Button } from './components/Button/inde';
import { InfoItem } from './components/InfoItem';
import RestartIcon from './assets/svgs/restart.svg'

import {GridItemType} from './types/GridItemType'

import {Items} from './data/items'
import { GridItem } from './components/GridItem';
import { formatTime } from './helpers/formatTime';

function App() {
  const [playing , setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount , setMoveCount] = useState<number>(0)
  const [shownCount, setShowCount] = useState<number>(0)
  const [gridItems , setGridItems] = useState<GridItemType[]>([])
 
    useEffect(() => {
      resetGame()
    },[])

    useEffect(()=> {
      const timer = setInterval(() => {
        if(playing) {
          setTimeElapsed(timeElapsed + 1)
          }
       },1000)

      return () => clearInterval(timer)

    },[playing, timeElapsed])

    // verify if 
    useEffect(() => {

      if(shownCount === 2) {
        let opened = gridItems.filter(item => item.shown === true)
        if(opened.length === 2) {
          // v1  - if both are equal , make every "shown" permant
         
           if(opened[0].item === opened[1].item) {
            let tmpGrid = [...gridItems];
             for(let i in tmpGrid) {
               if(tmpGrid[i].shown){
                 tmpGrid[i].permanentShown = true;
                 tmpGrid[i].shown = false
               }
             }
             setGridItems(tmpGrid)
             setShowCount(0)
           } else {
             // v2  
            setTimeout(() => {
              let tmpGrid = [...gridItems];
              for(let i in tmpGrid) {
                tmpGrid[i].shown = false
              }

              setGridItems(tmpGrid)
              setShowCount(0)
            }, 1000)
           }
      
           setMoveCount(moveCount => moveCount + 1)
          
        }
      }


    },[shownCount, gridItems])

    useEffect(() => {
        if(moveCount > 0 && gridItems.every(item => item.permanentShown === true )){
          setPlaying(false)
        }
    },[moveCount, gridItems])

  const resetGame = () => {
    setTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)
    
    let tmpGrid: GridItemType[] = []
    for(let i = 0; i <(Items.length * 2); i++) {
        tmpGrid.push({
          item: null, 
          shown: false,
          permanentShown: false
        })
    }
    

    for (let w = 0; w < 2; w++) {
      for(let i =0; i < Items.length; i++){
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !== null) {
           pos =Math.floor(Math.random() * (Items.length * 2));
        }
        
        tmpGrid[pos].item = i
      }
    }

    // Jogar no STATE 
    setGridItems(tmpGrid)
    // Começar o Jogo
    setPlaying(true)
   

  }


  const handleItem = (index: number) => {
    if(playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false ) {
        tmpGrid[index].shown = true;
        setShowCount(shownCount + 1)
      }

      setGridItems(tmpGrid)
    }

  }

  return (
   <>
    <C.Container>
      <C.Info>
      <C.LogoLink>
        <img src={logoImg} alt=""  width='200'/>
      </C.LogoLink>
      <C.InfoArea>
        <InfoItem  label='Tempo' value={formatTime(timeElapsed)}/>
        <InfoItem  label='Movimentos' value={moveCount.toString()}/>
      </C.InfoArea>
        <Button icon={RestartIcon } label='Reiniciar' onClick={resetGame} />
      </C.Info>
      <C.GridArea>
       <C.Grid>
    {gridItems.map((item , index) => (
    <GridItem key={index}  item={item} onClick={() => handleItem(index)}/>
    ))}
       </C.Grid>
      </C.GridArea>

    </C.Container>
   </>
  );
}

export default App;

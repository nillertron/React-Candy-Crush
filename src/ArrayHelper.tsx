import { GiveColor } from "./ColorHelper";
import { CircleProps } from "./components/circle";

export const CheckHorizontalPops = async (arr:CircleProps[]) => {
    let arrToPop: number[] = [];
    for (let i = 0; i < arr.length ; i++) {
      const color = arr[i].color;
      if (i < arr.length - 2) {
        if (arr[i + 1].color === color) {
          if (arr[i + 2].color === color) {
            arrToPop.push(arr[i].id, arr[i + 1].id, arr[i + 2].id);
          }
        }
      }
    }
    return arrToPop;
  }
  export const CheckVerticalPops = async (circleArr:CircleProps[]) => {
    let arrToPop:number[] = [];
    for(let i = 0; i<circleArr.length; i++)
    {
      const color = circleArr[i].color;
      if(i+14 < circleArr.length)
      {
        if(circleArr[i+7].color === color)
        {
          if(circleArr[i+14].color === color)
          {
            arrToPop.push(circleArr[i].id, circleArr[i+7].id, circleArr[i+14].id);
            
          }
        }
      }
    }
  return arrToPop;
  }

  export const CheckSwapPossible = async (id1:number, id2:number,copiedArray:CircleProps[]) => {
    const obj1:CircleProps|undefined = copiedArray.find(x=>x.id === id1);
    const obj2:CircleProps|undefined = copiedArray.find(x=>x.id === id2);

    if(obj1 !== undefined && obj2 !== undefined)
    {
      const index1:number = copiedArray.indexOf(obj1); 
      const index2:number = copiedArray.indexOf(obj2); 
      const sum = index1-index2;
      if(sum === 1 || sum === -1)
      {
        return true;
      }
      else if(sum === 7 || sum === -7)
      {
        return true;
      }
    }
    return false;

  }
 export const CheckForSameColorRows = async (copiedArray: CircleProps[]) => {

    for (let i = 1; i < copiedArray.length; i++) {
        let below = false;
      if(i+7 >= copiedArray.length)
      {
          below = true;
      }
      if(!below)
      {
        while (copiedArray[i].color === copiedArray[i+7].color || copiedArray[i].color === copiedArray[i-1].color) {
            copiedArray[i].color = await GiveColor();

          }
      }
      else
      {
        while (copiedArray[i].color === copiedArray[i-1].color) {
            copiedArray[i].color = await GiveColor();

          }
      }
     
    }
    return copiedArray;
  }

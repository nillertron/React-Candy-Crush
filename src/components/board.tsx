import React from 'react';
import { Circle, CircleProps } from './circle';
import './board.css';
interface Props {
    Circles:CircleProps[];
    handleSwap:(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

}
 
interface State {
    
}
 
class Board extends React.Component<Props, State> {
    render() { 
        return (
            <div className="board-container">
            {this.props.Circles.map((x:CircleProps) =><div style={{backgroundColor:`${x.selected?"grey":""}`}} key={x.id} className="circle-container"><Circle selected={x.selected} id={x.id}  color={x.color} handleSwap={async (e) => await this.props.handleSwap(e)} /></div>)}
            </div>
        );
    }
}
 
export default Board;
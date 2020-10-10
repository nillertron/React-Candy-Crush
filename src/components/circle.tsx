import React from 'react';
import './circle.css';
export enum CircleColor{
    green,
    blue,
    red,
    yellow,
    purple,
    orange
}

export interface CircleProps {
handleSwap:(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
id:number;
selected:boolean;
color:CircleColor;

}
 
 
export class Circle extends React.Component<CircleProps> {
    render() { 
        return (
            <div id={this.props.id.toString()||''} onClick={e=>this.props.handleSwap(e)} style={{backgroundColor:`${CircleColor[this.props.color]}`}} className="circle"></div>
        );
    }
}
 
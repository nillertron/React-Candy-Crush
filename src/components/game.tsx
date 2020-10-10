import React from "react";
import {CheckForSameColorRows, CheckHorizontalPops, CheckSwapPossible, CheckVerticalPops,} from "../ArrayHelper";
import { GiveColor } from "../ColorHelper";
import { determinePoint } from "../PointHelper";
import Board from "./board";
import { CircleProps } from "./circle";
import Rules from "./rules";

interface Props {}

interface State {
  Circles: CircleProps[];
  Circle1index: number;
  Circle2index: number;
  Point: number;
}

class Game extends React.Component<Props, State> {
  state = {
    Circles: [],
    Circle1: undefined,
    Circle2: undefined,
    Circle1index: -1,
    Circle2index: -1,
    Point: 0,
  };
  async componentDidMount() {
    let arr: CircleProps[] = [...this.state.Circles];
    for (let i = 0; i < 105; i++) {
      const obj: CircleProps = {
        handleSwap: (e) => this.handleSwap(e),
        id: i,
        color: await GiveColor(),
        selected: false,
      };
      arr.push(obj);
    }
    const sortedArray = await CheckForSameColorRows(arr);
    if (sortedArray !== undefined) {
      arr = sortedArray;
    }
    await this.setState({ Circles: arr });
    await this.CheckForTriplets(true);
  }


  async CheckForTriplets(extraRender: boolean) {
    let arrToPop: number[] = [];
    const arr: CircleProps[] = [...this.state.Circles];
    const horizontalMatches = await CheckHorizontalPops(arr);
    const verticalMatches = await CheckVerticalPops(arr);
    arrToPop = [...horizontalMatches, ...verticalMatches];

    if (arrToPop.length > 0) {
      await this.PopCircles(arrToPop);
    } else {
      if (!extraRender) {
        this.setState({ Point: this.state.Point - 50 });
      }
    }
  }

  async PopCircles(popArray: number[]) {
    const circleArray: CircleProps[] = [...this.state.Circles];
    const uniqueArray = popArray.filter((v, i, a) => a.indexOf(v) === i);
    const newArr = circleArray.filter((x) => !uniqueArray.includes(x.id));
    const pointToAssign = await determinePoint(popArray);
    await this.setState({
      Circles: newArr,
      Point: this.state.Point + pointToAssign,
    });
    await this.CheckForTriplets(true);
  }

  async handleSwap(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (this.state.Circle1index === -1) {
      await this.setState({
        Circle1index: parseInt((e.target as HTMLElement).id),
      });
      await this.SelectTarget(this.state.Circle1index);
    } else if (this.state.Circle2index === -1) {
      await this.setState({
        Circle2index: parseInt((e.target as HTMLElement).id),
      });
      if (
        await CheckSwapPossible(
          this.state.Circle1index,
          this.state.Circle2index,
          this.state.Circles.concat()
        )
      ) {
        await this.SwitchObjects();
      } else {
        await this.resetState();
      }
    }
  }
  async SelectTarget(id: number) {
    const arr: CircleProps[] = this.state.Circles.concat();

    const obj: CircleProps | undefined = arr.find((x) => x.id === id);
    if (obj) {
      obj.selected = true;
      await this.setState({ Circles: arr });
    }
  }
  async DeselectTarget(id: number) {
    const arr: CircleProps[] = this.state.Circles.concat();
    const obj: CircleProps | undefined = arr.find((x) => x.id === id);
    if (obj) {
      obj.selected = false;
      await this.setState({ Circles: arr });
    }
  }
  async SwitchObjects() {
    let arr: CircleProps[] = [...this.state.Circles];
    const item1 = arr.findIndex((e) => e.id === this.state.Circle1index);
    const item2 = arr.findIndex((e) => e.id === this.state.Circle2index);
    [arr[item1], arr[item2]] = [arr[item2], arr[item1]];

    await this.setState({ Circles: arr });
    await this.resetState();
    await this.CheckForTriplets(false);
  }
  async resetState() {
    await this.DeselectTarget(this.state.Circle1index);
    await this.setState({ Circle1index: -1, Circle2index: -1 });
  }

  render() {
    return (
      <React.Fragment>
       <div className="row">

        <div className="col-sm-12 col-lg-6">
          <h5>Score: {this.state.Point}</h5>
          <Board
            handleSwap={async (e) => await this.handleSwap(e)}
            Circles={this.state.Circles}
          />
        </div>
        <div className="col-sm-12 col-lg-6">
        <Rules/>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;

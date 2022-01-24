
import { _decorator, Component, Node, director, Label } from 'cc';
const { ccclass, property } = _decorator;
import global from '../Game/global';

/**
 * Predefined variables
 * Name = End
 * DateTime = Tue Jan 18 2022 11:15:07 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = End.ts
 * FileBasenameNoExtension = End
 * URL = db://assets/Scripts/End/End.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('End')
export class End extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: Label })
    public score: Label | null = null;

    start() {
        // [3]
        this.score.string = global.score.toString();
    }

    restart() {
        director.loadScene('Game');
    }

    history() {
        console.log('历史成绩！');
    }

    quit() {
        director.loadScene('Start');
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */

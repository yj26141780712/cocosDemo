
import { _decorator, Component, Node, director, Animation } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Start
 * DateTime = Tue Jan 18 2022 10:54:03 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = Start.ts
 * FileBasenameNoExtension = Start
 * URL = db://assets/Scripts/Start/Start.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Start')
export class Start extends Component {

    @property({ type: Animation })
    public loadAnimation: Animation | null = null;

    start() {
        console.log('onload');
        this.loadAnimation.play();
        //预加载游戏
        console.log('预加载游戏！');
        director.preloadScene('Game');
    }


    startGame() {
        console.log('开始游戏！');
        director.loadScene('Game');
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

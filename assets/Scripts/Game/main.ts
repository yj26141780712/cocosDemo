
import { _decorator, Component, Node } from 'cc';
import { bulletGroup } from './bulletGroup';
import { enemyGroup } from './enemyGroup';
import { Hero } from './hero';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Main
 * DateTime = Tue Jan 18 2022 11:15:02 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = Main.ts
 * FileBasenameNoExtension = Main
 * URL = db://assets/Scripts/Game/Main.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Main')
export class Main extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({ type: Hero })
    public hero: Hero | null = null;

    @property({ type: enemyGroup })
    public enemyGroup: enemyGroup | null = null;

    @property({ type: bulletGroup })
    public bulletGroup: bulletGroup | null = null;

    start() {
        // [3]
        this.enemyGroup.startAction();
        this.bulletGroup.startAction();
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

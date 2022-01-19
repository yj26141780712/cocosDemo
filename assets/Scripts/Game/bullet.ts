
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = bullet
 * DateTime = Wed Jan 19 2022 14:15:47 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = bullet.ts
 * FileBasenameNoExtension = bullet
 * URL = db://assets/Scripts/Game/bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('bullet')
export class bullet extends Component {
    public speed: number;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        console.log(123);
        // [3]
    }

    // onCollisionEnter(other, self) {

    // }
    // update (deltaTime: number) {
    //     // [4]
    // }
    update(deltaTime: number) { // 刷新子弹位置
        const position = this.node.getPosition()
        position.y += deltaTime * this.speed;
        this.node.setPosition(position);
    }
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

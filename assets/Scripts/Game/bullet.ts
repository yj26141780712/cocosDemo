
import { _decorator, Component, Node, Collider2D, Contact2DType, PhysicsSystem2D } from 'cc';
import { bulletGroup } from './bulletGroup';
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
    @property({ tooltip: '子弹速度' })
    public speed: number = 0;

    public bulletGroup:bulletGroup;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        // let collider = this.getComponent(Collider2D);
        // if (collider) {
        //     collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        //     collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
        //     collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        // }
        // if (PhysicsSystem2D.instance) {
        //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        // }
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

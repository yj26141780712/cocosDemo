
import { _decorator, Component, UITransform, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
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

    public bulletGroup: bulletGroup;

    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 子弹碰到
        if (otherCollider.node.parent && otherCollider.node.parent.name === 'ufoGroup') {
            return;
        }
        new Promise((resolve) => {
            resolve(1);
        }).then(() => {
            this.bulletGroup.destoryNode(this.node);
        });
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
        const uit = this.node.parent.parent.getComponent(UITransform);
        if (position.y >= uit.height / 2) {
            this.bulletGroup.destoryNode(this.node);
        }
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


import { _decorator, Component, Node, UITransform, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ufo
 * DateTime = Fri Jan 21 2022 14:25:27 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = ufo.ts
 * FileBasenameNoExtension = ufo
 * URL = db://assets/Scripts/Game/ufo.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('ufo')
export class ufo extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property()
    public speedMax: number = 0;

    @property()
    public speedMin: number = 0;

    public speed = 0;

    public ufoGroup: any;

    start() {
        // [3]
        console.log('ufo加载成功！');
        this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin;
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(123);
        if (otherCollider.node.name === 'hero') {
            new Promise((resolve) => {
                resolve(1);
            }).then(() => {
                this.ufoGroup.destoryNode(this.node);
            });
        }
    }

    update(deltaTime: number) {
        const position = this.node.getPosition()
        position.y -= deltaTime * this.speed;
        this.node.setPosition(position);
        const uit = this.node.parent.parent.getComponent(UITransform);
        if (position.y < -uit.height / 2) {
            this.ufoGroup.destoryNode(this.node);
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

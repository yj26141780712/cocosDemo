
import { _decorator, Component, Collider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, UITransform } from 'cc';
import { enemyGroup } from './enemyGroup';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = enemy
 * DateTime = Thu Jan 20 2022 08:10:04 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = enemy.ts
 * FileBasenameNoExtension = enemy
 * URL = db://assets/Scripts/Game/enemy.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('enemy')
export class enemy extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    speed: number = 0;

    @property({ tooltip: '敌机分数' })
    public score: number = 0;

    @property({ tooltip: '敌机血量' })
    public HP: number = 0;

    @property({ tooltip: '最大速度' })
    public speedMax: number = 0;

    @property({ tooltip: '最小速度' })
    public speedMin: number = 0;

    public enemyGroup: enemyGroup;


    start() {
        // [3]
        this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin;
        let collider = this.getComponent(Collider2D);
        if (collider) {
            console.log('开启碰撞监听');
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        console.log(this.node.parent);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
       //console.log('onBeginContact');
       //console.log(otherCollider.node.parent.name);
        if(otherCollider.node.parent&&otherCollider.node.parent.name==='bulletGroup'){
            console.log('子弹碰撞敌机 敌机爆炸');
            this.enemyGroup.destoryNode(selfCollider.node);
        }
    }

    update(deltaTime: number) {
        const position = this.node.getPosition()
        position.y -= deltaTime * this.speed;
        this.node.setPosition(position);
        const uit = this.node.parent.parent.getComponent(UITransform);
        if(position.y<-uit.height/2){
            //console.log(uit.height);
           this.enemyGroup.destoryNode(this.node);
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

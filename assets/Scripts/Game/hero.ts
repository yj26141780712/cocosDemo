
import { _decorator, Component, Animation, SystemEvent, EventTouch, Vec3, UITransform, TERRAIN_HEIGHT_BASE, Collider2D, Contact2DType, IPhysics2DContact, director } from 'cc';
import { bulletGroup } from './bulletGroup';
import { common } from './common';

const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Hero
 * DateTime = Wed Jan 19 2022 12:03:58 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = Hero.ts
 * FileBasenameNoExtension = Hero
 * URL = db://assets/Scripts/Game/Hero.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Hero')
export class Hero extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({ type: bulletGroup })
    public bulletGroup: bulletGroup | null;

    @property({ type: Animation })
    public heroAnimation: Animation | null = null;

    @property({ type: common })
    public common: common | null = null;

    start() {

        //开启飞机动画
        this.heroAnimation.play();
        //监听拖拽事件
        this.onDrag();
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.parent.name === 'ufoGroup') { // ufo
            if (otherCollider.node.name === 'doubleBullet') {
                this.bulletGroup.changeBullte(otherCollider.node.name);
            }
            if (otherCollider.node.name === 'tnt') {
                console.log('释放炸弹')
            }
        } else if (otherCollider.node.parent.name === 'enemyGroup') { // 敌人
            this.heroAnimation.play('hero_exploding');
            this.heroAnimation.on(Animation.EventType.FINISHED, this.onHandleDestroy, this);
        }
    }

    onDrag() {
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this.handleTouchMove, this);
    }

    offDrag() {
        this.node.off(SystemEvent.EventType.TOUCH_MOVE, this.handleTouchMove, this);
    }

    handleTouchMove(event: EventTouch) {
        const position = event.getUILocation();
        // 获取父元素的uiTransform
        const uiTransform = this.node.parent.getComponent(UITransform);
        const location = uiTransform.convertToNodeSpaceAR(new Vec3(position.x, position.y, 0));
        this.node.setPosition(location);
    }

    onHandleDestroy() {
        this.offDrag();
        this.common.clearPools();
        director.loadScene('End');
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

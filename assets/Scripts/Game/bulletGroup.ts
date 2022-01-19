
import { _decorator, Component, Node, Prefab, instantiate, Vec3, UITransform } from 'cc';
import { Hero } from './hero';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = bulletGroup
 * DateTime = Wed Jan 19 2022 14:49:42 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = bulletGroup.ts
 * FileBasenameNoExtension = bulletGroup
 * URL = db://assets/Scripts/Game/bulletGroup.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */



@ccclass('bulletGroup')
export class bulletGroup extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;


    @property({ type: Prefab })
    public bulletPrefab: Prefab | null = null;

    @property({ type: Hero })
    public hero: Hero | null = null;

    start() {
        // [3]
        console.log('加载了发射器');
        this.startAction();
    }

    startAction() {
        console.log(this.node.parent);
        this.schedule(() => {
            // console.log('发射了子弹');
            const node = instantiate(this.bulletPrefab);
            // const uiTransform = this.node.parent.getComponent(UITransform);
            const location = this.hero.node.getPosition();
            location.y += 75;
            node.setPosition(location);
            this.node.parent.addChild(node);
        });
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

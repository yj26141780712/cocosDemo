
import { _decorator, Component, Node, Prefab, instantiate, Vec3, UITransform, NodePool } from 'cc';
import { bullet } from './bullet';
import { common } from './common';
import { finiteBullet, infiniteBullet } from './core';
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


    @property({ type: infiniteBullet, tooltip: '无限子弹' })
    public infiniteBullet: infiniteBullet = null;

    @property({ type: finiteBullet, tooltip: '无限子弹' })
    public finiteBullets: finiteBullet[] = [];

    @property({ type: Hero })
    public hero: Hero | null = null;

    @property({ type: common })
    public common: common | null = null;

    public nodePool: NodePool;



    start() {
        // 初始化子弹池
        this.common.setNodePool(this.infiniteBullet.name);
        this.common.initNodePool(this.common.getNodePool(this.infiniteBullet.name), this.infiniteBullet);
        this.common.batchInitNodePool(this.finiteBullets);
    }

    // 发射子弹 定时器
    startAction() {
        console.log('发射子弹！');
        const startShoot = () => {
            this.generateNewBullet(this.infiniteBullet);
        }
        this.schedule(startShoot, this.infiniteBullet.rate);
    }



    //生成新子弹
    generateNewBullet(infiniteBullet: infiniteBullet) {
        infiniteBullet.position.forEach(p => {
            let pool = this.common.getNodePool(infiniteBullet.name);
            const node = this.common.createNewNode(pool, infiniteBullet.prefab, this.node);
            const bullet = <bullet>node.getComponent('bullet');
            bullet.bulletGroup = this;
            const position = this.getBulletPosition(p.positionX);
            node.setPosition(position);
        });
    }

    // 获取子弹相对位置
    getBulletPosition(positionStr: string) {
        let heroP = this.hero.node.getPosition();
        let newV2_x = heroP.x + eval(positionStr);
        let newV2_y = heroP.y;
        return new Vec3(newV2_x, newV2_y, 0);
    }

    // 更换子弹
    changeBullte() {

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

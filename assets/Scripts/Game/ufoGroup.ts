
import { _decorator, Component, Node, UITransform, randomRange, Vec3 } from 'cc';
import { common } from './common';
import { ufoG } from './core';
import { ufo } from './ufo';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ufoGroup
 * DateTime = Fri Jan 21 2022 14:25:43 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = ufoGroup.ts
 * FileBasenameNoExtension = ufoGroup
 * URL = db://assets/Scripts/Game/ufoGroup.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('ufoGroup')
export class ufoGroup extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: ufoG })
    public ufoGroup: ufoG[] | null = [];

    @property({ type: common })
    public common: common | null = null;

    start() {
        this.common.batchInitNodePool(this.ufoGroup);
    }

    startAction() {
        console.log(this.ufoGroup);;
        this.ufoGroup.forEach((ufoG) => {
            this.schedule(this.genereateEnemy.bind(this, ufoG), ufoG.freq);
        });
    }

    genereateEnemy = (ufoG: ufoG) => {
        let delay = Math.random() * (ufoG.delayMax - ufoG.delayMin) + ufoG.delayMin;
        // 内存定时器，随机掉落时间
        this.scheduleOnce(() => {
            let pool = this.common.getNodePool(ufoG.name);
            let newNode = this.common.createNewNode(pool, ufoG.prefab, this.node);
            const ufo = <ufo>newNode.getComponent('ufo');
            ufo.ufoGroup = this;
            let position = this.getNewEnemyPositon(newNode);
            newNode.setPosition(position);
        }, delay);
    }

    getNewEnemyPositon(node: Node) {
        //位于上方，先不可见
        const nodeUT = node.getComponent(UITransform);
        const parentUT = this.node.parent.getComponent(UITransform);
        let randx = randomRange(-1, 1) * (parentUT.width / 2 - nodeUT.width / 2);
        let randy = nodeUT.height / 2 + parentUT.height / 2;
        return new Vec3(randx, randy, 0);
    }

    destoryNode(node: Node) {
        const pool = this.common.getNodePool(node.name);
        this.common.destoryNode(pool, node);
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

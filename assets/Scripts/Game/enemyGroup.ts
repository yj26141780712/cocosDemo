
import { _decorator, Component, Node, NodePool, Prefab, UITransform, Vec3, randomRange } from 'cc';
import { common } from './common';
import { enemyG } from './core';
import { enemy } from './enemy';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = enemyGroup
 * DateTime = Thu Jan 20 2022 08:10:27 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = enemyGroup.ts
 * FileBasenameNoExtension = enemyGroup
 * URL = db://assets/Scripts/Game/enemyGroup.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */




@ccclass('enemyGroup')
export class enemyGroup extends Component {
    // [1]
    // dummy = '';

    @property({ type: enemyG })
    enemyGroup: enemyG[] = [];

    @property({ type: common })
    public common: common | null = null;

    start() {
        console.log('初始化敌机');
        this.common.batchInitNodePool(this.enemyGroup);
    }

    startAction() {
        // 每组敌机都需要设置定时器
        this.enemyGroup.forEach((enemyG) => {
            this.schedule(this.genereateEnemy.bind(this, enemyG), enemyG.freq);
        });
    }

    genereateEnemy = (enemyG: enemyG) => {
        let pool = this.common.getNodePool(enemyG.name);
        let newNode = this.common.createNewNode(pool, enemyG.prefab, this.node);
        const enemy = <enemy>newNode.getComponent('enemy');
        enemy.enemyGroup = this;
        let position = this.getNewEnemyPositon(newNode);
        newNode.setPosition(position);
    }

    getNewEnemyPositon(node: Node) {
        //位于上方，先不可见
        const nodeUT = node.getComponent(UITransform);
        const parentUT = this.node.parent.getComponent(UITransform);
        let randx = randomRange(-1, 1) * (parentUT.width / 2 - nodeUT.width / 2);
        let randy = nodeUT.height / 2 + parentUT.height / 2;
        return new Vec3(randx, randy, 0);
    }

    destoryNode(node:Node){
        console.log(node.name);
        const pool = this.common.getNodePool(node.name);
        this.common.destoryNode(pool,node);
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


import { _decorator, Component, Node, NodePool, instantiate, Prefab } from 'cc';
import { enemyG, finiteBullet, infiniteBullet } from './core';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = common
 * DateTime = Thu Jan 20 2022 08:33:14 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = common.ts
 * FileBasenameNoExtension = common
 * URL = db://assets/Scripts/Game/common.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
type NodePoolObjs = enemyG[] | finiteBullet[] | infiniteBullet[];
type NodePoolObj = enemyG | finiteBullet | infiniteBullet;

@ccclass('common')
export class common extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    public pools = {};

    start() {
        // [3]
    }

    batchInitNodePool(objs: NodePoolObjs) {
        objs.forEach((obj: NodePoolObj) => {
            this.setNodePool(obj.name);
            console.log(this.pools);
            this.initNodePool(this.getNodePool(obj.name), obj);
        });
    }
    //初始化对象池
    initNodePool(pool: NodePool, obj: NodePoolObj) {
        for (let i = 0; i < obj.poolAmount; i++) {
            let newNode = instantiate(obj.prefab);
            pool.put(newNode);
        }
    }

    setNodePool(name: string) {
        if (!this.pools[`${name}-pool`]) {
            this.pools[`${name}-pool`] = new NodePool();
        }
    }

    getNodePool(name: string) {
        const pool = this.pools[`${name}-pool`];
        if (!pool) {
            this.setNodePool(name);
        }
        return this.pools[`${name}-pool`];
    }

    createNewNode = (nodePool: NodePool, prefab: Prefab, parent: Node) => {
        let newNode: Node = null;
        if (nodePool.size() > 0) {
            newNode = nodePool.get();
        } else {
            newNode = instantiate(prefab);
        }
        parent.addChild(newNode);
        return newNode;
    }

    destoryNode = (nodePool: NodePool, node: Node) => {
        nodePool.put(node);
    }

    clearPools() {
        for (const key in this.pools) {
            const pool = this.pools[key];
            pool.clear();
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

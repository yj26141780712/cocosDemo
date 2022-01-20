import { _decorator, Prefab, NodePool } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('enemyG')
export class enemyG {
    @property({})
    public name: string = '';
    @property({ type: Prefab, tooltip: '敌机预制' })
    public prefab: Prefab = null;
    @property({ tooltip: '敌机频率' })
    public freq = 0;
    @property({ tooltip: '敌机池数量' })
    public poolAmount = 0;
}

@ccclass('bulletPosition')
class bulletPosition {
    @property({ tooltip: '子弹相对Hero的位置' })
    public positionX = '';
}

@ccclass('infiniteBullet')
export class infiniteBullet {
    @property({})
    public name = '';
    @property({})
    public rate = 0;
    @property({})
    public poolAmount = 0;
    @property({ type: Prefab })
    public prefab: Prefab | null = null;
    @property({ type: bulletPosition })
    position: bulletPosition[] = [];
}


@ccclass('finiteBullet')
export class finiteBullet extends infiniteBullet {
    @property({})
    duration = 0;
    @property({})
    ufoBulletName = '';
}




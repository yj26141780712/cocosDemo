
import { _decorator, Component, Label, director, AudioClip, AudioSource, SpriteFrame, Button } from 'cc';
import { bulletGroup } from './bulletGroup';
import { common } from './common';
import { enemyGroup } from './enemyGroup';
import { Hero } from './hero';
import { ufoGroup } from './ufoGroup';
import global from './global';

const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Main
 * DateTime = Tue Jan 18 2022 11:15:02 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = Main.ts
 * FileBasenameNoExtension = Main
 * URL = db://assets/Scripts/Game/Main.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Main')
export class Main extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({ type: Hero })
    public hero: Hero | null = null;

    @property({ type: enemyGroup })
    public enemyGroup: enemyGroup | null = null;

    @property({ type: bulletGroup })
    public bulletGroup: bulletGroup | null = null;

    @property({ type: ufoGroup })
    public ufoGroup: ufoGroup | null = null;

    @property({ type: common })
    public common: common | null = null;

    @property({ type: Label })
    public scoreDisplay: Label | null = null;

    @property({ type: Label })
    public bombDisplay: Label | null = null;

    @property(AudioClip)
    public bgm: AudioClip | null = null;

    @property(AudioClip)
    public bombSound: AudioClip | null = null;

    @property(AudioClip)
    public gameOverSound:AudioClip|null = null;

    @property(AudioSource)
    public audioSource: AudioSource | null = null;

    @property(SpriteFrame)
    public pauseSpriteFrame = [];

    @property(Button)
    public btnPause:Button|null =null;

    start() {
        // [3]
        this.enemyGroup.startAction();
        this.bulletGroup.startAction();
        this.ufoGroup.startAction();
        this.enemyGroup?.node.on('changeScore', this.onChangeScore, this);
        this.audioSource.play();
    }

    onHandlePause() {
        if (this.common.pause) {
            this.btnPause.normalSprite = this.pauseSpriteFrame[0];
            this.btnPause.pressedSprite = this.pauseSpriteFrame[1];
            this.btnPause.hoverSprite = this.pauseSpriteFrame[1];
            this.audioSource.play();
            director.resume();
            this.hero.onDrag();
        } else {
            this.btnPause.normalSprite = this.pauseSpriteFrame[2];
            this.btnPause.pressedSprite = this.pauseSpriteFrame[3];
            this.btnPause.hoverSprite = this.pauseSpriteFrame[3];
            this.audioSource.stop();
            director.pause();
            this.hero.offDrag();
        }
        this.common.pause = !this.common.pause;
    }

    //接收炸弹
    receiveBomb() {
        this.common.bombAmount++;
        this.bombDisplay.string = this.common.bombAmount.toString();
    }

    onChangeScore(score: number) {
        this.common.score += score;
        global.score = this.common.score;
        this.scoreDisplay.string = this.common.score.toString();
    }

    gameOver() {
        this.common.clearPools();
        this.audioSource.playOneShot(this.gameOverSound);
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

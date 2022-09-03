class Round {
    constructor(config) {
        this.waypoints = config.waypoints; // list of waypoints for selected map
        this.driection = config.direction; // starting direction enemies move toward
    }

    init(round) {
        this.enemies = [];
        this.round = round;
        this.lastRound = 40;
        this.id = 0;
        if (this.round == 1) {
            this.initRound1();
        } else if (this.round == 2) {
            this.initRound2();
        } else if (this.round == 3) {
            this.initRound3();
        } else if (this.round == 4) {
            this.initRound4();
        } else if (this.round == 5) {
            this.initRound5();
        } else if (this.round == 6) {
            this.initRound6();
        } else if (this.round == 7) {
            this.initRound7();
        } else if (this.round == 8) {
            this.initRound8();
        } else if (this.round == 9) {
            this.initRound9();
        } else if (this.round == 10) {
            this.initRound10();
        } else if (this.round == 11) {
            this.initRound11();
        } else if (this.round == 12) {
            this.initRound12();
        } else if (this.round == 13) {
            this.initRound13();
        } else if (this.round == 14) {
            this.initRound14();
        } else if (this.round == 15) {
            this.initRound15();
        } else if (this.round == 16) {
            this.initRound16();
        } else if (this.round == 17) {
            this.initRound17();
        } else if (this.round == 18) {
            this.initRound18();
        } else if (this.round == 19) {
            this.initRound19();
        } else if (this.round == 20) {
            this.initRound20();
        } else if (this.round == 21) {
            this.initRound21();
        } else if (this.round == 22) {
            this.initRound22();
        } else if (this.round == 23) {
            this.initRound23();
        } else if (this.round == 24) {
            this.initRound24();
        } else if (this.round == 25) {
            this.initRound25();
        } else if (this.round == 26) {
            this.initRound26();
        } else if (this.round == 27) {
            this.initRound27();
        } else if (this.round == 28) {
            this.initRound28();
        } else if (this.round == 29) {
            this.initRound29();
        } else if (this.round == 30) {
            this.initRound30();
        } else if (this.round == 31) {
            this.initRound31();
        } else if (this.round == 32) {
            this.initRound32();
        } else if (this.round == 33) {
            this.initRound33();
        } else if (this.round == 34) {
            this.initRound34();
        } else if (this.round == 35) {
            this.initRound35();
        } else if (this.round == 36) {
            this.initRound36();
        } else if (this.round == 37) {
            this.initRound37();
        } else if (this.round == 38) {
            this.initRound38();
        } else if (this.round == 39) {
            this.initRound39();
        } else if (this.round == 40) {
            this.initRound40();
        }
        // set gold reward for completing round
        this.setReward();
    }

    update() {
        // increase round number if all enemies gone
        if (this.enemies.length <= 0) {
            this.levelUp();
            return;
        }
        // remove dead/leaked enemies
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].health <= 0) {
                this.enemies.splice(i, 1);
            }
        }
    }

    draw(ctx, infoTower) {
        // draw round info, position moves toward left if player is viewing tower info menu
        if (infoTower != undefined) {
            if (this.lastRound >= 100) {
                if (this.round >= 100) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 280, 15);
                } else if (this.round >= 10) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 290, 15);
                } else {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 300, 15);
                }
            } else if (this.lastRound >= 10) {
                if (this.round >= 100) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 290, 15);
                } else if (this.round >= 10) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 300, 15);
                } else {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 310, 15);
                }
            } else if (this.lastRound < 10) {
                if (this.round >= 100) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 300, 15);
                } else if (this.round >= 10) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 310, 15);
                } else {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 315, 15);
                }
            }

        } else {
            if (this.lastRound >= 100) {
                if (this.round >= 100) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 360, 15);
                } else if (this.canvas.round.round >= 10) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 370, 15);
                } else {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 380, 15);
                }
            } else if (this.lastRound >= 10) {
                if (this.round >= 100) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 370, 15);
                } else if (this.round >= 10) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 380, 15);
                } else {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 390, 15);
                }
            } else if (this.lastRound < 10) {
                if (this.round >= 100) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 380, 15);
                } else if (this.round >= 10) {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 390, 15);
                } else {
                    ctx.fillText('Round: ' + this.round + '/' + this.lastRound, 398, 15);
                }
            }
        }
    }

    levelUp() {
        // increase round count
        if (this.round <= this.lastRound) {
            this.round++;
            this.init(this.round);
        }
    }

    setReward() {
        // set reward for round completion
        this.reward = 0;
        for (let i = 0; i < this.enemies.length; i++) {
            this.reward += this.enemies[i].health;
        }
    }

    addEnemy(name, num, age, ageStep) {
        // create an enemy and add to current round enenmy list
        for (let i = 0; i < num; i++) {
            this.enemies.push(new Enemy({
                name: name,
                pos: {x: this.waypoints[0].x, y: this.waypoints[0].y},
                target: this.waypoints[0],
                direction: this.direction,
                age: age,
                id: this.id
            }))
            age += ageStep;
            this.id++;
        }
        return age;
    }

    initRound1() {
        let age = 60;
        age = this.addEnemy('enemy_1', 20, age, 60);
    }

    initRound2() {
        let age = 60;
        age = this.addEnemy('enemy_1', 35, age, 60);
    }

    initRound3() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_1', 5, age, 60);
            age = this.addEnemy('enemy_2', 1, age, 30);
        }
    }

    initRound4() {
        let age = 60;
        for (let i = 0; i < 6; i++) {
            age = this.addEnemy('enemy_1', 6, age, 60);
            age = this.addEnemy('enemy_2', 3, age, 30);
        }
    }

    initRound5() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_2', 6, age, 60);
            age = this.addEnemy('enemy_1', 3, age, 30);
        }
    }

    initRound6() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_1', 3, age, 30);
            age = this.addEnemy('enemy_2', 3, age, 30);
            age = this.addEnemy('enemy_3', 1, age, 30);
        }
    }

    initRound7() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_1', 4, age, 30);
            age = this.addEnemy('enemy_2', 4, age, 30);
            age = this.addEnemy('enemy_3', 1, age, 15);
        }
    }

    initRound8() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_1', 2, age, 30);
            age = this.addEnemy('enemy_2', 4, age, 30);
            age = this.addEnemy('enemy_3', 3, age, 30);
        }
    }

    initRound9() {
        let age = 60;
        age = this.addEnemy('enemy_3', 30, age, 45);
    }

    initRound10() {
        let age = 60;
        age = this.addEnemy('enemy_2', 102, age, 30);
    }

    initRound11() {
        let age = 60;
        for (let i = 0; i < 2; i++) {
            age = this.addEnemy('enemy_1', 5, age, 30);
            age = this.addEnemy('enemy_2', 5, age, 30);
            age = this.addEnemy('enemy_3', 5, age, 30);
        }
        for (let i = 0; i < 2; i++) {
            age = this.addEnemy('enemy_3', 5, age, 15);
            age = this.addEnemy('enemy_4', 2, age, 15);
        }
    }

    initRound12() {
        let age = 60;
        for (let i = 0; i < 2; i++) {
            age = this.addEnemy('enemy_2', 5, age, 15);
            age = this.addEnemy('enemy_3', 5, age, 15);
            age = this.addEnemy('enemy_4', 1, age, 30);
        }
        age = this.addEnemy('enemy_2', 4, age, 15);
        age = this.addEnemy('enemy_4', 3, age, 15);
    }

    initRound13() {
        let age = 60;
        for (let i = 0; i < 25; i++) {
            age = this.addEnemy('enemy_2', 2, age, 15);
            age = this.addEnemy('enemy_3', 1, age, 30);
        }
    }

    initRound14() {
        let age = 60;
        for (let i = 0; i < 10; i++) {
            age = this.addEnemy('enemy_1', 10, age, 10);
            age = this.addEnemy('enemy_3', 1, age, 15);
            age = this.addEnemy('enemy_2', 2, age, 15);
            age = this.addEnemy('enemy_4', 1, age, 10);
        }
    }

    initRound15() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_1', 10, age, 10);
            age = this.addEnemy('enemy_2', 10, age, 10);
            age = this.addEnemy('enemy_3', 5, age, 15);
            age = this.addEnemy('enemy_4', 5, age, 20);
            age = this.addEnemy('enemy_5', 1, age, 30);
        }
    }

    initRound16() {
        let age = 60;
        age = this.addEnemy('enemy_3', 15, age, 10);
        for (let i = 0; i < 10; i++) {
            age = this.addEnemy('enemy_3', 3, age, 10);
            age = this.addEnemy('enemy_4', 1, age, 15);
        }
    }

    initRound17() {
        let age = 60;
        age = this.addEnemy('enemy_3', 10, age, 10);
        age = this.addEnemy('enemy_4', 20, age, 20);
    }

    initRound18() {
        let age = 60;
        age = this.addEnemy('enemy_3', 80, age, 15);
    }

    initRound19() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_4', 6, age, 15);
            age = this.addEnemy('enemy_3', 3, age, 10);
            age = this.addEnemy('enemy_5', 3, age, 20);
        }
    }

    initRound20() {
        let age = 60;
        age = this.addEnemy('enemy_6', 5, age, 30);
    }

    initRound21() {
        let age = 60;
        for (let i = 0; i < 4; i++) {
            age = this.addEnemy('enemy_4', 10, age, 10);
            age = this.addEnemy('enemy_5', 4, age, 20);
        }
    }

    initRound22() {
        let age = 60;
        age = this.addEnemy('enemy_7', 15, age, 30);
    }

    initRound23() {
        let age = 60;
        for (let i = 0; i < 10; i++) {
            age = this.addEnemy('enemy_6', 1, age, 20);
            age = this.addEnemy('enemy_7', 1, age, 20);
        }
    }

    initRound24() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_2', 10, age, 10);
            age = this.addEnemy('enemy_6', 3, age, 20);
            age = this.addEnemy('enemy_7', 2, age, 20);
        }
    }

    initRound25() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_4', 10, age, 15);
            age = this.addEnemy('enemy_6', 5, age, 20);
            age = this.addEnemy('enemy_7', 3, age, 25);
        }
        age = this.addEnemy('boss_1', 1, age, 10);
    }

    initRound26() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_4', 5, age, 15);
            age = this.addEnemy('enemy_6', 2, age, 20);
            age = this.addEnemy('enemy_7', 2, age, 25);
        }
    }

    initRound27() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_1', 20, age, 10);
            age = this.addEnemy('enemy_2', 12, age, 15);
            age = this.addEnemy('enemy_3', 3, age, 20);
            age = this.addEnemy('enemy_4', 3, age, 20);
        }
    }

    initRound28() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_2', 20, age, 10);
            age = this.addEnemy('enemy_3', 12, age, 15);
            age = this.addEnemy('enemy_6', 3, age, 20);
            age = this.addEnemy('enemy_7', 3, age, 20);
        }
    }

    initRound29() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_4', 10, age, 10);
            age = this.addEnemy('enemy_5', 5, age, 15);
            age = this.addEnemy('enemy_7', 3, age, 20);
        }
    }

    initRound30() {
        let age = 60;
        for (let i = 0; i < 10; i++) {
            age = this.addEnemy('enemy_1', 10, age, 10);
            age = this.addEnemy('enemy_3', 5, age, 15);
            age = this.addEnemy('enemy_5', 3, age, 20);
            age = this.addEnemy('enemy_7', 2, age, 25);
        }
        age = this.addEnemy('boss_1', 1, age, 10);
    }

    initRound31() {
        let age = 60;
        for (let i = 0; i < 10; i++) {
            age = this.addEnemy('enemy_6', 2, age, 20);
            age = this.addEnemy('enemy_5', 3, age, 10);
            age = this.addEnemy('enemy_7', 2, age, 20);
        }
    }

    initRound32() {
        let age = 60;
        for (let i = 0; i < 10; i++) {
            age = this.addEnemy('enemy_3', 5, age, 20);
            age = this.addEnemy('enemy_6', 3, age, 10);
            age = this.addEnemy('enemy_7', 4, age, 25);
        }
    }

    initRound33() {
        let age = 60;
        for (let i = 0; i < 15; i++) {
            age = this.addEnemy('enemy_1', 10, age, 5);
            age = this.addEnemy('enemy_6', 1, age, 0);
        }
    }

    initRound34() {
        let age = 60;
        for (let i = 0; i < 15; i++) {
            age = this.addEnemy('enemy_4', 7, age, 10);
            age = this.addEnemy('enemy_7', 1, age, 0);
        }
    }

    initRound35() {
        let age = 60;
        for (let i = 0; i < 15; i++) {
            age = this.addEnemy('enemy_5', 6, age, 15);
            age = this.addEnemy('enemy_6', 2, age, 10);
            age = this.addEnemy('enemy_8', 1, age, 0);
        }
    }

    initRound36() {
        let age = 60;
        for (let i = 0; i < 15; i++) {
            age = this.addEnemy('enemy_5', 10, age, 15);
            age = this.addEnemy('enemy_8', 1, age, 0);
        }
    }

    initRound37() {
        let age = 60;
        for (let i = 0; i < 10; i++) {
            age = this.addEnemy('enemy_5', 4, age, 15);
            age = this.addEnemy('enemy_7', 2, age, 10);
            age = this.addEnemy('enemy_6', 3, age, 15);
            age = this.addEnemy('enemy_8', 1, age, 20);
        }
    }

    initRound38() {
        let age = 60;
        for (let i = 0; i < 12; i++) {
            age = this.addEnemy('enemy_5', 5, age, 15);
            age = this.addEnemy('enemy_6', 3, age, 10);
            age = this.addEnemy('enemy_7', 2, age, 15);
            age = this.addEnemy('enemy_8', 1, age, 20);
        }
    }

    initRound39() {
        let age = 60;
        for (let i = 0; i < 10; i++) {
            age = this.addEnemy('enemy_4', 8, age, 15);
            age = this.addEnemy('enemy_5', 4, age, 10);
            age = this.addEnemy('enemy_7', 3, age, 15);
            age = this.addEnemy('enemy_8', 2, age, 20);
        }
    }

    initRound40() {
        let age = 60;
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_2', 6, age, 15);
            age = this.addEnemy('enemy_5', 4, age, 10);
            age = this.addEnemy('enemy_6', 3, age, 15);
            age = this.addEnemy('enemy_8', 2, age, 20);
        }
        age = this.addEnemy('boss_1', 1, age, 20);
        for (let i = 0; i < 5; i++) {
            age = this.addEnemy('enemy_2', 6, age, 15);
            age = this.addEnemy('enemy_5', 4, age, 10);
            age = this.addEnemy('enemy_6', 3, age, 15);
            age = this.addEnemy('enemy_8', 2, age, 20);
        }
        age = this.addEnemy('boss_1', 1, age, 20);
    }
}
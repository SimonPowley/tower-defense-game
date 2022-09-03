class Enemy {
    constructor(config) {
        this.name = config.name || ''; // enemy name
        this.pos = config.pos || {x: 0, y: 0}; // enemy starting position
        this.target = config.target; // enemy target waypoint
        this.direction = config.direction || '' // movement direction: 'up', 'down', 'left', 'right'
        this.age = config.age || 0; // when enemy spawns, higher=later in round (ex. age 60 = 1 sec after round start)
        this.id = config.id || 0; // unique number to identify enemies

        this.traveled = 0; // distance enemy has traveled since spawning
        this.distanceSlowed = 0; // distance enemy has traveled since being slowed
        this.timePoisoned = 0; // time enemy was last hurt by poison
        this.timeStunned = 0; // time enemy has been stunned for
        this.distanceReversed = 0; // distance enemy has traveled since being reversed

        // status effects
        this.slowed = false;
        this.slowEffect = 0;
        this.poisoned = false;
        this.poisonEffect = false;
        this.stunned = false;
        this.stunEffect = 0;
        this.stunSpeed = 0;
        this.reversed = false;
        this.reverseEffect = 0;

        this.init();

        // center enemy on path
        this.offsetPosition(this.pos.x, this.pos.y);
    }

    init() {
        // set enemy information and stats
        if (this.name == 'enemy_1') { // create level 1 enemy
            this.health = 1;
            this.speed = .25
            this.size = {width: 10, height: 10};
            this.offset = 3;
            this.color = '#ff0000';
            this.boss = false;
        } else if (this.name == 'enemy_2') { // create level 2 enemy
            this.health = 2;
            this.speed = .5
            this.size = {width: 12, height: 12};
            this.offset = 4;
            this.color = '#0000ff';
            this.boss = false;
        } else if (this.name == 'enemy_3') { // create level 3 enemy
            this.health = 3;
            this.speed = .5
            this.size = {width: 14, height: 14};
            this.offset = 5;
            this.color = '#00ff00';
            this.boss = false;
        } else if (this.name == 'enemy_4') { // create level 4 enemy
            this.health = 4;
            this.speed = 1
            this.size = {width: 16, height: 16};
            this.offset = 6;
            this.color = '#ffff00';
            this.boss = false;
        } else if (this.name == 'enemy_5') { // create level 5 enemy
            this.health = 5;
            this.speed = 1
            this.size = {width: 16, height: 16};
            this.offset = 6;
            this.color = '#ff9999';
            this.boss = false;
        } else if (this.name == 'enemy_6') { // create level 6 enemy
            this.health = 6;
            this.speed = 1
            this.size = {width: 14, height: 14};
            this.offset = 5;
            this.color = '#ff6600';
            this.boss = false;
        } else if (this.name == 'enemy_7') { // create level 7 enemy
            this.health = 7;
            this.speed = 2
            this.size = {width: 12, height: 12};
            this.offset = 4;
            this.color = '#333333';
            this.boss = false;
        } else if (this.name == 'enemy_8') { // create level 8 enemy
            this.health = 8;
            this.speed = 2
            this.size = {width: 12, height: 12};
            this.offset = 4;
            this.color = '#ffffff';
            this.boss = false;
        }

        // set boss information and stats
        else if (this.name == 'boss_1') { // create level 1 boss
            this.health = 250;
            this.speed = .125
            this.size = {width: 20, height: 20};
            this.offset = 8;
            this.color = '#ff0000';
            this.boss = true;
        } else if (this.name == 'boss_2') { // create level 2 boss
            this.health = 500;
            this.speed = .125
            this.size = {width: 20, height: 20};
            this.offset = 8;
            this.color = '#0000ff';
            this.boss = true;
        } else if (this.name == 'boss_3') { // create level 3 boss
            this.health = 750;
            this.speed = .25
            this.size = {width: 20, height: 20};
            this.offset = 8;
            this.color = '#00ff00';
            this.boss = true;
        } else if (this.name == 'boss_4') { // create level 4 boss
            this.health = 1250;
            this.speed = .25
            this.size = {width: 20, height: 20};
            this.offset = 8;
            this.color = '#ffff00';
            this.boss = true;
        } else if (this.name == 'boss_5') { // create level 5 boss
            this.health = 1500;
            this.speed = .25
            this.size = {width: 20, height: 20};
            this.offset = 8;
            this.color = '#ff9999';
            this.boss = true;
        } else if (this.name == 'boss_6') { // create level 6 boss
            this.health = 2000;
            this.speed = .5
            this.size = {width: 20, height: 20};
            this.offset = 8;
            this.color = '#ff6600';
            this.boss = true;
        } else if (this.name == 'boss_7') { // create level 7 boss
            this.health = 2500;
            this.speed = .5
            this.size = {width: 20, height: 20};
            this.offset = 8;
            this.color = '#333333';
            this.boss = true;
        } else if (this.name == 'boss_8') { // create level 8 boss
            this.health = 3000;
            this.speed = .5
            this.size = {width: 20, height: 20};
            this.offset = 8;
            this.color = '#ffffff';
            this.boss = true;
        }

        // reapply slow effect if slowed
        if (this.slowed) {
            let slowEffect = this.slowEffect - 2;
            this.slowed = false;
            this.slowEffect = 0;
            if (slowEffect > 0) {
                this.slow(slowEffect);
            }
        }
    }

    draw(ctx) {
        // draw black outline
        ctx.fillStyle = 'black';
        ctx.fillRect(this.pos.x - 1, this.pos.y - 1, this.size.width + 2, this.size.height + 2);
        // draw enemy
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);

        // draw slow effect if slowed
        if (this.slowed) {
            ctx.fillStyle = 'rgba(150, 200, 0, .5)';
            ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        }

        // draw poison effect if poisoned
        if (this.poisoned) {
            ctx.fillStyle = 'rgba(100, 0, 100, .5)';
            ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        }
    }

    update(player, speed, timer) {
        // enemy reaches last waypoint
        if (this.target.next == undefined) {
            // enemy moves off of screen
            if (this.pos.x > 480 || this.pos.x + this.size.width < 80 || this.pos.y > 320 || this.pos.y + this.size.height < 0) {
                player.removeLives(this.health);
                this.health = 0;
                this.pos = {x: 200, y: 200};
                this.direction = '';
                return;
            }
        }

        // enemy reaches next waypoint
        if (this.pos.x + this.offset == this.target.x && this.pos.y + this.offset == this.target.y) {
            // set waypoint to previous if reversed
            if (this.reversed) {
                this.distanceReversed += 1;
                // remove reverse effect after certain distance traveled
                if (this.distanceReversed < this.reverseEffect && this.target.prev != undefined) {
                    this.target = this.target.prev;
                } else {
                    this.reversed = false;
                    this.reverseEffect = 0;
                    this.distanceReversed = 0;
                    this.target = this.target.next.prev;
                }
            }
            else if (!this.reversed) {
                this.target = this.target.next;
            }
            if (this.target != undefined) {
                this.changeDirection();
            }
            return;
        }

        // update stun effect, don't update position if stunned
        if (this.stunned && this.stunEffect > 0) {
            // start stun timer if not started
            if (this.timeStunned == 0) {
                this.timeStunned = timer;
            }
            // remove stun effect if stun limit reached
            if (timer - this.timeStunned > 60 * this.stunEffect) {
                this.stunned = false;
                this.stunEffect = 0;
                this.timeStunned = 0;
            }
        }
        // update position if not stunned
        else {
            // enemy moving up
            if (this.direction == 'up') {
                this.pos.y -= this.speed * speed;
                if (this.pos.y - this.target.y + this.offset <= 0) {
                    this.offsetPosition(this.target.x, this.target.y);
                }
            }
            // enemy moving down
            else if (this.direction == 'down') {
                this.pos.y += this.speed * speed;
                if (this.target.y - this.pos.y + this.offset <= 0) {
                    this.offsetPosition(this.target.x, this.target.y);
                }
            }
            //  enemy moving left
            else if (this.direction == 'left') {
                this.pos.x -= this.speed * speed;
                if (this.pos.x - this.target.x + this.offset <= 0) {
                    this.offsetPosition(this.target.x, this.target.y);
                }
            }
            // enemy moving right
            else if (this.direction == 'right') {
                this.pos.x += this.speed * speed;
                if (this.target.x - this.pos.x + this.offset <= 0) {
                    this.offsetPosition(this.target.x, this.target.y);
                }
            }
            // update distance traveled
            this.traveled += this.speed;

            // update slow effect
            if (this.slowed && this.slowEffect > 0) {
                this.distanceSlowed += this.speed;
                // remove slow effect after certain distance traveled without being reslowed
                if (this.distanceSlowed >= 60 * this.slowEffect) {
                    this.slowed = false;
                    this.slowEffect = 0;
                    this.distanceSlowed = 0;
                    this.init();
                }
            }
        }

        // update poison effect
        if (this.poisoned && this.poisonEffect > 0) {
            // apply poison effect after poison cooldown elapsed
            if (timer - this.timePoisoned > 300) {
                this.damage(this.poisonEffect);
                this.timePoisoned = timer;
            }
        }
    }

    offsetPosition(x, y) {
        this.pos = {x: x - this.offset, y: y - this.offset};
    }

    changeDirection() {
        // change to moving up
        if (this.pos.y + this.offset > this.target.y) {
            this.direction = 'up';
        }
        // change to moving down
        else if (this.pos.y + this.offset < this.target.y) {
            this.direction = 'down';
        }
        // change to moving left
        else if (this.pos.x + this.offset > this.target.x) {
            this.direction = 'left';
        }
        // change to moving right
        else if (this.pos.x + this.offset < this.target.x) {
            this.direction = 'right';
        }
    }

    damage(amount) {
        this.health -= amount;
        if (this.health == 1) {
            this.name = 'enemy_1';
            this.init();
            this.pos.x += 1;
            this.pos.y += 1;
        } else if (this.health == 2) {
            this.name = 'enemy_2';
            this.init();
            this.pos.x += 1;
            this.pos.y += 1;
        } else if (this.health == 3) {
            this.name = 'enemy_3';
            this.init();
            this.pos.x += 1;
            this.pos.y += 1;
        } else if (this.health == 4) {
            this.name = 'enemy_4';
            this.init();
        } else if (this.health == 5) {
            this.name = 'enemy_5';
            this.init();
            this.pos.x -= 1;
            this.pos.y -= 1;
        } else if (this.health == 6) {
            this.name = 'enemy_6';
            this.init();
            this.pos.x -= 1;
            this.pos.y -= 1;
        } else if (this.health == 7) {
            this.name = 'enemy_7';
            this.init();
        } else if (this.health == 8) {
            this.name = 'enemy_8';
            this.init();
        } else if (this.health == 500) {
            this.name = 'boss_1';
            this.init();
        }
    }

    slow(effect) {
        // apply slow effect to enemy
        this.slowed = true;
        if (effect > this.slowEffect) {
            this.slowEffect = effect;
            this.speed = this.speed / effect;
            if (this.speed < .125) {
                this.speed = .125;
            }
        }
    }

    poison(effect) {
        // apply poison effect to enemy
        this.poisoned = true;
        if (effect > this.poisonEffect) {
            this.poisonEffect = effect;
        }
    }

    stun(effect) {
        // 50% chance to stun
        if (Math.random() > .5) {
            return;
        }
        // roll another 10% chance to stun boss enemies
        if (this.boss && Math.random() > .1) {
            return;
        }
        
        // apply stun effect to enemy
        this.stunned = true;
        if (effect > this.stunEffect) {
            this.stunEffect = effect;

        }
    }

    reverse(effect) {
        // can't reverse stunned enemy, boss enemies, or enemy with no previous path point to reverse to
        if (this.stunned || this.reversed || this.target.prev == undefined || this.boss) {
            return;
        }
        // 75% chance to stun
        if (Math.random() > .75) {
            return;
        }

        // apply reverse effect to enemy
        this.reversed = true;
        if (effect > this.reverseEffect) {
            this.reversEffect = effect;
        }
        this.target = this.target.prev;
        this.changeDirection();
    }
}
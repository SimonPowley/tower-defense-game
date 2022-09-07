class Tower {
    constructor(config) {
        this.name = config.name || ''; // tower name
        this.pos = config.pos || {x: 0, y: 0}; // tower position
        this.size = config.size || {width: 14, height: 14}; // tower size dimensions
        this.selected = false; // show tower range if selected
        this.canPlace = false; // show grey range if tower is able to be placed, red if not
        this.hits = config.hits || 0; // number of enemies hit by tower
        this.value = 0; // gold returned after selling tower (1/2 of total cost)
        this.rangeGrey = 'rgba(50, 50, 50, .5)';
        this.rangeRed = 'rgba(255, 0, 0, .5)';
        this.priority = config.priority || 'first';
        this.id = config.id || 0;
        this.projId = 0;
        this.bought = config.bought || false;
        this.lastShot = 0;
        this.projectiles = [];
        this.explosions = [];

        this.init();
    }

    init() {
        // set tower information and stats
        if (this.name == 'basic') { // create basic tower
            this.initBasicTower();
        } else if (this.name == 'turret') { // create turret tower
            this.initTurretTower();
        } else if (this.name == 'bomb') { // create cannon tower
            this.initBombTower();
        } else if (this.name == 'chem') { // create chemical tower
            this.initChemTower();
        } else if (this.name == 'ninja') { // create ninja tower
            this.initNinjaTower();
        } else if (this.name == 'laser') { // create laser tower
            this.initLaserTower();
        } else if (this.name == 'mine') { // create mine tower
            this.initMineTower();
        }

        this.center = {x: this.pos.x + (this.size.width / 2), y: this.pos.y + (this.size.height / 2)}
        this.value = Math.floor(this.cost / 2);

        this.setDimensions();
    }

    initBasicTower() {
        /*
            basic tower should be well-rounded, and should stay relevant/useful
            maybe have unique interactions with certain towers ? (auto collect mine, ?)
            upgrade path 1 focuses on speed and pierce
            upgrade path 2 focuses on power and range
        */
        // tower stats/info
        this.projType = 'bullet';
        this.projSize = 2;
        this.projEffect = 0;
        this.blastRadius = 0;
        this.projLimit = 1;
        this.color = '#4682b4';
        this.cost = 200;
        this.power = 1;
        this.pierce = 1;
        this.range = 50;
        this.speed = 1;
        this.info = ['Shoots bullets'];
        // tower upgrade path 1 (u1=upgrade tier 1, u2=upgrade tier 2, etc)
        this.upgradePath1 = {
            u1: {
                name: 'Speed+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.speed += 1;
                    tower.value += Math.floor(this.cost / 2);
                    this.bought = true;
                    return tower;}},
            u2: {
                name: 'Pierce+',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.pierce += 1;
                    tower.value += Math.floor(this.cost / 2);
                    this.bought = true;
                    return tower;}},
            u3: {
                name: 'Speed+',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.speed += 2;
                    tower.value += Math.floor(this.cost / 2);
                    this.bought = true;
                    return tower;}},
            maxed: false
        }
        // tower upgrade path 2
        this.upgradePath2 = {
            u1: {
                name: 'Power+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.power += 1;
                    tower.value += Math.floor(this.cost / 2);
                    this.bought = true;
                    return tower;}},
            u2: {
                name: 'Range+',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.range += 25;
                    tower.value += Math.floor(this.cost / 2);
                    this.bought = true;
                    return tower;}},
            u3: {
                name: 'Power+',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.power += 2;
                    tower.value += Math.floor(this.cost / 2);
                    this.bought = true;
                    return tower;}},
            maxed: false
        }
    }

    initTurretTower() {
        /*
            turret tower shoots in multiple directions around it
            good for hitting multiple path sections at once
            upgrade path 1 focuses on pierce, and projectile gains 'ring' type
            upgrade path 2 focuses on power, and projectile gains 'laser' type
        */
        // tower stats/info
        this.projType = 'bullet';
        this.projSize = 1;
        this.projEffect = 0;
        this.blastRadius = 0;
        this.projLimit = 4;
        this.color = '#ff6347';
        this.cost = 300;
        this.power = 1;
        this.pierce = 2;
        this.range = 75;
        this.speed = .8;
        this.info = ['Shoots bullets', 'in multiple', 'directions'];
        // tower upgrade path 1 (u1=upgrade tier 1, u2=upgrade tier 2, etc)
        this.upgradePath1 = {
            u1: {
                name: 'More Shots',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.projLimit += 4;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Pierce+',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.pierce += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Shockwave',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.projType = 'ring';
                    tower.projLimit = 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
        // tower upgrade path 2
        this.upgradePath2 = {
            u1: {
                name: 'Speed+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.speed += .5;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Power+',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.power += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Laser Shot',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.projType = 'laser';
                    tower.projSize += 3;
                    tower.speed += 1.7;
                    tower.pierce += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
    }

    initBombTower() {
        /*
            bomb tower shoots explosives that can damage multiple enemies
            good for hitting dense packs of enemies
            upgrade path 1 focuses on power, projectile size, and blast size
            upgrade path 2 focuses on speed, pierce, and range (missile)
        */
        // tower stats/info
        this.projType = 'bomb';
        this.blastRadius = 20;
        this.projSize = 3;
        this.projEffect = 0;
        this.projLimit = 1;
        this.color = '#00ff00';
        this.cost = 500;
        this.power = 2;
        this.pierce = 1;
        this.range = 50;
        this.speed = .8;
        this.info = ['Shoots bombs', 'that can hit', 'many enemies'];
        // tower upgrade path 1 (u1=upgrade tier 1, u2=upgrade tier 2, etc)
        this.upgradePath1 = {
            u1: {
                name: 'Power+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.power += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Big Bombs',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.projSize += 2;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Big Blasts',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.blastRadius += 10;
                    tower.power += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
        // tower upgrade path 2
        this.upgradePath2 = {
            u1: {
                name: 'Speed+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.speed += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Pierce+',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.pierce += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Rockets',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.speed += 1;
                    tower.range += 20;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
    }

    initChemTower() {
        /*
            chem tower projectiles can apply different effects to enemies
            good for slowing down or poisoning enemies
            upgrade path 1 focuses on poisoning enemies
            upgrade path 2 focuses on slowing down enemies
        */
        // tower stats/info
        this.projType = 'bullet';
        this.projEffect = 0;
        this.projSize = 3;
        this.blastRadius = 0;
        this.projLimit = 1;
        this.color = '#ff00ff';
        this.cost = 650;
        this.power = 1;
        this.pierce = 2;
        this.range = 75;
        this.speed = .8;
        this.info = ['Applies effects', 'to enemies', 'with chemicals'];
        // tower upgrade path 1 (u1=upgrade tier 1, u2=upgrade tier 2, etc)
        this.upgradePath1 = {
            u1: {
                name: 'Pierce+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.pierce += 2;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Poison Shot',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.projType = 'poison';
                    tower.projEffect += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Poison+',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.projEffect += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
        // tower upgrade path 2
        this.upgradePath2 = {
            u1: {
                name: 'Speed+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.speed += .7;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Slow Shot',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.projType = 'slow';
                    tower.projEffect += 2;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Slow+',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.projEffect += 2;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
    }

    initNinjaTower() {
        /*
            ninja tower is fast and can hit multiple enemies
            good for piercing snd slowing down long lines of enemies
            upgrade path 1 focuses on range, and adds a reversal effect to enemies
            upgrade path 2 focuses on speed, and adds a stun bomb
        */
        // tower stats/info
        this.projType = 'bullet';
        this.blastRadius = 0;
        this.projSize = 3;
        this.projEffect = 0;
        this.projLimit = 1;
        this.color = '#ffd700';
        this.cost = 1200;
        this.power = 1;
        this.pierce = 2;
        this.range = 100;
        this.speed = 2;
        this.info = ['Quickly throws', 'shurikens'];
        // tower upgrade path 1 (u1=upgrade tier 1, u2=upgrade tier 2, etc)
        this.upgradePath1 = {
            u1: {
                name: 'More Shots',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.projLimit += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Range+',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.range += 25;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Reversal',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.projType = 'reverse';
                    tower.projEffect = 1;
                    tower.pierce += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
        // tower upgrade path 2
        this.upgradePath2 = {
            u1: {
                name: 'Power+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.power += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Speed+',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.speed += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Stun Bomb',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.projType = 'stun';
                    tower.projEffect += 1;
                    tower.blastRadius += 18;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
    }

    initLaserTower() {
        /*
            laser tower shoots a long ranged laser that can pierce many enemies
            good for shooting down straight paths and covering a wide area
            upgrade path 1 focuses on speed and increasing projectile limit
            upgrade path 2 focuses on pierce, and laser size
        */
        // tower stats/info
        this.projType = 'laser';
        this.projSize = 3;
        this.projEffect = 0;
        this.blastRadius = 0;
        this.projLimit = 3;
        this.color = '#00ffff';
        this.cost = 2000;
        this.power = 1;
        this.pierce = 5;
        this.range = 150;
        this.speed = 3;
        this.info = ['Shoots lasers', 'over a large', 'range'];
        // tower upgrade path 1 (u1=upgrade tier 1, u2=upgrade tier 2, etc)
        this.upgradePath1 = {
            u1: {
                name: 'Speed+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.speed += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'More Shots',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.projLimit += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'More Shots',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.projLimit += 1;
                    tower.speed += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
        // tower upgrade path 2
        this.upgradePath2 = {
            u1: {
                name: 'Power+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.power += 1;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'Pierce+',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.pierce += 5;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Big Lasers',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.projSize += 3;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
    }

    initMineTower() {
        /*
            mine tower generates gold during the round
            good for passively making money
            gold can be manually collected during round or auto collected after
            maybe a basic towers in range can auto collect during round ?
            upgrade path 1 focuses on mining speed
            upgrade path 2 focuses on storage space
        */
        // tower stats/info
        this.projType = 'mine';
        this.projSize = 4;
        this.projEffect = 0;
        this.blastRadius = 0;
        this.projLimit = 1;
        this.color = '#696969';
        this.cost = 1500;
        this.power = 25; // gold generated
        this.pierce = 200; // gold storage limit
        this.range = 25;
        this.speed = .1;
        this.minedGold = 0;
        this.storedGold = 0;
        this.info = ['Generates gold', 'that can be', 'collected'];
        // tower upgrade path 1 (u1=upgrade tier 1, u2=upgrade tier 2, etc)
        this.upgradePath1 = {
            u1: {
                name: 'Speed+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.speed += .06;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'More Gold',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.power += 10;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Speed+',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.speed += .12;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
        // tower upgrade path 2
        this.upgradePath2 = {
            u1: {
                name: 'Storage+',
                cost: 250,
                bought: false,
                buy: function (tower) {
                    tower.pierce += 150;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u2: {
                name: 'More Gold',
                cost: 375,
                bought: false,
                buy: function (tower) {
                    tower.power += 40;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            u3: {
                name: 'Storage+',
                cost: 750,
                bought: false,
                buy: function (tower) {
                    tower.pierce += 300;
                    tower.value += Math.floor(this.cost / 2)
                    this.bought = true;}},
            maxed: false
        }
    }

    getUpgrade(path) {
        // get current path 1 upgrade
        if (path == 1) {
            if (!this.upgradePath1.u1.bought) {
                return this.upgradePath1.u1;
            }
            
            else if (!this.upgradePath1.maxed) {
                if (this.upgradePath1.u2.bought) {
                    this.upgradePath2.maxed = true;
                    if (!this.upgradePath1.u3.bought) {
                        return this.upgradePath1.u3;
                    }
                } else if (!this.upgradePath1.u2.bought) {
                    return this.upgradePath1.u2;
                }
            }
        }
        // get current path 2 upgrade
        else if (path == 2) {
            if (!this.upgradePath2.u1.bought) {
                return this.upgradePath2.u1;
            }

            else if (!this.upgradePath2.maxed) {
                if (this.upgradePath2.u2.bought) {
                    this.upgradePath1.maxed = true;
                    if (!this.upgradePath2.u3.bought) {
                        return this.upgradePath2.u3;
                    }
                } else if (!this.upgradePath2.u2.bought) {
                    return this.upgradePath2.u2;
                }
            }
        }
        
        // upgrade path maxed out
        return {
            name: 'Maxed Out',
            cost: 0,
            bought: false,
            buy: function() {
                return;
            }
        }
    }

    makeCopy(bought) {
        // return copy of tower when buying from catalog
        // param bought: bool, true if buying from shop, false otherwise
        let tower = new Tower({
            name: this.name,
            pos: {x: this.pos.x, y: this.pos.y},
            priority: this.priority,
            hits: this.hits,
            id: this.id,
            bought: this.bought
        });
        
        if (bought) {
            tower.upgradePath1 = this.upgradePath1;
            tower.upgradePath2 = this.upgradePath2;
            tower.power = this.power;
            tower.pierce = this.pierce;
            tower.range = this.range;
            tower.speed = this.speed;
            tower.projType = this.projType;
            tower.projLimit = this.projLimit;
            tower.projSize = this.projSize;
            tower.projEffect = this.projEffect;
            tower.blastRadius = this.blastRadius;
            tower.value = this.value;
            if (this.name == 'mine') {
                tower.storedGold = this.storedGold;
                tower.minedGold = this.minedGold;
            }
            }

        return tower;
    }

    setDimensions() {
        // set tower collision dimensions
        this.left = this.pos.x;
        this.top = this.pos.y;
        this.right = this.pos.x + this.size.width;
        this.bottom = this.pos.y + this.size.height;
    }

    addKill(damage) {
        // increase tower hit count
        this.hits += damage;
    }

    draw(ctx, timer) {
        // draw range if selected
        if (this.selected) {
            // show grey range if viewing placed tower or moving tower over a valid location, else show red range
            if (this.canPlace) {
                ctx.fillStyle = this.rangeGrey;
            } else {
                ctx.fillStyle = this.rangeRed;
            }
            ctx.beginPath();
            ctx.arc(this.pos.x + (this.size.width/2), this.pos.y + (this.size.height/2), this.range, 0, Math.PI*2, true);
            ctx.fill();
        }
        // draw black outline
        ctx.fillStyle = 'black';
        ctx.fillRect(this.pos.x - 1, this.pos.y - 1, this.size.width + 2, this.size.height + 2);
        // draw tower
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);

        // // draw targeting line
        // if (this.target != undefined) {
        //     ctx.strokeStyle = 'red';
        //     ctx.beginPath();
        //     ctx.moveTo(this.center.x, this.center.y);
        //     ctx.lineTo(this.target.pos.x + (this.target.size.width / 2), this.target.pos.y + (this.target.size.height / 2));
        //     ctx.stroke();
        // }

        // draw projectiles
        if (this.projectiles.length > 0) {
            for (let i = 0; i < this.projectiles.length; i++) {
                this.projectiles[i].draw(ctx, timer);
            }
        }

        // draw explosions
        for (let i = 0; i < this.explosions.length; i++) {
            this.explosions[i].drawExplosion(ctx, timer);
                // stop drawing explosion after short time
                if (timer - this.explosions[i].time > 5) {
                    this.explosions.splice(i, 1);
                }
        }
    }

    update(enemies, ctx, speed, timer) {
        this.damage = 0;
        this.explosionDamage = 0;

        // handle tower shooting (except for turret and mine tower)
        if (this.name != 'turret' || this.name != 'mine') {
            if (this.projectiles.length < this.projLimit && timer - this.lastShot > 60 / this.speed) {
                this.shoot(enemies);
                this.balanceProjectileIds();
                this.lastShot = timer;
            }
        }

        // handle turret shooting
        if (this.name == 'turret') {
            if (this.projectiles.length == 0 && timer - this.lastShot > 60 / this.speed) {
                this.shoot(enemies);
                this.lastShot = timer;
            }
            // handle ring effect if projectile has it
            if (this.projType == 'ring' && this.projectiles.length > 0) {
                this.projectiles[0].update(speed);
                let inRingRange = [];
                this.checkRange(enemies, this.center.x, this.center.y, inRingRange, this.projectiles[0].blastRadius);
                this.hits += this.projectiles[0].ringExpand(inRingRange, speed);
                // remove projectile if range limit reached
                if (this.projectiles[0].blastRadius >= this.range) {
                    this.projectiles.splice(0, 1);
                    this.balanceProjectileIds();
                }
                return;
            }
        }

        // handle mine shooting
        if (this.name == 'mine') {
            if (this.storedGold < this.pierce && timer - this.lastShot > 60 / this.speed) {
                this.storedGold += this.power;
                this.minedGold += this.power;
                this.shoot(enemies);
                this.balanceProjectileIds();
                this.lastShot = timer;
            }
            return;
        }
        
        // handle tower projectiles movement
        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i] != undefined) {
                // update projectile position
                this.projectiles[i].update(speed);
                // check if projectile hits an enemy
                enemies.forEach(enemy => {
                    // damage enemy if hit by projectile
                    if (this.checkCollision(this.projectiles[i], enemy)) {
                        //  don't use up pierce on one enemy
                        if (this.projectiles[i].collisions != undefined && this.projectiles[i].collisions.length > 0) {
                            for (let j = 0; j < this.projectiles[i].collisions.length; j++) {
                                if (this.projectiles[i].collisions[j] != enemy.id) {
                                    this.projectiles[i].collisions.push(enemy.id);
                                    this.damage = this.calculateDamage(enemy.health);
                                    this.projectiles[i].hits += this.damage;
                                    this.hits += this.damage;
                                    // damage enemy
                                    enemy.damage(this.calculateDamage(enemy.health));

                                    // handle slow and poison effects if projectile has it
                                    if (this.projectiles[i].name == 'slow' || this.projectiles[i].name == 'poison' || this.projectiles[i].name == 'reverse') {
                                        this.projectiles[i].applyEffect(enemy);
                                    }

                                    // handle explosion if projectile has one
                                    if (this.projectiles[i].name == 'bomb' || this.projectiles[i].name == 'stun') {
                                        let inExplosionRange = [];
                                        this.checkRange(enemies, this.projectiles[i].pos.x, this.projectiles[i].pos.y, inExplosionRange, this.projectiles[i].blastRadius);
                                        this.explosionDamage += this.projectiles[i].explode(inExplosionRange, ctx);
                                        this.hits += this.explosionDamage;
                                        // add projectile to explosions list
                                        this.projectiles[i].time = timer;
                                        this.explosions.push(this.projectiles[i]);
                                    }
                                }
                            }
                        } else {
                            this.projectiles[i].collisions.push(enemy.id);
                            this.damage = this.calculateDamage(enemy.health);
                            this.projectiles[i].hits += this.damage;
                            this.hits += this.damage;
                            // damage enemy
                            enemy.damage(this.calculateDamage(enemy.health));

                            // handle slow and poison effects if projectile has it
                            if (this.projectiles[i].name == 'slow' || this.projectiles[i].name == 'poison' || this.projectiles[i].name == 'reverse') {
                                this.projectiles[i].applyEffect(enemy);
                            }

                            // handle explosion if projectile has one
                            if (this.projectiles[i].name == 'bomb' || this.projectiles[i].name == 'stun') {
                                let inExplosionRange = [];
                                this.checkRange(enemies, this.projectiles[i].pos.x, this.projectiles[i].pos.y, inExplosionRange, this.projectiles[i].blastRadius);
                                this.explosionDamage += this.projectiles[i].explode(inExplosionRange, ctx);
                                this.hits += this.explosionDamage;
                                // add projectile to explosions list
                                this.projectiles[i].time = timer;
                                this.explosions.push(this.projectiles[i]);
                            }
                        }
                    }

                    // remove projectile if pierce limit reached
                    if (this.projectiles[i] != undefined && this.projectiles[i].hits >= this.pierce) {
                        this.projectiles.splice(i, 1);
                        this.balanceProjectileIds();
                    }
                    // remove projectile if range limit reached
                    else if (this.projectiles[i] != undefined && this.calculateDistance(this.projectiles[i].pos.x, this.projectiles[i].pos.y, this.center.x, this.center.y) >= this.range) {
                        this.projectiles.splice(i, 1);
                        this.balanceProjectileIds();
                    }
                    // remove projectile if off screen
                    else if (this.projectiles[i] != undefined && (this.projectiles[i].pos.x < 80 || this.projectiles[i].pos.x > 480 || this.projectiles[i].pos.y < 0 || this.projectiles[i].pos.y > 320)) {
                        this.projectiles.splice(i, 1);
                        this.balanceProjectileIds();
                    }
                })
            }
        }
        return;
    }

    shoot(enemies) {
        // target enemy in range, shoot projectile if tower doesn't already have one active (should add projectile limits later)
        if (this.name != 'mine') {
            // check for enemies in range
            this.enemiesInRange = []
            this.target = undefined;
            this.checkRange(enemies, this.center.x, this.center.y, this.enemiesInRange, this.range);

            // set target enemy based on targeting priority
            if (this.enemiesInRange.length > 0) {
                this.target = this.enemiesInRange[0];
                this.targetEnemy();
            }

            // shoot target enemy with projectile
            if (this.target != undefined) {
                // shoot non-turret projectile
                if (this.name != 'turret') {
                    this.projectiles.push(new Projectile({
                        name: this.projType,
                        pos: {
                            x: this.center.x,
                            y: this.center.y
                        },
                        center: this.center,
                        angle: this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2),
                        power: this.power,
                        blastRadius: this.blastRadius,
                        projSize: this.projSize,
                        projEffect: this.projEffect,
                        id: this.projId
                    }))
                }
                // shoot turret projectiles
                else if (this.name == 'turret') {
                    this.projId = 0;
                    this.projectiles = []
                    for (let i = 0; i < this.projLimit; i++) {
                        let angle = 0;
                        if (this.projId == 0) {
                            angle = this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2);
                        } else if (this.projId == 1) {
                            angle = this.backAngle(this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2));
                        } else if (this.projId == 2) {
                            angle = this.leftAngle(this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2));
                        } else if (this.projId == 3) {
                            angle = this.rightAngle(this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2));
                        } else if (this.projId == 4) {
                            angle = this.frontLeftAngle(this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2));
                        } else if (this.projId == 5) {
                            angle = this.frontRightAngle(this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2));
                        } else if (this.projId == 6) {
                            angle = this.backLeftAngle(this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2));
                        } else if (this.projId == 7) {
                            angle = this.backRightAngle(this.calculateAngle(this.target.pos.x + this.target.size.width / 2, this.target.pos.y + this.target.size.height / 2));
                        }
                        
                        this.projectiles.push(new Projectile({
                            name: this.projType,
                            pos: {
                                x: this.center.x,
                                y: this.center.y
                            },
                            center: this.center,
                            angle: angle,
                            power: this.power,
                            blastRadius: this.blastRadius,
                            projSize: this.projSize,
                            projEffect: this.projEffect,
                            id: this.projId
                        }))
                        this.projId++;
                    }
                }
            }
        }
        // handle gold mine
        else if (this.name == 'mine') {
            this.projectiles.push(new Projectile({
                name: this.projType,
                pos: {
                    x: this.center.x,
                    y: this.center.y
                },
                center: this.center,
                angle: 0,
                power: this.power,
                speed: 0,
                blastRadius: this.blastRadius,
                projSize: this.projSize,
                projEffect: this.projEffect,
                id: this.projId
            }))
        }
    }

    balanceProjectileIds() {
        // balance projectile list and ids
        let newProjectiles = [];
        this.projId = 0;
        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].id = this.projId;
            newProjectiles.push(this.projectiles[i])
            this.projId++;
        }
        this.projectiles = newProjectiles;
    }

    calculateDamage(health) {
        // calculate damage done to enemy target
        if (health < this.power) {
            return health;
        } else {
            return this.power;
        }
    }

    checkCollision(o1, o2) {
        if (o1 == undefined || o2 == undefined) {
            return false;
        }
        // set target object's collision boundaries 
        let left = o2.pos.x;
        let right = o2.pos.x + o2.size.width;
        let top = o2.pos.y;
        let bottom = o2.pos.y + o2.size.height;

        if (!(o1.right < left || // object 1 left collides
            o1.left > right || // object 1 right collides
            o1.top > bottom || // object 1 bottom collides
            o1.bottom < top)) { // object 1 top collides
            return true;
        }
        else {
            return false;
        }
    }

    checkLaserCollisions() {
        // will do something if I ever decide to make laser projectiles unique
        return;
    }

    changePriority() {
        // change tower's targeting priority (mine tower doesn't have targeting)
        if (this.name == 'mine') {
            return;
        }

        if (this.priority == 'first') {
            this.priority = 'last';
        } else if (this.priority == 'last') {
            this.priority = 'strong';
        } else if (this.priority == 'strong') {
            this.priority = 'weak';
        } else if (this.priority == 'weak') {
            this.priority = 'first';
        }
    }

    checkRange(enemies, x, y, enemiesInRange, range) {
        // check for enemies in tower range, add to potential target list
        enemies.forEach(enemy => {
            if (this.calculateDistance(enemy.pos.x + enemy.size.width / 2, enemy.pos.y + enemy.size.height / 2, x, y) <= range) {
                // if enemy is on screen (in case tower range extends off screen)
                if (enemy.pos.x > 80 && enemy.pos.x < 480 && enemy.pos.y > 0 && enemy.pos.y < 320) {
                    enemiesInRange.push(enemy);
                }
            }
            return enemiesInRange;
        });
    }

    calculateDistance(oX, oY, x, y) {
        // calculate distance between 2 objects
        let dx = (oX - x) ** 2;
        let dy = (oY - y) ** 2;
        let dz = dx + dy;
        return Math.sqrt(dz);
    }

    calculateAngle(oX, oY) {
        // calculate angle of projectile shot (turret tower front projectile)
        return Math.atan2(oY - this.center.y, oX - this.center.x);
    }

    backAngle(angle) {
        // turret tower back projectile
        return (angle + Math.PI) % (2 * Math.PI);
    }

    leftAngle(angle) {
        // turret tower left projectile
        return (angle + (Math.PI / 2)) % (2 * Math.PI);
    }

    rightAngle(angle) {
        // turret tower right projectile
        return (angle - (Math.PI / 2)) % (2 * Math.PI);
    }

    frontLeftAngle(angle) {
        // turret tower front-left projectile
        return (angle + (Math.PI / 4)) % (2 * Math.PI);
    }

    frontRightAngle(angle) {
        // turret tower front-right projectile
        return (angle - (Math.PI / 4)) % (2 * Math.PI);
    }

    backLeftAngle(angle) {
        // turret tower back-left projectile
        angle = (angle + Math.PI) % (2 * Math.PI);
        return (angle + (Math.PI / 4)) % (2 * Math.PI);
    }

    backRightAngle(angle) {
        // turret tower back-right projectile
        angle = (angle + Math.PI) % (2 * Math.PI);
        return (angle - (Math.PI / 4)) % (2 * Math.PI);
    }

    targetEnemy() {
        this.enemiesInRange.forEach(enemy => {
            // first priority
            if (this.priority == 'first') {
                if (enemy.traveled > this.target.traveled) {
                    this.target = enemy;
                }
            }
            // last priority
            if (this.priority == 'last') {
                if (enemy.traveled < this.target.traveled) {
                    this.target = enemy;
                }
            }
            // strong priority
            if (this.priority == 'strong') {
                if (enemy.health > this.target.health) {
                    this.target = enemy;
                }
            }
            // weak priority
            if (this.priority == 'weak') {
                if (enemy.health < this.target.health) {
                    this.target = enemy;
                }
            }
        })
    }
}
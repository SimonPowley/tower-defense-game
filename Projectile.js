class Projectile {
    constructor(config) {
        this.name = config.name || 'bullet';
        this.pos = config.pos || {x: 0, y: 0};
        this.center = config.center || {x: 0, y: 0};
        this.angle = config.angle || 0;
        this.power = config.power || 0;
        this.speed = config.speed || 1;
        this.blastRadius = config.blastRadius || 20;
        this.exploded = false;
        this.projSize = config.projSize || 2;
        this.projEffect = config.projEffect || 0;
        this.id = config.id || 0;
        this.collisions = []
        this.hits = 0;
        this.time  = 0;

        this.init();
        this.updateSides();        
    }

    init() {
        if (this.name == 'bullet' || this.name == 'bomb' || this.name == 'ring' || this.name == 'reverse') {
            this.color = '#000000';
        } else if (this.name == 'laser') {
            this.color = '#cc0000';
        } else if (this.name == 'poison') {
            this.color = '#bb00bb';
        } else if (this.name == 'slow') {
            this.color = '#aadd00';
        } else if (this.name == 'mine') {
            this.color = '#dddd00';
        }
    }

    updateSides() {
        // update projectile sides/collision dimensions
        this.left = this.pos.x - this.projSize;
        this.right = this.pos.x + this.projSize;
        this.top = this.pos.y - this.projSize;
        this.bottom = this.pos.y + this.projSize;
    }

    update(speed) {
        // update projectile location
        this.pos.x += Math.cos(this.angle) * this.speed * 3 * speed;
        this.pos.y += Math.sin(this.angle) * this.speed * 3 * speed;
        this.updateSides();
    }

    explode(enemies) {
        let hits = 0;
        if (!this.exploded) {
            this.exploded = true;
            for (let i = 0; i < enemies.length; i++) {
                // damage enemy, stun bombs do less damage
                if (this.name == 'stun') {
                    hits += this.calculateDamage(1);
                    enemies[i].damage(this.calculateDamage(1));
                } else {
                    hits += this.calculateDamage(enemies[i].health);
                    enemies[i].damage(this.calculateDamage(enemies[i].health));
                }
                
                // handle stun bomb
                if (this.name == 'stun') {
                    this.applyEffect(enemies[i]);
                }
            }
        }
        return hits;
    }

    ringExpand(enemies, speed) {
        let hits = 0;
        // hit enemies in ring range
        for (let i = 0; i < enemies.length; i++) {
            if (this.collisions.length > 0) {
                let idMatches = 0;
                // check if enemy has already been hit
                for (let j = 0; j < this.collisions.length; j++) {
                    if (enemies[i].id == this.collisions[j]) {
                        idMatches += 1;
                    }
                }
                // only damage enemies in range once
                if (idMatches <= 1) {
                    this.collisions.push(enemies[i].id);
                    hits += this.calculateDamage(enemies[i].health);
                    let health = enemies[i].health;
                    enemies[i].damage(this.calculateDamage(enemies[i].health));
                    if (enemies[i].health > health) {
                        enemies[i].health = health;
                    }
                }
            } else {
                this.collisions.push(enemies[i].id);
                hits += this.calculateDamage(enemies[i].health);
                let health = enemies[i].health;
                enemies[i].damage(this.calculateDamage(enemies[i].health));
                if (enemies[i].health > health) {
                    enemies[i].health = health;
                }
            }
        }
        // expand ring
        this.blastRadius += 3 * this.speed * speed;
        return hits;
    }

    applyEffect(enemy) {
        // apply slow effect
        if (this.name == 'slow') {
            enemy.slow(this.projEffect);
        }
        // apply poison effect
        if (this.name == 'poison') {
            enemy.poison(this.projEffect);
        }
        // apply stun effect
        if (this.name == 'stun') {
            enemy.stun(this.projEffect);
        }
        // apply reverse effect
        if (this.name == 'reverse') {
            enemy.reverse(this.projEffect);
        }
    }

    calculateDamage(health) {
        if (health < this.power) {
            return health;
        } else {
            return this.power;
        }
    }

    draw(ctx) {
        if (this.name != 'ring') {
            // draw black outline
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.projSize + 1, 0, Math.PI*2, true);
            ctx.fill();
            // draw color
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.projSize, 0, Math.PI*2, true);
            ctx.fill();
        } 
        
        if (this.name == 'ring') {
            // draw ring
            ctx.fillStyle = 'rgba(0, 0, 0, .1)';
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.blastRadius, 0, Math.PI*2, true);
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'rgba(0, 0, 0, .4)';
            ctx.stroke();
        }
    }

    drawExplosion(ctx) {
        // draw explosions
        if (this.exploded) {
            // draw regular explosion
            if (this.name == 'bomb') {
                // yellow center (maybe do more damage in center of blast?)
                ctx.fillStyle = 'rgba(255, 200, 0, .2)';
                ctx.beginPath();
                // red outer
                ctx.fillStyle = 'rgba(255, 0, 0, .5)';
                ctx.beginPath();
                ctx.arc(this.pos.x, this.pos.y, this.blastRadius, 0, Math.PI*2, true);
                ctx.fill();
            }
            // draw stun bomb explosions
            if (this.name == 'stun') {
                // white flash
                ctx.fillStyle = 'rgba(255, 255, 150, .5)';
                ctx.beginPath();
                ctx.arc(this.pos.x, this.pos.y, this.blastRadius, 0, Math.PI*2, true);
                ctx.fill();
            }
            
        }
    }
}
class Player {
    constructor() {
        this.maxLives = 100
        this.maxGold = 500;
        this.reset();
    }

    reset() {
        // reset player to default
        this.resetLives();
        this.resetGold();
        this.towers = [];
        this.selected = undefined;
    }

    addLives(lives) {
        // add lives to player life count
        this.lives += lives;
    }

    removeLives(lives) {
        // remove lives from player life count (min: 0)
        this.lives -= lives;
        if (this.lives < 0) {
            this.lives = 0;
        }
    }

    resetLives() {
        // reset player life count to defualt
        this.lives = this.maxLives;
    }

    addGold(gold) {
        // add gold to player gold count
        this.gold += gold;
    }

    removeGold(gold) {
        // remove gold from player gold count
        this.gold -= gold;
    }

    resetGold() {
        // reset player gold count to default
        this.gold = this.maxGold;
    }

    selectTower(tower) {
        // set player selected tower
        this.selected = tower;
        this.selected.selected = true;
    }

    buyTower() {
        this.removeTower(-1); // re-balance towers (if needed)
        // buy tower if player has enough money
        if (this.selected.cost <= this.gold) {
            this.removeGold(this.selected.cost);
            this.addTower();
            this.selected = undefined;
        } else {
            this.selected.canPlace = false;
        }
    }

    addTower() {
        // add tower to player tower list
        if (this.towers.length > 0) {
            this.selected.id = this.towers.length;
        } else {
            this.selected.id = 0;
        }
        this.selected.selected = false;
        this.selected.bought = true;
        this.towers.push(this.selected.makeCopy());
    }

    sellTower() {
        // sell tower for 50% of cost
        this.addGold(this.selected.value);
        this.removeTower(this.selected.id);
        this.selected = undefined;
    }

    removeTower(id) {
        // remove tower and balance tower ids (ex-> towers= [0, 1, 2]; removeTower(1); towers= [0, 2]; balance towers; towers= [0, 1])
        // if id == -1, no towers are removed and tower list is re-balanced (if it needs to be)
        let newTowers = [];
        let newId = 0;
        for (let i = 0; i < this.towers.length; i++) {
            if (this.towers[i].id != id) {
                this.towers[i].id = newId;
                newTowers.push(this.towers[i])
                newId++;
            }
        }
        this.towers = newTowers;
    }

    upgradeTower(path) {
        // upgrade path 1
        if (path == 1) {
            // buy upgrade 1 if player can afford (and not already bought)
            if (!this.selected.upgradePath1.u1.bought) {
                if (this.gold >= this.selected.upgradePath1.u1.cost) {
                    this.removeGold(this.selected.upgradePath1.u1.cost);
                    this.selected.upgradePath1.u1.buy(this.selected);
                }
                return;
            } 
            // buy upgrade 2 if player can afford (and not already bought)
            else if (!this.selected.upgradePath1.u2.bought && !this.selected.upgradePath1.maxed) {
                if (this.gold >= this.selected.upgradePath1.u2.cost) {
                    this.removeGold(this.selected.upgradePath1.u2.cost);
                    this.selected.upgradePath1.u2.buy(this.selected);
                }
                return;
            }
            // buy upgrade 3 if player can afford (and not already bought) 
            else if (!this.selected.upgradePath1.u3.bought && !this.selected.upgradePath1.maxed) {
                if (this.gold >= this.selected.upgradePath1.u3.cost) {
                    this.removeGold(this.selected.upgradePath1.u3.cost);
                    this.selected.upgradePath1.u3.buy(this.selected);
                }
                return;
            }
        }
        // upgrade path 2
        else if (path == 2) {
            // buy upgrade 1 if player can afford (and not already bought)
            if (!this.selected.upgradePath2.u1.bought) {
                if (this.gold >= this.selected.upgradePath2.u1.cost) {
                    this.removeGold(this.selected.upgradePath2.u1.cost);
                    this.selected.upgradePath2.u1.buy(this.selected);
                }
                return;
            }
            // buy upgrade 2 if player can afford (and not already bought) 
            else if (!this.selected.upgradePath2.u2.bought && !this.selected.upgradePath2.maxed) {
                if (this.gold >= this.selected.upgradePath2.u2.cost) {
                    this.removeGold(this.selected.upgradePath2.u2.cost);
                    this.selected.upgradePath2.u2.buy(this.selected);
                }
                return;
            }
            // buy upgrade 3 if player can afford (and not already bought)
            else if (!this.selected.upgradePath2.u3.bought && !this.selected.upgradePath2.maxed) {
                if (this.gold >= this.selected.upgradePath2.u3.cost) {
                    this.removeGold(this.selected.upgradePath2.u3.cost);
                    this.selected.upgradePath2.u3.buy(this.selected);
                }
                return;
            }
        }
    }

    update() {
        // make sure tower list is in right order/balanced
        this.removeTower(-1);
    }
}
class Info {
    constructor(config) {
        // info menu position and size
        this.pos = config.pos;
        this.size = config.size;
        this.dimensions = {left: this.pos.x, top: this.pos.y, right: this.size.width, bottom: this.size.height};

        this.tower = undefined; // selected tower to display info of
        this.upgradeTiers = [];
        this.infoButtons = [];
    }

    init() {
        // upgrade 1 button and tiers
        this.upgrade1Button = {
            pos: {x: this.pos.x + 5, y: this.pos.y + 132},
            size: {width: this.size.width - 10, height: 20}
        };

        this.upgradeTiers.push({
            pos: {x: this.pos.x + 5, y: this.upgrade1Button.pos.y + 22},
            size: {width: 20, height: 5}
        });
        this.upgradeTiers.push({
            pos: {x: this.pos.x + 30, y: this.upgrade1Button.pos.y + 22},
            size: {width: 20, height: 5}
        });
        this.upgradeTiers.push({
            pos: {x: this.pos.x + 55, y: this.upgrade1Button.pos.y + 22},
            size: {width: 20, height: 5}
        });

        // upgrade 2 button and tiers
        this.upgrade2Button = {
            pos: {x: this.pos.x + 5, y: this.pos.y + 202},
            size: {width: this.size.width - 10, height: 20}
        };

        this.upgradeTiers.push({
            pos: {x: this.pos.x + 5, y: this.upgrade2Button.pos.y + 22},
            size: {width: 20, height: 5}
        });
        this.upgradeTiers.push({
            pos: {x: this.pos.x + 30, y: this.upgrade2Button.pos.y + 22},
            size: {width: 20, height: 5}
        });
        this.upgradeTiers.push({
            pos: {x: this.pos.x + 55, y: this.upgrade2Button.pos.y + 22},
            size: {width: 20, height: 5}
        });

        // tower priority button
        this.priorityButton = {
            pos: {x: this.pos.x + 5, y: this.pos.y + 282},
            size: {width: this.size.width - 10, height: 15}
        };

        // tower sell button
        this.sellButton = {
            pos: {x: this.pos.x + 5, y: this.pos.y + 300},
            size: {width: this.size.width - 10, height: 15}
        };

        // set info buttons for player to click
        this.infoButtons = {
            upgrade1Button: this.upgrade1Button,
            upgrade2Button: this.upgrade2Button,
            priorityButton: this.priorityButton,
            sellButton: this.sellButton
        }
    }

    setColors(path, tier) {
        // update tower upgrade tier colors, green if bought, grey if not, red if upgrade path maxed
        // tower upgrade path 1
        if (path == 1) {
            if (tier == 1) {
                if (this.tower.upgradePath1.u1.bought) {
                    this.upgradeTiers[0].color = '#00ff00';
                } else {
                    this.upgradeTiers[0].color = '#555555';
                }
            } else if (tier == 2) {
                if (this.tower.upgradePath1.u2.bought) {
                    this.upgradeTiers[1].color = '#00ff00';
                } else if (!this.tower.upgradePath1.maxed) {
                    this.upgradeTiers[1].color = '#555555';
                } else {
                    this.upgradeTiers[1].color = '#ff0000';
                }
            } else if (tier == 3) {
                if (this.tower.upgradePath1.u3.bought) {
                    this.upgradeTiers[2].color = '#00ff00';
                } else if (!this.tower.upgradePath1.maxed) {
                    this.upgradeTiers[2].color = '#555555';
                } else {
                    this.upgradeTiers[2].color = '#ff0000';
                }
            }
            
        }

        // tower upgrade path 2
        else if (path == 2) {
            if (tier == 1) {
                if (this.tower.upgradePath2.u1.bought) {
                    this.upgradeTiers[3].color = '#00ff00';
                } else {
                    this.upgradeTiers[3].color = '#555555';
                }
            } else if (tier == 2) {
                if (this.tower.upgradePath2.u2.bought) {
                    this.upgradeTiers[4].color = '#00ff00';
                } else if (!this.tower.upgradePath2.maxed) {
                    this.upgradeTiers[4].color = '#555555';
                } else {
                    this.upgradeTiers[4].color = '#ff0000';
                }
            } else if (tier == 3) {
                if (this.tower.upgradePath2.u3.bought) {
                    this.upgradeTiers[5].color = '#00ff00';
                } else if (!this.tower.upgradePath2.maxed) {
                    this.upgradeTiers[5].color = '#555555';
                } else {
                    this.upgradeTiers[5].color = '#ff0000';
                }
            }
            
        }
    }

    selectTower(tower) {
        // make a copy of player selected tower to display on info menu
        this.tower = tower.makeCopy(tower.bought);
        this.tower.pos = {x: this.pos.x + 5, y: this.pos.y + 5};
        this.tower.size = {width: this.tower.size.width * 2, height: this.tower.size.height * 2}
    }

    draw(ctx, tower) {
        // fill tower info background
        ctx.fillStyle = 'rgba(192, 192, 192, .75)';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);

        // select tower
        this.selectTower(tower);
        this.tower.draw(ctx);

        // draw tower stats
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(this.tower.name.charAt(0).toUpperCase() + this.tower.name.slice(1), this.tower.pos.x + this.tower.size.width + 5, this.tower.pos.y + 12);
        ctx.fillText('Tower', this.tower.pos.x + this.tower.size.width + 5, this.tower.pos.y + 27);
        ctx.font = 'bold 12px Arial';
        if (this.tower.name == 'mine') {
            ctx.fillText('Gold: ' + this.tower.power, this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 15);
            ctx.fillText('Holds: ' + this.tower.pierce, this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 30);
            ctx.fillText('Mined: $' + this.tower.minedGold, this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 75);
        } else {
            ctx.fillText('Power: ' + this.tower.power, this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 15);
            ctx.fillText('Pierce: ' + this.tower.pierce, this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 30);
            ctx.fillText('Hits: ' + this.tower.hits, this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 75);
        }
        ctx.fillText('Range: ' + this.tower.range, this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 45);
        ctx.fillText('Speed: ' + this.tower.speed, this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 60);

        // draw tower upgrade info
        ctx.fillText('Upgrade List', this.pos.x + 5, this.tower.pos.y + this.tower.size.height + 95);
        this.drawRects(ctx);
        ctx.font = '12px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(this.tower.getUpgrade(1).name, this.tower.pos.x + 3, this.upgrade1Button.pos.y + 15);
        ctx.fillText(this.tower.getUpgrade(2).name, this.tower.pos.x + 3, this.upgrade2Button.pos.y + 15);
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('$' + this.tower.getUpgrade(1).cost, this.tower.pos.x + 3, this.upgrade1Button.pos.y + 40);
        ctx.fillText('$' + this.tower.getUpgrade(2).cost, this.tower.pos.x + 3, this.upgrade2Button.pos.y + 40);

        // draw tower targeting and sell info
        ctx.font = '11px Arial';
        ctx.fillStyle = 'white';
        if (this.tower.name == 'mine') {
            ctx.fillText('Collect Gold', this.tower.pos.x + 3, this.priorityButton.pos.y + 12);
            ctx.font = 'bold 11px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText('Stored: $' + this.tower.storedGold, this.tower.pos.x, this.priorityButton.pos.y - 5);
        } else {
            ctx.fillText('Set Target', this.tower.pos.x + 3, this.priorityButton.pos.y + 12);
            ctx.font = 'bold 11px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText('Target: ' + this.tower.priority.charAt(0).toUpperCase() + this.tower.priority.slice(1), this.tower.pos.x, this.priorityButton.pos.y - 5);
        }
        ctx.font = '11px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Sell: $' + this.tower.value, this.tower.pos.x + 3, this.sellButton.pos.y + 12);

    }

    drawRects(ctx) {
        // draw upgrade 1 button
        ctx.fillRect(this.upgrade1Button.pos.x, this.upgrade1Button.pos.y, this.upgrade1Button.size.width, this.upgrade1Button.size.height);
        // draw upgrade 2 button
        ctx.fillRect(this.upgrade2Button.pos.x, this.upgrade2Button.pos.y, this.upgrade2Button.size.width, this.upgrade2Button.size.height);
        // draw tower priority button
        ctx.fillRect(this.priorityButton.pos.x, this.priorityButton.pos.y, this.priorityButton.size.width, this.priorityButton.size.height);
        // draw tower sell button
        ctx.fillRect(this.sellButton.pos.x, this.sellButton.pos.y, this.sellButton.size.width, this.sellButton.size.height);

        // draw upgrade tiers (grey=not bought, green=bought)
        for (let i = 1; i < 3; i++) {
            for (let j = 1; j < 4; j++) {
                this.setColors(i, j);
            }
        }
        for (let i = 0; i < this.upgradeTiers.length; i++) {
            ctx.fillStyle = this.upgradeTiers[i].color;
            ctx.fillRect(this.upgradeTiers[i].pos.x, this.upgradeTiers[i].pos.y, this.upgradeTiers[i].size.width, this.upgradeTiers[i].size.height);
        }
    }
}
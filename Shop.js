class Shop {
    constructor(config) {
        this.pos = config.pos;
        this.size = config.size;
        this.dimensions = {left: this.pos.x, top: this.pos.y, right: this.size.width, bottom: this.size.height};
        this.towers = []; // list of towers for sale
        this.selected = undefined;
    }

    init(canvas) {
        // create list of towers to sell at shop
        this.towers.push(new Tower({
            name: 'basic',
            pos: {x: this.size.width -64, y: this.size.height -252}
        }));
        this.towers.push(new Tower({
            name: 'turret',
            pos: {x: this.size.width -32, y: this.size.height -252}
        }));
        this.towers.push(new Tower({
            name: 'bomb',
            pos: {x: this.size.width -64, y: this.size.height -212}
        }));
        this.towers.push(new Tower({
            name: 'chem',
            pos: {x: this.size.width -32, y: this.size.height -212}
        }));
        this.towers.push(new Tower({
            name: 'ninja',
            pos: {x: this.size.width -64, y: this.size.height -172}
        }));
        this.towers.push(new Tower({
            name: 'laser',
            pos: {x: this.size.width -32, y: this.size.height -172}
        }));
        this.towers.push(new Tower({
            name: 'mine',
            pos: {x: this.size.width -64, y: this.size.height -132}
        }))
        
        // add shop menu to collision list
        canvas.collisions.push(this.dimensions);
    }

    draw(ctx) {
        // fill shop menu background
        ctx.fillStyle = 'rgb(192, 192, 192)';
        ctx.fillRect(0, 0, this.size.width, this.size.height);
        // draw shop menu header
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Tower Shop', 5, this.size.height -262);
        // draw tower info
        this.towers.forEach(tower => {
            // draw tower
            tower.draw(ctx);
            // draw tower cost
            ctx.font = 'bold 10px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText('$' + tower.cost, tower.pos.x - 7, tower.pos.y + 25);
        });

        // draw shop info if tower selected
        if (this.selected != undefined) {
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(this.selected.name.charAt(0).toUpperCase() + this.selected.name.slice(1) + ' Tower', this.size.width / 20, 230);
            ctx.font = 'bold 11px Arial';
            if (this.selected.name != 'mine') {
                ctx.fillText('Power: ' + this.selected.power, this.size.width / 20, 245);
                ctx.fillText('Pierce: ' + this.selected.pierce, this.size.width / 20, 255);
            } else {
                ctx.fillText('Gold: ' + this.selected.power, this.size.width / 20, 245);
                ctx.fillText('Holds: ' + this.selected.pierce, this.size.width / 20, 255);
            }
            ctx.fillText('Range: ' + this.selected.range, this.size.width / 20, 265);
            ctx.fillText('Speed: ' + this.selected.speed, this.size.width / 20, 275);
            let y = 290
            ctx.font = 'bold 10px Arial';
            for(let j = 0; j < this.selected.info.length; j++) {
                ctx.fillText(this.selected.info[j], this.size.width / 20, y);
                y += 10;
            }
        }
    }
}
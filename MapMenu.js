class MapMenu {
    constructor(config) {
        this.running = true;
        this.fps = 60;

        // map canvas info
        this.canvas = config.mapMenuCanvas;
        this.ctx = this.canvas.getContext('2d');
        // size of map thumbnails
        this.tileWidth = 8;
        this.tileHeight = 8;
        // list of available maps
        this.canvas.maps = [];

        this.player = config.player || new Player();
        this.loading = undefined;
    }

    init() {
        this.canvas.addEventListener('click', this.mouseClick);

        // create map thumbnails for player to select from
        this.initMap('map_1', 20, 20);
        this.initMap('map_2', 20, 120);
        this.initMap('map_1', 20, 220); // placeholder for map 3, etc

        // run map menu
        this.runMapMenu();
    }

    initMap(mapName, x, y) {
        // create map options to display to player
        this.canvas.maps.push({
            x: x,
            y: y,
            width: 13 * this.tileWidth,
            height: 10 * this.tileHeight,
            path: new Path(mapName)
        });
        // initialize map
        this.canvas.maps[this.canvas.maps.length - 1].path.init();
    }

    startGame() {
        // start game with selected map
        const game = new Game({
            gameCanvas: document.getElementById('mapMenuCanvas'),
            player: this.player,
            path: this.canvas.loading.path,
            mapMenu: this
        });

        this.running = false;
        game.init();
    }

    update() {
        // wait for player to select a map, then start game
        if (this.canvas.loading != undefined) {
            this.startGame();
        }
    }

    draw() {
        // draw blank game canvas
        this.ctx.fillStyle = 'rgb(192, 192, 192)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // draw map thumbnails/selection options
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.canvas.maps.length; i++) {
            // top left corner of map thumbnail
            x = this.canvas.maps[i].x;
            y = this.canvas.maps[i].y;

            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(x-2, y-2, this.canvas.maps[i].width+80, this.canvas.maps[i].height+4);
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.fillText(this.canvas.maps[i].path.name, this.canvas.maps[i].x + this.canvas.maps[i].width + 20, this.canvas.maps[i].y + 15)

            // draw map tiles
            this.canvas.maps[i].path.thumbnail.forEach(row => {
                row.forEach(col => {
                    // draw path tile
                    if (col == '0') {
                        this.ctx.fillStyle = this.canvas.maps[i].path.pathColor;
                        this.ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
                    }
                    // draw land tile
                    if (col == '1') {
                        this.ctx.fillStyle = this.canvas.maps[i].path.landColor;
                        this.ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
                    }
                    // move right for next row tile
                    x += this.tileWidth;
                })
                // move down for next column tile
                x = this.canvas.maps[i].x;
                y += this.tileHeight;
            })
        }
    }

    mouseClick(event) {
        event.preventDefault();

        // mouse position
        let endX = parseInt(event.offsetX);
        let endY = parseInt(event.offsetY);

        // player selects map
        for (let i = 0; i < this.maps.length; i++) {
            if (mouseOver(endX, endY, this.maps[i])) {
                if (this.loading == undefined) {
                    this.loading = this.maps[i];
                }
            }
        }

        function mouseOver(x, y, object) {
            // set object collision dimensions 
            let objectLeft = object.x;
            let objectRight = object.x + object.width;
            let objectTop = object.y;
            let objectBottom = object.y + object.height;
    
            if (x > objectLeft && x < objectRight && y > objectTop && y < objectBottom) {
                return true;
            }
            return false;
        }
    }

    runMapMenu() {
        this.timer = 0;
        // run game loop
        if (this.running) {
            setInterval(() => {
                if(this.running) {
                    this.timer++;
                    this.draw();
                    this.update();
                }
            }, 1000 / this.fps);
        }
    }
}
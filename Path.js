class Path {
    constructor(mapName) {
        this.name = mapName;
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.landColor = '#008000';
        this.pathColor = '#cd853f';
        this.mapArray = [];
        this.waypoints = [];
        this.pathTiles = [];
    }

    init(canvas) {
        // screen is 15x10 grid of 32x32 'chunks', map is 13x10 (shop menu takes up 2x10 on left side)
        // 0 = path, 1 = land
        // path 1
        if (this.name == 'map_1') {
            this.mapArray = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
        }

        // path 2
        if (this.name == 'map_2') {
            this.mapArray = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        }

        this.setWaypoints();
        this.createThumbnail();
        //  add path tiles to collision list (towers can't be placed on path)
        if (canvas != undefined) {
            this.pathTiles.forEach(tile => {
                canvas.collisions.push({
                    left: tile.left,
                    top: tile.top,
                    right: tile.right,
                    bottom: tile.bottom
                });
            })
        }
    }

    createThumbnail() {
        // create thumbnails for map selection menu
        // trim first two columns of map array (covered by shop during game)
        // can probably do this easier/more simply, maybe later

        // map 1 thumbnail
        if (this.name == 'map_1') {
            this.thumbnail = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
                [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1],
                [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
                [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
        }
        // map 2 thumbnail
        if (this.name == 'map_2') {
            this.thumbnail = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
                [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ];
        }
    }

    setWaypoints() {
        let x = 14;
        let y = 15;
        // get all path tile locations
        this.mapArray.forEach(row => {
            row.forEach(col => {
                // add path tile to path tile list
                if (col == '0') {
                    this.pathTiles.push({
                        center: {x: x, y: y},
                        left: x - 14,
                        top: y - 15,
                        right: x - 14 + this.tileWidth,
                        bottom: y - 15 + this.tileHeight});
                }
                x += this.tileWidth;
            })
            x = 14;
            y += this.tileHeight;
        })

        // set map start, corners, and end points
        let index = 1;
        //  map 1
        if (this.name == 'map_1') {
            let map1Corners = [26, 29, 21, 24, 3, 0, 13, 11, 20, 18, 7, 4];
            this.addWaypoint(this.pathTiles[31], 0, undefined); // start point
            map1Corners.forEach(corner => {
                this.addWaypoint(this.pathTiles[corner], index, this.waypoints[index-1]); // corners and end point
                index++;
            })
            // start and end offsets
            this.waypoints[0].y += 32;
            this.waypoints[12].x -= 32;
            this.direction = 'up'; // set start direction
        }
        //  map 2
        if (this.name == 'map_2') {
            let map2Corners = [28, 40, 38, 2, 0, 10, 20, 5, 3, 45, 43, 32, 37];
            this.addWaypoint(this.pathTiles[23], 0, undefined); // start point
            map2Corners.forEach(corner => {
                this.addWaypoint(this.pathTiles[corner], index, this.waypoints[index-1]); // corners and end point
                index++;
            })
            // start and end offsets
            this.waypoints[0].x -= 32;
            this.waypoints[13].x += 32;
            this.direction = 'right'; // set start direction
        }
    }

    addWaypoint(pathTile, index, prev) {
        // add start, corners, and end to waypoints
        this.waypoints.push({
            x: pathTile.center.x,
            y: pathTile.center.y,
            next: undefined,
            prev: prev
        })
        if (prev != undefined) {
            this.waypoints[index-1].next = this.waypoints[index];
        }
    }

    draw(ctx) {
        let x = 0;
        let y = 0;
        // draw map tiles
        this.mapArray.forEach(row => {
            row.forEach(col => {
                // draw path tile
                if (col == '0') {
                    ctx.fillStyle = this.pathColor;
                    ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
                }
                //  draw land tile
                else if (col == '1') {
                    ctx.fillStyle = this.landColor;
                    ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
                }
                x += this.tileWidth;
            })
            x = 0;
            y += this.tileHeight;
        })

        // // draw waypoints
        // this.pathTiles.forEach(tile => {
        //     ctx.fillStyle = 'black';
        //     ctx.fillRect(tile.center.x, tile.center.y, 4, 4);
        // })
    }
}
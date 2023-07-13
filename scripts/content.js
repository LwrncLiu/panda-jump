// get canvas and create context
class Game{
    constructor(){
        this.sprite = new Image()
        this.sprite.src = "images/scene.png"
        this.generateScene()
        this.gameInProgress = false
        this.velos = []
        this.cacti = []
        this.collision = false
    }
    load(){
        this.spawnRoad()
        this.spawnPanda()   
    }

    run(){  
        document.addEventListener("keydown", (event) => {
            if (event.code == 'Enter' && !this.gameInProgress){
                this.startGame()
            }      
            if (event.code == 'ArrowDown' && this.panda.currentAction == "run" && this.gameInProgress){
                this.panda.crouch()
            }
            if (event.code == 'Space' && this.panda.currentAction != "jump" && this.gameInProgress){
                this.panda.jump()
            }
        })
        document.addEventListener("keyup", (event) => {
            if (event.code == 'ArrowDown' && this.panda.currentAction == "crouch"){
                this.panda.run()
            }
        })

        setInterval(this.spawnVelos.bind(this), 17000)
        setInterval(this.manageVelos.bind(this), 17000)

        setInterval(this.spawnCacti.bind(this), 6000)
        setInterval(this.manageCacti.bind(this), 6000)
        setInterval(this.collisionDetection.bind(this), 100)
    }

    collisionDetection(){
        if (this.velos){
            for (let i = 0; i < this.velos.length; i++) {
                this.collision = this.twoObjectDetection(this.panda, this.velos[i])
                if (this.collision){
                    console.log("collision detected")
                    this.stopGame()
                }
            }
        }
        if (this.cacti){
            for (let i = 0; i < this.cacti.length; i++) {
                this.collision = this.twoObjectDetection(this.panda, this.cacti[i])
                if(this.collision){
                    console.log("collision detected")
                    this.stopGame()
                }
            }
        }
    }
    
    // TODO: make collision detection less naive
    twoObjectDetection(panda, object){
        let xAxisOverlap = (panda.currPosX + panda.currPosWidth).between(object.currPosX, object.currPosX + object.currWidth, true)
        let yAxisOverlap = panda.currPosY.between(object.currPosY, object.currPosY + object.currHeight, true) || (panda.currPosY + panda.currPosHeight).between(object.currPosY, object.currPosY + object.currHeight, true)
        return yAxisOverlap && xAxisOverlap
    }

    resetGame(){
        // remove elements
        this.clearVelos()
        this.clearCacti()
        this.clearGameOver()
        this.clearRestartButton()
        this.road.removeRoad()
        this.panda.removePanda()

        // create new elements
        this.spawnPanda()
        this.spawnRoad()
    }

    startGame(){
        this.resetGame()
        
        this.spawnCacti()
        this.panda.move()
        this.road.move()
        this.gameInProgress = true
    }

    stopGame(){
        this.panda.die()
        this.road.stopRoad()
        if(this.velos){
            for (let i = 0; i < this.velos.length; i++) {
                let velo = this.velos[i]
                velo.stop()
            }
        }
        if(this.cacti){
            for (let i = 0; i < this.cacti.length; i++) {
                let cactus = this.cacti[i]
                cactus.stop()
            }
        }
        this.showGameOver()
        this.showRestartButton()
        this.gameInProgress = false
    }
    

    generateScene(){

        let canvas = document.createElement("canvas")
        canvas.width = 600
        canvas.height = 150
        
        let canvasBackground = document.createElement("canvas")
        canvasBackground.width = 600
        canvasBackground.height = 150

        let canvasCactus = document.createElement("canvas")
        canvasCactus.width = 600
        canvasCactus.height = 150

        let ctxBackground = canvasBackground.getContext("2d");
        ctxBackground.fillStyle = "#bed199";
        ctxBackground.fillRect(0, 0, canvasBackground.width, canvasBackground.height)

        canvas.id = "game";
        canvasBackground.id = "gameBackground"
        canvasCactus.id = "gameCactus"
        document.getElementById("gameDiv").appendChild(canvasBackground)    
        document.getElementById("gameDiv").appendChild(canvas)    
        document.getElementById("gameDiv").appendChild(canvasCactus)
    }

    spawnVelos(){
        if (this.gameInProgress){
            console.log("spawning a velociraptor")
            let velo = new Velociraptor(this.sprite)
            velo.load() 
            this.velos.push(velo)
        }
    }

    manageVelos(){
        console.log("managing velociraptors")
        for (let i = 0; i < this.velos.length; i++) {
            let velo = this.velos[i]
            if (velo.currPosX <= -100){
                velo.stop()
                this.velos.splice(i, 1)
            }
        }
    }

    spawnCacti(){
        if (this.gameInProgress){
            let randomInt = Math.floor(Math.random() * (3) + 1)
            console.log("spawning cactus " + randomInt)
            let cactus = new Cactus(this.sprite, randomInt)
            cactus.load()
            this.cacti.push(cactus)
        }   
    }

    manageCacti(){
        console.log("managing cacti")
        for (let i = 0; i < this.cacti.length; i++) {
            let cactus = this.cacti[i]
            if (cactus.currPosX <= -100){
                cactus.stop()
                this.cacti.splice(i, 1)
            }
        }
    }

    spawnRoad(){
        this.road = new Road(this.sprite)
    }

    spawnPanda(){
        this.panda = new Panda(this.sprite, this.globalVariable)
        this.panda.load()
    }

    showGameOver(){
        this.canvas = document.getElementById("game")
        this.context = this.canvas.getContext("2d")

        let sourceX = 954
        let sourceY = 29
        let sourceWidth = 380
        let sourceHeight = 23

        let destinationWidth = sourceWidth * 0.75
        let destinationHeight = sourceHeight * 0.75
        let destinationX = (this.canvas.width / 2) - (destinationWidth / 2)
        let destinationY = 30


        this.context.drawImage(
            this.sprite,
            sourceX, sourceY,
            sourceWidth, sourceHeight,
            destinationX, destinationY,
            destinationWidth, destinationHeight
        )
    }

    clearGameOver(){
        this.canvas = document.getElementById("game")
        this.context = this.canvas.getContext("2d")
        let sourceWidth = 380
        let sourceHeight = 23

        let destinationWidth = sourceWidth * 0.75
        let destinationHeight = sourceHeight * 0.75
        let destinationX = (this.canvas.width / 2) - (destinationWidth / 2)
        let destinationY = 30
        this.context.clearRect(destinationX, destinationY, destinationWidth, destinationHeight)
    }

    showRestartButton(){
        this.canvas = document.getElementById("game")
        this.context = this.canvas.getContext("2d")

        let sourceX = 0
        let sourceY = 1
        let sourceWidth = 74
        let sourceHeight = 65

        let destinationWidth = sourceWidth * 0.5
        let destinationHeight = sourceHeight * 0.5
        let destinationX = (this.canvas.width / 2) - (destinationWidth / 2)
        let destinationY = 60

        this.context.drawImage(
            this.sprite,
            sourceX, sourceY,
            sourceWidth, sourceHeight,
            destinationX, destinationY,
            destinationWidth, destinationHeight
        )
    }

    clearRestartButton(){
        this.canvas = document.getElementById("game")
        this.context = this.canvas.getContext("2d")

        let sourceWidth = 74
        let sourceHeight = 65

        let destinationWidth = sourceWidth * 0.5
        let destinationHeight = sourceHeight * 0.5
        let destinationX = (this.canvas.width / 2) - (destinationWidth / 2)
        let destinationY = 60

        this.context.clearRect(destinationX, destinationY, destinationWidth, destinationHeight)
    }

    clearVelos(){
        for (let i = 0; i < this.velos.length; i++) {
            let velo = this.velos[i]
            velo.resetBackground()
        }
        this.velos = []
    }
    
    clearCacti(){
        for (let i = 0; i < this.cacti.length; i++) {
            let cactus = this.cacti[i]
            cactus.resetBackground()
        }
        this.cacti = []
    }
}


class Road{
    constructor(sprite){
        this.sprite = sprite
        this.getContext()
        this.gameFrame = 0
        this.stagger = 0
        this.staggerFrame = 1
        this.stopId
        this.windowWidth = this.canvas.width
        this.sourceY = 103
        this.sourceWidth = this.windowWidth * 3
        this.sourceHeight = 36
        this.destinationWidth = this.windowWidth
        this.destinationHeight = Math.round(this.sourceHeight / 3)
        this.currPosX = 0
        this.currPosY = 125
    }

    getContext(){
        this.canvas = document.getElementById("gameBackground")
        this.context = this.canvas.getContext("2d")
        this.context.fillStyle = "rgba(190, 209, 153, 1)"
    }

    move(){
        this.context.clearRect(this.currPosX, this.currPosY, this.destinationWidth, this.destinationHeight)
        this.context.fillRect(this.currPosX, this.currPosY, this.destinationWidth, this.destinationHeight)        
            
        if (this.gameFrame >= 600) {
            this.gameFrame = 0
        }
            
        let roadOffset = this.gameFrame
            
        this.context.drawImage(
                this.sprite, 
                roadOffset, this.sourceY,
                this.sourceWidth, this.sourceHeight,    
                this.currPosX, this.currPosY,     
                this.destinationWidth, this.destinationHeight
        )
        this.gameFrame += 3
        this.stopId = window.requestAnimationFrame(this.move.bind(this))
    }

    stopRoad(){
        cancelAnimationFrame(this.stopId)
    }

    removeRoad(){
        this.context.clearRect(this.currPosX, this.currPosY, this.destinationWidth, this.destinationHeight)
        this.context.fillRect(this.currPosX, this.currPosY, this.destinationWidth, this.destinationHeight)
    }
}



var game = new Game()
game.load()
game.run()

Number.prototype.between = function(a, b, inclusive) {
    var min = Math.min.apply(Math, [a, b]),
      max = Math.max.apply(Math, [a, b]);
    return inclusive ? this >= min && this <= max : this > min && this < max;
  };
  
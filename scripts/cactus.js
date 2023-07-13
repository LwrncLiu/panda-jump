class Cactus{
    constructor(sprite, variation){
        this.sprite = sprite
        this.cactusVariation = variation
        this.gameFrame = 0
        this.stagger = 0
        this.staggerFrame = 1
        this.getContext()
        this.sourceX = 446
        this.sourceY = 2
        this.sourceWidth = 34
        this.sourceHeight = 70
        this.destinationWidth = Math.round(this.sourceWidth / 2.5)
        this.destinationHeight = Math.round(this.sourceHeight / 2.5)
        this.getCactusSpriteCoords()
        this.startX = this.canvas.width
        this.currPosX = this.startX
        this.currPosY = 105
        this.currWidth = this.destinationWidth
        this.currHeight = this.destinationHeight
    }


    getContext(){
        this.canvas = document.getElementById("gameCactus")
        this.context = this.canvas.getContext("2d")
        this.context.fillStyle = "rgba(0, 0, 0, 0)"
    }


    getCactusSpriteCoords(){
        if (this.cactusVariation == 1){
            this.sourceX = 446
            this.sourceY = 2
            this.sourceWidth = 34
            this.sourceHeight = 70
            this.destinationWidth = Math.round(this.sourceWidth / 2.5)
            this.destinationHeight = Math.round(this.sourceHeight / 2.5)
        } else if (this.cactusVariation == 2){
            this.sourceX = 480
            this.sourceY = 2
            this.sourceWidth = 68
            this.sourceHeight = 70
            this.destinationWidth = Math.round(this.sourceWidth / 2.5)
            this.destinationHeight = Math.round(this.sourceHeight / 2.5)
        } else if (this.cactusVariation == 3){
            this.sourceX = 548
            this.sourceY = 2
            this.sourceWidth = 102
            this.sourceHeight = 70
            this.destinationWidth = Math.round(this.sourceWidth / 2.5)
            this.destinationHeight = Math.round(this.sourceHeight / 2.5)
        }
    }


    resetBackground(){
        this.context.clearRect(this.currPosX, this.currPosY, this.sourceWidth + 1, this.sourceHeight)
        this.context.fillRect(this.currPosX, this.currPosY, this.sourceWidth + 1, this.sourceHeight)      
    }


    load(){
        if((this.stagger % this.staggerFrame) == 0 && this.currPosX > -100){
            this.resetBackground()
            this.context.drawImage(
                this.sprite,
                this.sourceX, this.sourceY,
                this.sourceWidth, this.sourceHeight,
                this.startX - (this.gameFrame), this.currPosY,
                this.destinationWidth, this.destinationHeight
            )
            this.gameFrame++
            this.currPosX--
        }
        this.stagger++
        this.stopId = window.requestAnimationFrame(this.load.bind(this))
    }


    stop(){
        cancelAnimationFrame(this.stopId)
    }
}
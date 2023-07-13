class Velociraptor{
    constructor(sprite){
        this.sprite = sprite
        this.getContext()
        this.gameFrame = 0
        this.stagger = 0
        this.staggerFrame = 6
        this.startX = this.canvas.width
        this.sourcePosX = 260
        this.sourcePosY = 2
        this.currPosX = this.startX 
        this.currPosY = 80
        this.sourceWidth = 92
        this.sourceHeight = 78
        this.destinationWidth = Math.round(this.sourceWidth / 3)
        this.destinationHeight = Math.round(this.sourceHeight / 3)
        this.currWidth = this.destinationWidth
        this.currHeight = this.destinationHeight
        this.pixelsPerMove = 8
        this.stopId
    }

    getContext(){
        this.canvas = document.getElementById("gameBackground")
        this.context = this.canvas.getContext("2d")
        this.context.fillStyle = "rgba(190, 209, 153, 1)"
    }

    load(){
        this.spawn()
    }

    resetBackground(){
        this.context.clearRect(this.startX - ((this.pixelsPerMove) * this.gameFrame), this.currPosY, this.destinationWidth + this.pixelsPerMove, this.destinationHeight)
        this.context.fillRect(this.startX - ((this.pixelsPerMove) * this.gameFrame), this.currPosY, this.destinationWidth + this.pixelsPerMove, this.destinationHeight)      
    }

    spawn(){
        if((this.stagger % this.staggerFrame) == 0 && this.currPosX > -100){
            this.resetBackground()
            this.context.drawImage(
                this.sprite, 
                this.sourcePosX + (92 * (this.gameFrame % 2)), this.sourcePosY,
                this.sourceWidth, this.sourceHeight,
                this.startX - (this.pixelsPerMove * this.gameFrame), this.currPosY,
                this.destinationWidth, this.destinationHeight
            )
            this.gameFrame++
            this.currPosX -= this.pixelsPerMove
        }
        this.stagger++
        this.stopId = window.requestAnimationFrame(this.spawn.bind(this))
    }

    stop(){
        cancelAnimationFrame(this.stopId)
    }

}
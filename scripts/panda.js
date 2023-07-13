class Panda{
    constructor(sprite){
        this.sprite = sprite
        this.currentAction = "run"
        this.sourceWidth = 73
        this.sourceHeight = 97
        this.destinationWidth = Math.round(this.sourceWidth / 3)
        this.destinationHeight = Math.round(this.sourceHeight / 3)
        this.standPosY = 100
        this.sourceCrouchWidth = 96
        this.sourceCrouchHeight = 69
        this.destinationCrouchWidth = Math.round(this.sourceCrouchWidth / 3)
        this.destinationCrouchHeight = Math.round(this.sourceCrouchHeight / 3)
        this.crouchPosY = 8
        this.currPosWidth = this.destinationWidth
        this.currPosHeight = this.destinationHeight
        this.gameFrame = 0
        this.stagger = 0
        this.staggerFrame = 4
        this.currPosX = 30
        this.currPosY = this.standPosY
        this.prevPosX = this.currPosX
        this.prevPosY = this.currPosY
        this.stopId
    }

    JUMP_INDEX = 0
    JUMP_Y_COORDS = [
        100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30,
        35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

    getContext(){
        this.canvas = document.getElementById("game")
        this.context = this.canvas.getContext("2d")
        this.context.fillStyle = "rgba(0, 0, 0, 0)"
    }

    resetBackground(){
        if (["run", "die"].includes(this.currentAction)){
            this.context.clearRect(
                this.currPosX, this.currPosY, 
                this.destinationWidth, this.destinationHeight
            )
            this.context.fillRect(
                this.currPosX, this.currPosY, 
                this.destinationWidth, this.destinationHeight
            )        
        } else if (this.currentAction == "crouch"){
            this.context.clearRect(
                this.currPosX, this.currPosY, 
                this.destinationCrouchWidth, this.destinationCrouchHeight
            )
            this.context.fillRect(
                this.currPosX, this.currPosY, 
                this.destinationCrouchWidth, this.destinationCrouchHeight
            )
        } else if (this.currentAction == "jump"){
            this.context.clearRect(
                this.currPosX, this.prevPosY, 
                this.destinationWidth, this.destinationHeight
            )
            this.context.fillRect(
                this.currPosX, this.prevPosY, 
                this.destinationWidth, this.destinationHeight
            )        
        }
    }

    move(){
        if((this.stagger % this.staggerFrame) == 0){
            if(this.currentAction == "run"){
                this.resetBackground()
                let frameX = 1507 + (7 + 73) * (this.gameFrame % 2)
                this.currPosY = this.standPosY
                this.currPosWidth = this.destinationWidth
                this.currPosHeight = this.destinationHeight
                
                this.context.drawImage(
                    this.sprite, frameX, 1, 
                    this.sourceWidth, this.sourceHeight, 
                    this.currPosX, this.currPosY, 
                    this.destinationWidth, this.destinationHeight
                )
            } else if (this.currentAction == "crouch"){
                this.resetBackground()
                
                let frameX = (this.gameFrame % 2) ? 1821 : 1926
                this.currPosY = this.standPosY + this.crouchPosY
                this.currPosWidth = this.destinationCrouchWidth
                this.currPosHeight = this.destinationCrouchHeight

                this.context.drawImage(
                    this.sprite, frameX, 26, 
                    this.sourceCrouchWidth, this.sourceCrouchHeight, 
                    this.currPosX, this.currPosY, 
                    this.destinationCrouchWidth, this.destinationCrouchHeight
                )
            } else if (this.currentAction == "jump"){
                this.resetBackground()

                this.currPosY = this.JUMP_Y_COORDS[this.JUMP_INDEX]
                let frameX = 1507 + (7 + 73) * (this.gameFrame % 2)
                this.currPosWidth = this.destinationWidth
                this.currPosHeight = this.destinationHeight

                this.context.drawImage(
                    this.sprite, frameX, 1, 
                    this.sourceWidth, this.sourceHeight, 
                    this.currPosX, this.currPosY, 
                    this.destinationWidth, this.destinationHeight
                )
                this.prevPosY = this.currPosY

                if (this.JUMP_INDEX < this.JUMP_Y_COORDS.length){
                    this.JUMP_INDEX ++ 
                } else {
                    this.JUMP_INDEX = 0
                    this.currPosY = 150
                    this.run()
                }
            } else if (this.currentAction == "die"){
                this.resetBackground()
                this.context.drawImage(
                    this.sprite, 1745, 1,
                    this.sourceWidth, this.sourceHeight,
                    this.currPosX, this.currPosY,
                    this.destinationWidth, this.destinationHeight
                )
                cancelAnimationFrame(this.stopId)
            }
            this.gameFrame++
        }
        this.stagger++
        this.stopId = window.requestAnimationFrame(this.move.bind(this))
    }

    removePanda(){
        cancelAnimationFrame(this.stopId)
        this.resetBackground()
    }

    run(){
        this.resetBackground()
        this.currentAction = "run"
    }

    crouch(){
        this.resetBackground()
        this.currentAction = "crouch"
    }

    jump(){
        this.resetBackground()
        this.currentAction = "jump"
    }

    die(){
        this.currentAction = "die"
    }

    load(){
        this.getContext()
    }
}
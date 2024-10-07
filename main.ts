enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Logo = SpriteKind.create()
    export const Arrow = SpriteKind.create()
    export const Emiko = SpriteKind.create()
    export const Ending = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const Door = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const gending = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (iframes <= 0) {
        iframes = 20
        spriteutils.jumpImpulse(mySprite, 4)
        music.play(music.createSoundEffect(WaveShape.Square, 1, 4387, 255, 0, 150, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        if (cloak1 == 1 && !(fightingBoss)) {
            sprites.destroy(otherSprite, effects.spray, 500)
            cloak1 = 0
        } else if (fightingBoss) {
            if (!(stunned)) {
                stunned = true
                music.play(music.createSoundEffect(WaveShape.Noise, 1, 4387, 255, 0, 250, SoundExpressionEffect.Warble, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                info.changeLifeBy(-4)
            }
        } else {
            info.changeLifeBy(-1)
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (endingTriggered == 0) {
        if (playing) {
            if (charm1 == 0) {
                fireball.setVelocity(0, 0)
                sprites.destroy(fireball, effects.fire, 250)
            }
            if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
                animation.runImageAnimation(
                mySprite,
                assets.animation`fireR`,
                75,
                false
                )
                music.play(music.createSoundEffect(WaveShape.Noise, 5000, 0, 255, 0, 250, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                fireball = sprites.createProjectileFromSprite(assets.image`fireball`, mySprite, 200, 16)
                fireball.scale = 1
                fireball.setFlag(SpriteFlag.DestroyOnWall, false)
                fireball.setFlag(SpriteFlag.GhostThroughWalls, true)
            } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft))) {
                animation.runImageAnimation(
                mySprite,
                assets.animation`fireL`,
                75,
                false
                )
                music.play(music.createSoundEffect(WaveShape.Noise, 5000, 0, 255, 0, 250, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                fireball = sprites.createProjectileFromSprite(assets.image`fireball`, mySprite, -200, 16)
                fireball.scale = 1
                fireball.setFlag(SpriteFlag.DestroyOnWall, false)
                fireball.setFlag(SpriteFlag.GhostThroughWalls, true)
            }
        }
    }
})
info.onLifeZero(function () {
    if (feather == 1) {
        info.setLife(8)
        feather = 0
    } else {
        color.setColor(15, color.rgb(255, 255, 255))
        game.setGameOverEffect(true, effects.none)
        game.setGameOverPlayable(true, music.createSong(assets.song`intro`), false)
        game.setGameOverMessage(true, "Game Over")
        game.gameOver(true)
    }
})
function callCredits () {
    story.startCutscene(function () {
        endingGraphics = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.gending)
        story.setPagePauseLength(1000, 1000)
        creditsCharacter(assets.animation`genyaidleR`, assets.animation`genyarunR`, "GENYA - Scimitar Bandit", "abc")
        creditsCharacter(assets.animation`nagiidleR`, assets.animation`nagirunR`, "NAGI - Dagger Bandit", "abc")
        creditsCharacter(assets.animation`yamatofireR`, assets.animation`yamatoidleR`, "YAMATO - Archer Bandit", "abc")
        creditsCharacter(assets.animation`scorpionidleR`, assets.animation`scorpionwalkR`, "SCORPION - Desert Creature", "abc")
        creditsCharacter(assets.animation`SasoriLamp`, assets.animation`SasoriLamp`, "SASORI - Defeated Genie", "abc")
        creditsCharacter(assets.animation`hinamiig`, assets.animation`hinamiig`, "HINAMI - Motherly Fire Goddess", "abc")
        creditsCharacter(assets.animation`emikoidleR`, assets.animation`emikowalkR`, "EMIKO - Human sister of...", "abc")
        creditsCharacter(assets.animation`idleR`, assets.animation`RunR`, "AKIRO", "The demigod hero of Fire Palace...")
        creditsCharacter(assets.animation`nagiidleR`, assets.animation`nagirunR`, "Now for the credits!", "abc")
        creditsCharacter(assets.animation`sabuR`, assets.animation`sabuR`, "KRIS 0520", "Programmer\\nArtist/Designer\\nWriter\\nLevel Designer\\nOriginal Idea")
        creditsCharacter(assets.animation`yasuda`, assets.animation`yasuda`, "THE TIRED GUY", "Level Designer\\nPlay Tester\\nMain Assistant")
        creditsCharacter(assets.animation`ryoheiR`, assets.animation`ryoheiR`, "PASTOR WILLY", "Level Designer\\nPlay Tester\\nCreative Ideas")
        creditsCharacter(assets.animation`nagiidleR`, assets.animation`nagirunR`, "With special thanks to...", "abc")
        creditsCharacter(assets.animation`haruR`, assets.animation`haruR`, "NEIGHBORS", "abc")
        creditsCharacter(assets.animation`nejiR`, assets.animation`nejiR`, "SANDNER", "abc")
        creditsCharacter(assets.animation`daisuke`, assets.animation`daisuke`, "JOHNSON", "abc")
        if (diddlydingus == 1) {
            creditsCharacter(assets.animation`nagiidleR`, assets.animation`nagirunR`, "AND YOU FOR PLAYING THIS GAME", "Now go play the game without debug mode, please.")
        } else {
            creditsCharacter(assets.animation`nagiidleR`, assets.animation`nagirunR`, "AND YOU FOR PLAYING THIS GAME", "abc")
        }
        endGameIG()
    })
}
function levelTransition () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    for (let value of tiles.getTilesByType(assets.tile`genyaspawn`)) {
        tiles.setTileAt(value, assets.tile`back`)
        genya = sprites.create(assets.image`genya`, SpriteKind.Enemy)
        tiles.placeOnTile(genya, value)
        genya.ay = 480
        characterAnimations.loopFrames(
        genya,
        assets.animation`genyaidleR`,
        200,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        genya,
        assets.animation`genyaidleL`,
        200,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        genya,
        assets.animation`genyarunR`,
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        genya,
        assets.animation`genyarunL`,
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        sprites.setDataNumber(genya, "health", 2)
        sprites.setDataNumber(genya, "type", 0)
    }
    for (let value of tiles.getTilesByType(assets.tile`nagispawn`)) {
        tiles.setTileAt(value, assets.tile`back`)
        nagi = sprites.create(assets.image`nagi`, SpriteKind.Enemy)
        tiles.placeOnTile(nagi, value)
        nagi.ay = 480
        characterAnimations.loopFrames(
        nagi,
        assets.animation`nagiidleR`,
        200,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        nagi,
        assets.animation`nagiidleL`,
        200,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        nagi,
        assets.animation`nagirunR`,
        50,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        nagi,
        assets.animation`nagirunL`,
        50,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        sprites.setDataNumber(nagi, "health", 1)
        sprites.setDataNumber(nagi, "type", 1)
        sprites.setDataNumber(nagi, "damage", 1)
    }
    for (let value of tiles.getTilesByType(assets.tile`yamatospawn`)) {
        tiles.setTileAt(value, assets.tile`back`)
        yamato = sprites.create(assets.image`yamato`, SpriteKind.Enemy)
        tiles.placeOnTile(yamato, value)
        yamato.ay = 480
        characterAnimations.loopFrames(
        yamato,
        assets.animation`yamatoidleR`,
        200,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        yamato,
        assets.animation`yamatoidleL`,
        200,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
        )
        sprites.setDataNumber(yamato, "health", 2)
        sprites.setDataNumber(yamato, "type", 2)
        sprites.setDataNumber(yamato, "damage", 2)
    }
    for (let value of tiles.getTilesByType(assets.tile`health`)) {
        tiles.setTileAt(value, assets.tile`back`)
        raiforusu = sprites.create(assets.image`raiforusu`, SpriteKind.Food)
        tiles.placeOnTile(raiforusu, value)
        sprites.setDataNumber(raiforusu, "item", 0)
    }
    for (let value of tiles.getTilesByType(assets.tile`feathertile`)) {
        tiles.setTileAt(value, assets.tile`back`)
        feather1 = sprites.create(assets.image`feather`, SpriteKind.Food)
        tiles.placeOnTile(feather1, value)
        sprites.setDataNumber(feather1, "item", 1)
    }
    for (let value of tiles.getTilesByType(assets.tile`shieldtile`)) {
        tiles.setTileAt(value, assets.tile`back`)
        shield = sprites.create(assets.image`shield`, SpriteKind.Food)
        tiles.placeOnTile(shield, value)
        sprites.setDataNumber(shield, "item", 2)
    }
    for (let value of tiles.getTilesByType(assets.tile`keytile`)) {
        tiles.setTileAt(value, assets.tile`back`)
        keyob = sprites.create(assets.image`key`, SpriteKind.Key)
        tiles.placeOnTile(keyob, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`charmtile`)) {
        tiles.setTileAt(value, assets.tile`back`)
        charm = sprites.create(assets.image`charm`, SpriteKind.Food)
        tiles.placeOnTile(charm, value)
        sprites.setDataNumber(charm, "item", 3)
    }
    for (let value of tiles.getTilesByType(assets.tile`cloaktile`)) {
        tiles.setTileAt(value, assets.tile`back`)
        cloak = sprites.create(assets.image`cloak`, SpriteKind.Food)
        tiles.placeOnTile(cloak, value)
        sprites.setDataNumber(cloak, "item", 4)
    }
    for (let value of tiles.getTilesByType(assets.tile`emikotile`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
        emikoSprite = sprites.create(assets.image`emikoidle`, SpriteKind.Emiko)
        tiles.placeOnTile(emikoSprite, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`scorpion`)) {
        tiles.setTileAt(value, assets.tile`back`)
        scorpion = sprites.create(assets.image`scorpionidle`, SpriteKind.Enemy)
        tiles.placeOnTile(scorpion, value)
        scorpion.ay = 480
        characterAnimations.loopFrames(
        scorpion,
        assets.animation`scorpionidleR`,
        200,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        scorpion,
        assets.animation`scorpionidleL`,
        200,
        characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        scorpion,
        assets.animation`scorpionwalkR`,
        75,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        scorpion,
        assets.animation`scorpionwalkL`,
        75,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        sprites.setDataNumber(scorpion, "health", 1)
        sprites.setDataNumber(scorpion, "type", 3)
        sprites.setDataNumber(scorpion, "damage", 1)
    }
    for (let value of tiles.getTilesByType(assets.tile`SasoriSpawn`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
        sasori = sprites.create(assets.image`stingIdle`, SpriteKind.Enemy)
        tiles.placeOnTile(sasori, value)
        sprites.setDataNumber(sasori, "health", 8)
        sprites.setDataNumber(sasori, "type", 4)
        sprites.setDataNumber(sasori, "damage", 4)
        fightingBoss = true
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`spawn`)
}
events.spriteEvent(SpriteKind.Projectile, SpriteKind.Enemy, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    if (fightingBoss) {
        if (!(stunned)) {
            stunned = true
            sprites.changeDataNumberBy(otherSprite, "health", -1)
            music.play(music.createSoundEffect(WaveShape.Noise, 971, 1, 255, 107, 2000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            sprite.setVelocity(0, 0)
            sprites.destroy(sprite, effects.fire, 250)
        }
    } else {
        if (!(sprite == yamatoarrow)) {
            sprites.changeDataNumberBy(otherSprite, "health", -1)
            spriteutils.jumpImpulse(otherSprite, 4)
            music.play(music.createSoundEffect(WaveShape.Noise, 3026, 4998, 255, 0, 125, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            sprite.setVelocity(0, 0)
            sprites.destroy(sprite, effects.fire, 250)
        }
    }
})
controller.combos.attachCombo("b+a", function () {
    if (!(playing)) {
        Copyright.setText(" Vibrant Colors On!")
        color.setColor(1, color.rgb(15, 15, 15))
        color.setColor(2, color.rgb(202, 202, 202))
        color.setColor(3, color.rgb(255, 255, 255))
        color.setColor(4, color.rgb(189, 0, 0))
        color.setColor(5, color.rgb(255, 21, 0))
        color.setColor(6, color.rgb(255, 119, 107))
        color.setColor(7, color.rgb(255, 192, 20))
        color.setColor(8, color.rgb(255, 215, 128))
        color.setColor(9, color.rgb(0, 133, 9))
        color.setColor(10, color.rgb(0, 255, 21))
        color.setColor(11, color.rgb(148, 255, 159))
        color.setColor(12, color.rgb(7, 0, 224))
        color.setColor(13, color.rgb(117, 107, 255))
        color.setColor(14, color.rgb(112, 167, 255))
        color.setColor(15, color.rgb(255, 0, 247))
    }
})
controller.combos.attachCombo("udlrba", function () {
    if (!(playing)) {
        diddlydingus = 1
        info.setLife(16)
        Copyright.setText("Debug Mode Enabled!")
        color.setColor(1, color.rgb(15, 15, 15))
        color.setColor(2, color.rgb(202, 202, 202))
        color.setColor(3, color.rgb(255, 255, 255))
        color.setColor(4, color.rgb(189, 0, 0))
        color.setColor(5, color.rgb(255, 21, 0))
        color.setColor(6, color.rgb(255, 119, 107))
        color.setColor(7, color.rgb(255, 192, 20))
        color.setColor(8, color.rgb(255, 215, 128))
        color.setColor(9, color.rgb(0, 133, 9))
        color.setColor(10, color.rgb(0, 255, 21))
        color.setColor(11, color.rgb(148, 255, 159))
        color.setColor(12, color.rgb(7, 0, 224))
        color.setColor(13, color.rgb(117, 107, 255))
        color.setColor(14, color.rgb(112, 167, 255))
        color.setColor(15, color.rgb(255, 0, 247))
    }
})
controller.combos.attachCombo("u+b+a", function () {
    if (diddlydingus == 1) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Key)
        level += -1
        nextLevel(level)
    }
})
controller.combos.attachCombo("d+b+a", function () {
    if (diddlydingus == 1) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Key)
        level += 1
        nextLevel(level)
    }
})
function creditsCharacter (idle: any[], walking: any[], name: string, role: string) {
    endingGraphics.setStayInScreen(false)
    endingGraphics.setFlag(SpriteFlag.Ghost, true)
    characterAnimations.loopFrames(
    endingGraphics,
    idle,
    75,
    characterAnimations.rule(Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    endingGraphics,
    walking,
    75,
    characterAnimations.rule(Predicate.Moving)
    )
    endingGraphics.setPosition(-64, 72)
    story.spriteMoveToLocation(endingGraphics, 80, 72, 75)
    story.spriteSayText(endingGraphics, name, 3, 0, story.TextSpeed.Normal)
    if (role != "abc") {
        story.spriteSayText(endingGraphics, role, 3, 0, story.TextSpeed.Normal)
    }
    story.spriteMoveToLocation(endingGraphics, 224, 72, 75)
}
events.wallEvent(SpriteKind.Player, events.wallCondition(assets.tile`doortile`), events.WallEvent.StartHitting, function (sprite) {
    if (keys > 0) {
        if (mySprite.tileKindAt(TileDirection.Right, assets.tile`doortile`)) {
            tiles.setWallAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right), false)
            tiles.setTileAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right), assets.tile`back`)
            keys += -1
        } else if (mySprite.tileKindAt(TileDirection.Left, assets.tile`doortile`)) {
            tiles.setWallAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left), false)
            tiles.setTileAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left), assets.tile`back`)
            keys += -1
        }
    }
})
function nextLevel (Level: number) {
    if (Level > 0 && Level < levellist.length) {
        tiles.setCurrentTilemap(levellist[Level])
    } else {
        tiles.setCurrentTilemap(tilemap`level1`)
    }
    levelTransition()
    sprites.destroy(leveltext)
    leveltext = textsprite.create("LEVEL " + convertToText(level), 1, 14)
    leveltext.setFlag(SpriteFlag.RelativeToCamera, true)
    leveltext.x = 80
    leveltext.y = 8
    sprites.destroy(hiscore)
    hiscore = textsprite.create("HISCORE:" + convertToText(info.highScore()), 1, 5)
    hiscore.setFlag(SpriteFlag.RelativeToCamera, true)
    hiscore.x = 80
    hiscore.y = 112
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (fightingBoss == true) {
        fightingBoss = false
        keys += 1
        scene.cameraShake(8, 5000)
        for (let index = 0; index < 5; index++) {
            music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            for (let index = 0; index < 5; index++) {
                scene.setBackgroundColor(3)
                timer.after(10, function () {
                    scene.setBackgroundColor(0)
                })
            }
        }
        scene.setBackgroundColor(0)
        tiles.setCurrentTilemap(tilemap`level36`)
    }
})
events.wallEvent(SpriteKind.Enemy, events.simpleWallCondition(events.WallFlag.Top), events.WallEvent.StartHitting, function (sprite) {
    if (fightingBoss) {
        stunned = true
        sprite.vy = -64
    }
})
events.tileEvent(SpriteKind.Player, assets.tile`hinamiwall1`, events.TileEvent.StartOverlapping, function (sprite) {
    tiles.setTileAt(tiles.getTileLocation(4, 5), assets.tile`transparency16`)
    story.startCutscene(function () {
        story.setPagePauseLength(1000, 1000)
        if (level < 21) {
            story.printDialog("KEEP GOING, MY SON.\\nTHERE ARE STILL PLACES YOU MUST GO.", 80, 90, 50, 150, 3, 1)
        } else {
            story.printDialog("YOU ARE NEAR.\\nRESCUE YOUR SISTER, MY SON,\\nFOR I CANNOT GO FARTHER.", 80, 90, 50, 150, 3, 1)
        }
    })
})
function endGameIG () {
    feather = 0
    info.setLife(0)
}
events.tileEvent(SpriteKind.Player, assets.tile`Spikes`, events.TileEvent.StartOverlapping, function (sprite) {
    scene.cameraShake(4, 100)
    info.changeLifeBy(-2)
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 5000, 255, 0, 350, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
})
sprites.onCreated(SpriteKind.Emiko, function (sprite) {
    endingTriggered = 1
    sprites.destroy(mySprite)
    akiroending = sprites.create(assets.image`idle`, SpriteKind.Ending)
    tiles.placeOnTile(akiroending, tiles.getTileLocation(1, 5))
    story.startCutscene(function () {
        pause(2000)
        characterAnimations.loopFrames(
        emikoSprite,
        assets.animation`emikoidleL`,
        200,
        characterAnimations.rule(Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        emikoSprite,
        assets.animation`emikowalkL`,
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        akiroending,
        assets.animation`idleR`,
        500,
        characterAnimations.rule(Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        akiroending,
        assets.animation`RunR`,
        75,
        characterAnimations.rule(Predicate.MovingRight)
        )
        pause(1000)
        story.spriteMoveToLocation(akiroending, 72, akiroending.y, 100)
        pause(1000)
        story.spriteMoveToLocation(emikoSprite, 88, emikoSprite.y, 32)
        color.FadeToBlack.startScreenEffect(3000)
        color.pauseUntilFadeDone()
        tiles.setCurrentTilemap(tilemap`title`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Ending)
        sprites.destroyAllSpritesOfKind(SpriteKind.Emiko)
        sprites.destroyAllSpritesOfKind(SpriteKind.Text)
        color.clearFadeEffect()
        story.setPagePauseLength(1000, 5000)
        story.printDialog("AFTER DEFEATING SASORI AND RESCUING HIS SISTER EMIKO,\\nAKIRO RETURNED TO THE FLAME PALACE.\\nUPON HIS RETURN, HE RECEIVED A BLESSING FROM HIS MOTHER HINAMI.\\nAKIRO WAS GRANTED HIS HUMAN FATHER'S TURBAN AND SUIT,\\nSYMBOLIZING HIS POSITION AS A HERO OF THE FLAME PALACE.", 80, 63, 110, 150, 3, 1, story.TextSpeed.Normal)
        callCredits()
    })
})
events.tileEvent(SpriteKind.Player, assets.tile`Door3`, events.TileEvent.StartOverlapping, function (sprite) {
    level += 1
    nextLevel(level)
})
events.wallEvent(SpriteKind.Enemy, events.simpleWallCondition(events.WallFlag.Bottom), events.WallEvent.StartHitting, function (sprite) {
    if (fightingBoss) {
        stunned = false
        sprite.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (endingTriggered == 0) {
        if (playing) {
            if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
                spriteutils.jumpImpulse(mySprite, 33)
                music.play(music.createSoundEffect(WaveShape.Sawtooth, 426, 674, 255, 0, 250, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
            }
        }
    }
})
events.spriteEvent(SpriteKind.Player, SpriteKind.Key, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    keys += 1
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.halo, 500)
    music.play(music.createSong(assets.song`raiforusumusic`), music.PlaybackMode.InBackground)
    info.changeScoreBy(100)
    if (sprites.readDataNumber(otherSprite, "item") == 0) {
        info.changeLifeBy(4)
    } else if (sprites.readDataNumber(otherSprite, "item") == 1) {
        feather = 1
    } else if (sprites.readDataNumber(otherSprite, "item") == 2) {
        iframes = 10
    } else if (sprites.readDataNumber(otherSprite, "item") == 3) {
        charm1 = 1
    } else {
        cloak1 = 1
    }
})
let akiroending: Sprite = null
let hiscore: TextSprite = null
let leveltext: TextSprite = null
let yamatoarrow: Sprite = null
let sasori: Sprite = null
let scorpion: Sprite = null
let emikoSprite: Sprite = null
let cloak: Sprite = null
let charm: Sprite = null
let keyob: Sprite = null
let shield: Sprite = null
let feather1: Sprite = null
let raiforusu: Sprite = null
let yamato: Sprite = null
let nagi: Sprite = null
let genya: Sprite = null
let endingGraphics: Sprite = null
let cloak1 = 0
let fireball: Sprite = null
let levellist: tiles.TileMapData[] = []
let mySprite: Sprite = null
let Copyright: TextSprite = null
let level = 0
let iframes = 0
let diddlydingus = 0
let feather = 0
let charm1 = 0
let keys = 0
let fightingBoss = false
let stunned = false
let playing = false
let endingTriggered = 0
endingTriggered = 0
playing = false
stunned = true
fightingBoss = false
keys = 0
charm1 = 0
feather = 0
diddlydingus = 0
let arrowvel = 0
let iterator = 0
game.setGameOverScoringType(game.ScoringType.HighScore)
iframes = 0
spriteutils.setLifeImage(assets.image`life`)
info.setLife(8)
info.setScore(0)
level = 0
tiles.setCurrentTilemap(tilemap`intro`)
Copyright = textsprite.create("(C) AUVIMA Software", 0, 3)
Copyright.setPosition(80, 76)
mySprite = sprites.create(assets.image`idle`, SpriteKind.Player)
characterAnimations.loopFrames(
mySprite,
assets.animation`idleR`,
500,
characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`RunR`,
75,
characterAnimations.rule(Predicate.MovingRight)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`idleL`,
500,
characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`RunL`,
75,
characterAnimations.rule(Predicate.MovingLeft)
)
mySprite.setScale(1, ScaleAnchor.Middle)
mySprite.setFlag(SpriteFlag.Ghost, true)
mySprite.setStayInScreen(false)
mySprite.x = -16
mySprite.y = 88
let intro_graphics = sprites.create(assets.image`yamato`, SpriteKind.Logo)
intro_graphics.setFlag(SpriteFlag.Ghost, true)
intro_graphics.setStayInScreen(false)
intro_graphics.x = -16
intro_graphics.y = 72
intro_graphics.vx = 100
animation.runImageAnimation(
intro_graphics,
assets.animation`Intro`,
100,
true
)
pause(2500)
mySprite.vx = 100
pause(2500)
mySprite.setFlag(SpriteFlag.Ghost, false)
mySprite.setStayInScreen(true)
mySprite.vx = 0
mySprite.setScale(0, ScaleAnchor.Middle)
sprites.destroy(intro_graphics)
let logo = sprites.create(assets.image`logo`, SpriteKind.Logo)
logo.scale = 0
for (let index = 0; index <= 9; index++) {
    logo.scale = (index + 1) / 10
    pause(10)
}
animation.runImageAnimation(
logo,
assets.animation`logoanimated`,
50,
false
)
music.setVolume(50)
music.play(music.createSong(assets.song`intro`), music.PlaybackMode.UntilDone)
tiles.setCurrentTilemap(tilemap`title`)
sprites.destroy(Copyright)
sprites.destroy(logo)
levellist = [
tilemap`level1`,
tilemap`level0`,
tilemap`level2`,
tilemap`level4`,
tilemap`level5`,
tilemap`level8`,
tilemap`level12`,
tilemap`level13`,
tilemap`level14`,
tilemap`level16`,
tilemap`level17`,
tilemap`level18`,
tilemap`level19`,
tilemap`level20`,
tilemap`level21`,
tilemap`level22`,
tilemap`level23`,
tilemap`level24`,
tilemap`level25`,
tilemap`level26`,
tilemap`level27`,
tilemap`level28`,
tilemap`level29`,
tilemap`level30`,
tilemap`level31`,
tilemap`level32`,
tilemap`level33`,
tilemap`level34`,
tilemap`level35`
]
levellist.push(tilemap`level10`)
pause(500)
nextLevel(level)
mySprite.setScale(1, ScaleAnchor.Middle)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 480
scene.cameraFollowSprite(mySprite)
fireball = sprites.createProjectileFromSprite(assets.image`fireball`, mySprite, 0, 0)
fireball.scale = 0
playing = true
game.onUpdateInterval(100, function () {
    if (iframes > 0) {
        iframes += -1
    } else {
        iframes = 0
    }
})
game.onUpdateInterval(100, function () {
    iterator += 100
    if (iterator > 3000) {
        iterator = 0
    }
})
game.onUpdate(function () {
    if (keys < 0) {
        keys = 0
    }
    if (mySprite.y >= 248) {
        tiles.placeOnRandomTile(mySprite, assets.tile`spawn`)
        info.changeLifeBy(-1)
    }
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.y >= 248 || sprites.readDataNumber(value, "health") <= 0) {
            sprites.destroy(value, effects.spray, 500)
            info.changeScoreBy(10)
        }
        if (sprites.readDataNumber(value, "type") == 0) {
            if (spriteutils.distanceBetween(mySprite, value) < 72 && (mySprite.y < value.y + 8 && mySprite.y > value.y - 8) && value.vx == 0) {
                if (mySprite.x > value.x) {
                    value.vx = 64
                } else {
                    value.vx = -64
                }
            }
        } else if (sprites.readDataNumber(value, "type") == 1) {
            if (spriteutils.distanceBetween(mySprite, value) < 160 && !(value.overlapsWith(mySprite) || mySprite.overlapsWith(value)) && (mySprite.y < value.y + 8 && mySprite.y > value.y - 8)) {
                if (mySprite.x > value.x) {
                    value.vx = 96
                } else {
                    value.vx = -96
                }
            }
        } else if (sprites.readDataNumber(value, "type") == 2) {
            if (mySprite.x < value.x) {
                characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingLeft))
                arrowvel = -96
            } else {
                characterAnimations.setCharacterState(value, characterAnimations.rule(Predicate.FacingRight))
                arrowvel = 96
            }
            if (iterator + 800 == 3000) {
                if (characterAnimations.matchesRule(value, characterAnimations.rule(Predicate.FacingLeft))) {
                    animation.runImageAnimation(
                    value,
                    assets.animation`yamatofireL`,
                    100,
                    false
                    )
                } else if (characterAnimations.matchesRule(value, characterAnimations.rule(Predicate.FacingRight))) {
                    animation.runImageAnimation(
                    value,
                    assets.animation`yamatofireR`,
                    100,
                    false
                    )
                }
            } else if (iterator == 3000) {
                iterator = 0
                yamatoarrow = sprites.create(assets.image`arrow`, SpriteKind.Enemy)
                if (yamatoarrow.vx == 0) {
                    yamatoarrow.setPosition(value.x, value.y)
                    yamatoarrow.setVelocity(arrowvel, 0)
                    yamatoarrow.setFlag(SpriteFlag.DestroyOnWall, true)
                }
            }
        } else if (sprites.readDataNumber(value, "type") == 3) {
            if (spriteutils.distanceBetween(mySprite, value) < 160 && !(value.overlapsWith(mySprite) || mySprite.overlapsWith(value)) && (mySprite.y < value.y + 8 && mySprite.y > value.y - 8)) {
                if (mySprite.x > value.x) {
                    value.vx = 16
                } else {
                    value.vx = -16
                }
            }
        } else if (sprites.readDataNumber(value, "type") == 4) {
            if (stunned) {
                value.vy = -64
                if (mySprite.x > value.x) {
                    value.vx = 128
                } else {
                    value.vx = -128
                }
            }
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (fightingBoss) {
        stunned = false
        sasori.vy = 256
        sasori.vx = 0
    }
})

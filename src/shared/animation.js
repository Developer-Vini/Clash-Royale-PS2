function animationSprite(image) {
    const {
        totalFrames,
        fps = 12,
        frameWidth,
        frameHeight,
        loop = true,
        scale = 1,
        startFrame = 0,
        endFrame = totalFrames - 1,
        facingLeft = false,
        onAnimationEnd,
        framesPerRow
    } = image;

    if (image.currentFrame === undefined) image.currentFrame = startFrame;
    if (image.frameTimer === undefined) image.frameTimer = 0;
    if (image.lastUpdate === undefined) image.lastUpdate = Date.now();

    const now = Date.now();
    let deltaTime;
    
    if (image.deltaTime !== undefined) {
        deltaTime = image.deltaTime * 1000;
    } else {
        deltaTime = now - image.lastUpdate;
    }
    
    image.lastUpdate = now;

    const frameTime = 1000 / fps;
    image.frameTimer += deltaTime;

    if (image.frameTimer >= frameTime) {
        const framesToAdvance = Math.floor(image.frameTimer / frameTime);
        image.currentFrame += framesToAdvance;
        image.frameTimer -= framesToAdvance * frameTime;

        if (image.currentFrame > endFrame) {
            if (loop) {
                image.currentFrame = startFrame + ((image.currentFrame - startFrame) % (endFrame - startFrame + 1));
            } else {
                image.currentFrame = endFrame;
                onAnimationEnd?.();
            }
        }
    }

    const frameIndex = image.currentFrame;
    
    image.width = frameWidth * scale;
    image.height = frameHeight * scale;
    
    const row = framesPerRow ? Math.floor(frameIndex / framesPerRow) : 0;
    const col = framesPerRow ? frameIndex % framesPerRow : frameIndex;
    
    if (facingLeft) {
        image.startx = (col + 1) * frameWidth;
        image.endx = col * frameWidth;
    } else {
        image.startx = col * frameWidth;
        image.endx = image.startx + frameWidth;
    }
    
    image.starty = row * frameHeight;
    image.endy = image.starty + frameHeight;
}

function setAnimation(image, name, loop = true) {
    const anim = image.animations[name];
    if (!anim) return;
    image.startFrame = anim.start;
    image.endFrame = anim.end;
    image.currentFrame = anim.start;
    image.loop = loop;
    image.frameTimer = 0;
}


export {
    animationSprite,
    setAnimation
}
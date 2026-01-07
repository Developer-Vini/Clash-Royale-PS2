function animationHorizontalSprite(image) {
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
        onAnimationEnd
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
    
    if (facingLeft) {
        image.startx = (frameIndex + 1) * frameWidth;
        image.endx = frameIndex * frameWidth;
    } else {
        image.startx = frameIndex * frameWidth;
        image.endx = image.startx + frameWidth;
    }
    
    image.starty = 0;
    image.endy = frameHeight;
}

export {
    animationHorizontalSprite
}
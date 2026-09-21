gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("frames-canvas");
const ctx = canvas.getContext("2d");

const frameCount = 270;
const images = [];

const frameObject = 
{
    frame: 0 
};

      /* adding spiderman img */ 
      
const spiderImage = new Image();
spiderImage.src = "spiderman.png";

     /* reveal setting */ 
     
let revealActive = false;

let revealX = 0;
let revealY = 0;

const revealRadius = 80;


 function updateTochAction() 
 {
     const currentFrame = Math.round(frameObject.frame) + 1;
     
     if (currentFrame === 270) 
     {
         canvas.style.touchAction = "none";
     }
     else
     {
         canvas.style.touchAction = "pan-y";
     }
     
     
 }

          /* load frames */


for (let i=1; i <= frameCount; i++ )
    {
        const img = new Image();

        // linking all frames

        img.src = `frames-270/frame-${i}.png`;

        images.push(img);
    }





            /* draw frames */

function drawFrame()
{
    const img = images[Math.round(frameObject.frame)];

    if (!img || !img.complete || img.naturalWidth === 0)
    {
        return ;
    }
    
    updateTochAction();



ctx.clearRect
(
    0,
    0,
    canvas.width,
    canvas.height
);


const imageRatio = img.naturalWidth / img.naturalHeight;

/* keep the imge larger */

const currentFrame = Math.round( frameObject.frame ) + 1;

let height;
let y;

if(currentFrame >= 1 && currentFrame <= 166) 
{
    height = 848 ;
    y = -50;
}
else
{
    height = 600;
    y = 0;
}

const width = height * imageRatio;

const x = ( canvas.width - width ) / 2;

/* const y = 0; */



ctx.drawImage
(
    img,
    x,
    y,
    width,
    height
);


if
(
   
    currentFrame === 270 &&   
    revealActive && 
    spiderImage.complete &&
    spiderImage.naturalWidth > 0
) 

{


         /* removing frame on toch */

    ctx.save();
    
    ctx.globalCompositeOperation = "destination-out";
    
    ctx.beginPath();
    
    ctx.arc
    (
        revealX ,
        revealY ,
        revealRadius ,
        0 ,
        Math.PI * 2
    );
    
    ctx.fill();
    
    ctx.restore();
    
 /* show spiderman inside the same area */
 
     ctx.save();
     
     ctx.beginPath();
     
     ctx.arc
     (
        revealX ,
        revealY ,
        revealRadius ,
        0 ,
        Math.PI * 2
     );
    
    ctx.clip();
    
   /* spiderman img size and position */
    const spiderHeight = 1000/* 1500 */ ;
    const spiderWidth = spiderHeight * ( spiderImage.naturalWidth / spiderImage.naturalHeight);
    
    const spiderX = -100/* -350 */;
    const spiderY = 0/* -200 */;
    
    /* draw spiderimage */
    
     ctx.drawImage
     (
         spiderImage,
         spiderX,
         spiderY,
         spiderWidth,
         spiderHeight 
     );

   ctx.restore();
    
}

}


                    /* canvas size */

function resizeCanvas()
{
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    drawFrame();
}


window.addEventListener("resize" , resizeCanvas);

    /* on touch reviling spiderman */
    
canvas.addEventListener
(
    "touchstart" ,
    function (event) 
    {
        const currentFrame = Math.round(frameObject.frame) + 1;
        
        if
        (
           
            currentFrame !== 270
        ) 
        {
            return;
        }
        
        
               
        const touch = event.touches[0];
        
        const rect = canvas.getBoundingClientRect();
        
        revealX = touch.clientX - rect.left;
        
        revealY = touch.clientY - rect.top;
        
        revealActive = true;
        
        drawFrame();
    } ,
    {
        passive: false
    }
);


            /* touch move */
            
canvas.addEventListener
(
    "touchmove" ,
    function (event) 
    {
        const currentFrame = Math.round(frameObject.frame) + 1;
        
        if
        (
           
            currentFrame !== 270
        ) 
        {
            return;
        }
        
       
        
        const touch = event.touches[0];
        
        const rect = canvas.getBoundingClientRect();
        
        revealX = touch.clientX - rect.left;
        
        revealY = touch.clientY - rect.top;
        
        revealActive = true;
        
        drawFrame();
    } ,
    
    {
        passive: false
    }
);


            /* touch ends */
           
canvas.addEventListener
(
    "touchend" ,
    function ()
    {
        revealActive = false;
        
        drawFrame();
    }
    
);


        




         /* wait for the frist img */

images[0].onload = () =>
{

    resizeCanvas();

    drawFrame();

    /* gsap scroll animation */

    gsap.to( frameObject ,
        {
           frame: frameCount - 1,

           ease: "none",

           scrollTrigger:
           {
             trigger: ".scroll-snaper",

             scroller: ".hero-section",
             
             start: "top top",

             end: "bottom bottom",

             scrub: true

           }, 

           onUpdate: drawFrame
        }
    );

};

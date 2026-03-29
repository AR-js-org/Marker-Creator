export class ArPatternFile {
    private static sharedCanvas: HTMLCanvasElement = document.createElement('canvas');
    private static sharedContext: CanvasRenderingContext2D | null = ArPatternFile.sharedCanvas.getContext('2d');

    constructor() {

    }

    static toCanvas (patternFileString: string, onComplete: Function){
        console.assert(false, 'not yet implemented')
    }

    static encodeImageURL(imageURL: string, onComplete: Function){
        const image = new Image;
        image.onload = function(){
            const patternFileString = ArPatternFile.encodeImage(image);
            onComplete(patternFileString)
        }
        image.src = imageURL;
    }

    static encodeImage(image: any){
        const canvas = ArPatternFile.sharedCanvas;
        const context = ArPatternFile.sharedContext;
        if (!context) return '';
        
        canvas.width = 16;
        canvas.height = 16;

        let patternFileString = '';
        for(let orientation = 0; orientation > -2*Math.PI; orientation -= Math.PI/2){
            context.save();
            context.clearRect(0,0,canvas.width,canvas.height);
            context.translate(canvas.width/2,canvas.height/2);
            context.rotate(orientation);
            context.drawImage(image, -canvas.width/2,-canvas.height/2, canvas.width, canvas.height);
            context.restore();

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            if( orientation !== 0 )	patternFileString += '\n'
            for(let channelOffset = 2; channelOffset >= 0; channelOffset--){
                for(let y = 0; y < imageData.height; y++){
                    for(let x = 0; x < imageData.width; x++){

                        if( x !== 0 ) patternFileString += ' '

                        const offset = (y * imageData.width * 4) + (x * 4) + channelOffset;
                        const value = imageData.data[offset];

                        patternFileString += String(value).padStart(3);
                    }
                    patternFileString += '\n'
                }
            }
        }

        return patternFileString
    }

    static triggerDownload(patternFileString: string, fileName = 'pattern-marker.patt'){
        const domElement = window.document.createElement('a');
        domElement.href = window.URL.createObjectURL(new Blob([patternFileString], {type: 'text/plain'}));
        domElement.download = fileName;
        document.body.appendChild(domElement)
        domElement.click();
        document.body.removeChild(domElement)
    }

    static buildFullMarker(innerImageURL: string, pattRatio: number, size: number, color: string, onComplete: Function){
        const whiteMargin = 0.1;
        const blackMargin = (1 - 2 * whiteMargin) * ((1 - pattRatio) / 2);
        const innerMargin = whiteMargin + blackMargin;

        const canvas = ArPatternFile.sharedCanvas;
        const context = ArPatternFile.sharedContext;
        if (!context) return;
        
        canvas.width = canvas.height = size

        context.fillStyle = 'white';
        context.fillRect(0,0,canvas.width, canvas.height)

        context.fillStyle = color;
        context.fillRect(
            whiteMargin * canvas.width,
            whiteMargin * canvas.height,
            canvas.width * (1-2*whiteMargin),
            canvas.height * (1-2*whiteMargin)
        );

        context.fillStyle = 'white';
        context.fillRect(
            innerMargin * canvas.width,
            innerMargin * canvas.height,
            canvas.width * (1-2*innerMargin),
            canvas.height * (1-2*innerMargin)
        );

        const innerImage = document.createElement('img');
        innerImage.addEventListener('load', function(){
            context.drawImage(innerImage,
                innerMargin * canvas.width,
                innerMargin * canvas.height,
                canvas.width * (1-2*innerMargin),
                canvas.height * (1-2*innerMargin)
            );

            const imageUrl = canvas.toDataURL();
            onComplete(imageUrl)
        })
        innerImage.src = innerImageURL
    }

}
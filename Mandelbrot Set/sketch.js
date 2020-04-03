/*
Set of complex numbers c for which function
fc(z) = z^2+c does not diverge when iterated from z = 0 i.e. for sequence
fc(0),fc(fc(0)),.. remain bounded in absolute value
*/

var minVal;
var maxVal;
function setup() {
    creatCanvas(360, 360);
    pixelDensity(1);
    // createSlider(start,end,initial,stepSize)
    createP("Min :");
    minVal = createSlider(-2.5, 0, -2.5, 0.01);
    createP("Max :");
    maxVal = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {
    background(51);
    var maxIterations = 100;
    var min = minVal.value();
    var max = maxVal.value();
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var a = map(x, 0, width, min, max);
            var b = map(y, 0, height, min, max);

            var ca = a;
            var cb = b;

            var n = 0;
            var z = 0;
            while (n < maxIterations) {
                // For square of complex number
                var anew = a * a - b * b;
                var bnew = 2 * a * b;

                a = anew + ca;
                b = bnew + cb;

                if (abs(a + b) > 16)
                    break;
                n++;
            }

            // var bright = map(n,0,maxIterations,0,255);
            var bright = map(n, 0, maxIterations, 0, 1);
            bright = map(sqrt(bright), 0, 1, 0, 255);

            // var bright = 200; 
            if (n == maxIterations)
                bright = 0;

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = bright; // Red
            pixels[pix + 1] = bright; // Green
            pixels[pix + 2] = bright; // Blue
            pixels[pix + 3] = 255; // Saturation
        }
    }
    updatePixels();
}
/*
Adjusting range for zoom
Colors

*/
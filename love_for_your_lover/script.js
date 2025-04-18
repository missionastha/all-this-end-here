(function () {
    var canvas = $('#canvas');

    if (!canvas[0].getContext) {
        $("#error").show();
        return false;
    }

    var width = canvas.width();
    var height = canvas.height();
    canvas.attr("width", width);
    canvas.attr("height", height);

    var opts = {
        seed: {
            x: width / 2 - 20,
            color: "rgb(190, 26, 37)",
            scale: 2
        },
        branch: [
            [535, 680, 570, 250, 500, 200, 30, 100, [
                [540, 500, 455, 417, 340, 400, 13, 100, [
                    [450, 435, 434, 430, 394, 395, 2, 40]
                ]],
                [550, 445, 600, 356, 680, 345, 12, 100, [
                    [578, 400, 648, 409, 661, 426, 3, 80]
                ]],
                [539, 281, 537, 248, 534, 217, 3, 40],
                [546, 397, 413, 247, 328, 244, 9, 80, [
                    [427, 286, 383, 253, 371, 205, 2, 40],
                    [498, 345, 435, 315, 395, 330, 4, 60]
                ]],
                [546, 357, 608, 252, 678, 221, 6, 100, [
                    [590, 293, 646, 277, 648, 271, 2, 80]
                ]]
            ]]
        ],
        bloom: {
            num: 700,
            width: 1080,
            height: 650,
        },
        footer: {
            width: 1200,
            height: 5,
            speed: 10,
        }
    };

    var tree = new Tree(canvas[0], width, height, opts);
    var seed = tree.seed;
    var foot = tree.footer;
    var hold = 1;

    canvas.click(function (e) {
        var offset = canvas.offset(), x, y;
        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
        if (seed.hover(x, y)) {
            hold = 0;
            canvas.unbind("click");
            canvas.unbind("mousemove");
            canvas.removeClass('hand');
        }
    }).mousemove(function (e) {
        var offset = canvas.offset(), x, y;
        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
        canvas.toggleClass('hand', seed.hover(x, y));
    });

    var animateTree = eval(Jscex.compile("async", function () {
        $await(seedAnimate());
        $await(growAnimate());
        $await(flowAnimate());
        $await(moveAnimate());
        textAnimate().start();
        $await(jumpAnimate());
    }));

    animateTree().start();
})();

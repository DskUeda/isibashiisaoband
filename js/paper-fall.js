var Paper = Paper || {};

/* 設定 */
Paper.conf = {};

Paper.init = function (id, max, size, color, alpha ) {
    Paper.conf.size  = size;    // 紙ふぶきのサイズ
    Paper.conf.color = color;   // 紙ふぶきの色
    Paper.conf.alpha = alpha;   // 紙ふぶきの透過
    Paper.conf.max   = max;     // 紙ふぶきの最大数
    Paper.conf.array = [];      // 紙ふぶきオブジェクト格納配列
    Paper.conf.cvs   = document.getElementById(id);         // canvas要素の取得
    Paper.conf.stageWidth  = $(Paper.conf.cvs).width();     // ステージ幅
    Paper.conf.stageHeight = $(Paper.conf.cvs).height();    // ステージ高
    Paper.conf.flag  = true;     // リサイズフラグ
    /* 実行は onload でページレンダリングが完了してから */
    $(window).on( 'load', function () { Paper.load(); });
    /* リサイズ時の挙動 */
    $(window).on( 'resize', function () {
        Paper.conf.flag = true;
        Paper.conf.stageWidth = $(Paper.conf.cvs).width();
        Paper.conf.stageHeight = $(Paper.conf.cvs).height();
    });
};

/* 実行 */
Paper.load = function () {
    Paper.conf.cvs.width = Paper.conf.stageWidth;
    Paper.conf.cvs.height = Paper.conf.stageHeight;
    Paper.conf.ctx = Paper.conf.cvs.getContext("2d");
    Paper.conf.ctx.fillStyle = "#ffffff";
    Paper.conf.ctx.fillRect(0, 0, Paper.conf.cvs.width, Paper.conf.cvs.height);

    /* 紙ふぶきオブジェクトの作成 */
    for (var i = 0; i < Paper.conf.max; i++) {
        var paper = new Paper.paperfall( Paper.conf.size + Math.floor(Math.random() * 5));
        paper.x = Math.random() * Paper.conf.stageWidth;
        paper.y = Math.random() * Paper.conf.stageHeight;

        Paper.conf.ctx.fillStyle = "#" + paper._r + paper._g + paper._b;
        Paper.conf.ctx.fillRect(paper.x, paper.y, paper.SIZE, paper.SIZE);
        Paper.conf.array.push(paper);
    }
    setInterval(Paper.frame, 30);
};

Paper.getRNFR = function (min, max) {
    var rand = min + Math.floor(Math.random() * (max - min));
    return rand;
};

Paper.paperfall = function (_size) {
    this.SIZE = _size;
    this.x = 0;
    this.y = 0;
    this.alpha = Paper.conf.alpha;

    var t = Math.random() * Math.PI * 2;
    var r = Math.floor((1 + Math.cos(t)) * 255.9999);
    var g = Math.floor((1 + Math.cos(t + Math.PI * 2 / 3)) * 255.9999);
    var b = Math.floor((1 + Math.cos(t - Math.PI * 2 / 3)) * 255.9999);
    var colorData = Paper.conf.color[Paper.getRNFR(0, Paper.conf.color.length)];

    this._r = colorData.r;
    this._g = colorData.g;
    this._b = colorData.b;
    this._backColor = 0x010101 * Math.floor(127 + Math.random() * 64);
    this._omega = (Math.random() * 2 - 1) * Math.PI / 4;
    this._fallTheta = 0;
    this._fallSpeed = 1 + Math.random() * 2;

    this._theta = Math.random() * Math.PI * 2;
    this._Ax = 1;
    this._Ay = Math.random();
    this._Az = Math.random() * 2 - 1;
    var _l = Math.sqrt(this._Ax * this._Ax + this._Ay * this._Ay + this._Az * this._Az);
    this._Ax /= _l;
    this._Ay /= _l;
    this._Az /= _l;
    var _s = Math.sqrt(this._Ax * this._Ax + this._Ay * this._Ay);
    if (_s === 0) { // then A == ( 0, 0, -1 );
        this._Bx = 1.0;
        this._By = 0.0;
        this._Bz = 0.0;
        this._Cx = 0.0;
        this._Cy = 1.0;
        this._Cz = 0.0;
    } else {
        this._Bx = this._Ay;
        this._By = -this._Ax;
        this._Bz = 0;
        this._Cx = this._Ax * this._Az;
        this._Cy = this._Ay * this._Az;
        this._Cz = -(_s * _s);
        this._Bx /= _s;
        this._By /= _s;
        this._Cx /= _s * _l;
        this._Cy /= _s * _l;
        this._Cz /= _s * _l;
    }
};

Paper.paperfall.prototype = {
    get rotation3D() {
        return this._theta - (Math.PI * 2) * Math.floor(this._theta / (Math.PI * 2));
    },
    set rotation3D(theta) {
        this._theta = theta - (Math.PI * 2) * Math.floor(theta / (Math.PI * 2));
        var _cos = Math.cos(this._theta);
        var _sin = Math.sin(this._theta);

        // vector F is the rotated image of (1,0,0);
        var _Fx = this._Ax * this._Ax + (this._Bx * this._Bx + this._Cx * this._Cx) * _cos;
        var _Fy = this._Ax * this._Ay + (this._Bx * this._By + this._Cx * this._Cy) * _cos + (this._Bx * this._Cy - this._Cx * this._By) * _sin;
        var _Fz = this._Ax * this._Az + (this._Bx * this._Bz + this._Cx * this._Cz) * _cos - (this._Bx * this._Cz - this._Cx * this._Bz) * _sin;
        // vector G is the rotated image of (0,1,0);
        var _Gx = this._Ax * this._Ay + (this._By * this._Bx + this._Cy * this._Cz) * _cos + (this._By * this._Cx - this._Cy * this._Bx) * _sin;
        var _Gy = this._Ay * this._Ay + (this._By * this._By + this._Cy * this._Cy) * _cos;
        var _Gz = this._Ay * this._Az + (this._By * this._Bz + this._Cy * this._Cz) * _cos + (this._By * this._Cz - this._Cy * this._Bz) * _sin;

        // アルファ設定を加えたフィルスタイル
        Paper.conf.ctx.fillStyle = 'rgba('+this._r+', '+this._g+', '+this._b+', '+this.alpha+')';
        //Paper.conf.ctx.fillStyle = 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';

        Paper.conf.ctx.beginPath();
        Paper.conf.ctx.lineTo(this.x + -_Fx * this.SIZE / 2 + _Gx * this.SIZE / 2, this.y + -_Fy * this.SIZE / 2 + _Gy * this.SIZE / 2);
        Paper.conf.ctx.lineTo(this.x + -_Fx * this.SIZE / 2 - _Gx * this.SIZE / 2, this.y + -_Fy * this.SIZE / 2 - _Gy * this.SIZE / 2);
        Paper.conf.ctx.lineTo(this.x + _Fx * this.SIZE / 2 - _Gx * this.SIZE / 2, this.y + _Fy * this.SIZE / 2 - _Gy * this.SIZE / 2);
        Paper.conf.ctx.lineTo(this.x + _Fx * this.SIZE / 2 + _Gx * this.SIZE / 2, this.y + _Fy * this.SIZE / 2 + _Gy * this.SIZE / 2);
        Paper.conf.ctx.closePath();
        Paper.conf.ctx.fill();
    },
    fall: function () {
        this.rotation3D = this.rotation3D + this._omega;

        this.x += this._fallSpeed * Math.sin(this._fallTheta);
        this.y += this._fallSpeed * Math.cos(this._fallTheta);
        this._fallTheta += (Math.random() * 2 - 1) * Math.PI / 12;
        if (this._fallTheta < -Math.PI / 2) {
            this._fallTheta = -Math.PI - this._fallTheta;
        }
        if (this._fallTheta > Math.PI / 2) {
            this._fallTheta = Math.PI - this._fallTheta;
        }
    }
};

Paper.frame = function () {
    if (Paper.conf.flag) {
        Paper.conf.flag = false;
        Paper.conf.cvs.width = Paper.conf.stageWidth;
        Paper.conf.cvs.height = Paper.conf.stageHeight;
    }
    Paper.conf.ctx.clearRect(0, 0, Paper.conf.stageWidth, Paper.conf.stageHeight);

    //表示更新
    for (i = 0; i < Paper.conf.max; ++i) {
        if (Paper.conf.array[i].y > 0) {
            var par = Paper.conf.array[i].y / Paper.conf.stageHeight;
            par = 1 - par;

            Paper.conf.array[i].alpha = par;
        }

        if (Paper.conf.array[i].x - Paper.conf.array[i].SIZE / Math.SQRT2 > Paper.conf.stageWidth) {
            Paper.conf.array[i].x -= Paper.conf.stageWidth;
        }
        if (Paper.conf.array[i].x + Paper.conf.array[i].SIZE / Math.SQRT2 < 0) {
            Paper.conf.array[i].x += Paper.conf.stageWidth;
        }
        if (Paper.conf.array[i].y - Paper.conf.array[i].SIZE / Math.SQRT2 > Paper.conf.stageHeight) {
            Paper.conf.array[i].y -= Paper.conf.stageHeight;
        }

        Paper.conf.array[i].fall();
    }
};
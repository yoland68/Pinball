
// YOU WILL NEED TO REPLACE THE BELOW METHODS WITH THE ONES YOU HAVE IMPLEMENTED.

function Matrix4x4() {
if (arguments.length == 4){
      this.matrix = [arguments[0], arguments[1], arguments[2], arguments[3]];
    } else if (arguments.length = 1) {
      this.matrix = arguments[0];
    }
    else{
      this.matrix = [[],[],[],[]];
    }
  

    this.identity = function() {
      this.matrix = 
      [[1.0,0.0,0.0,0.0], 
      [0.0,1.0,0.0,0.0],
      [0.0,0.0,1.0,0.0],
      [0.0,0.0,0.0,1.0]];
    };

    this.translate = function(a,b,c){
      var translateMatrix = [[1,0,0,a], [0,1,0,b],[0,0,1,c],[0,0,0,1]];
      this.multiplity(translateMatrix);
    };

    this.rotateX = function(a){
      var rotateMatrix = [[1,0,0,0],[0,Math.cos(a),-Math.sin(a),0],[0,Math.sin(a),Math.cos(a),0],[0,0,0,1]];
      // console.log(rotateMatrix);
      this.multiplity(rotateMatrix);
    };

    this.rotateY = function(a){
      var rotateMatrix = [[Math.cos(a),0,Math.sin(a),0], [0,1,0,0],[-Math.sin(a),0,Math.cos(a),0],[0,0,0,1]];
      this.multiplity(rotateMatrix);
    }

    this.rotateZ = function(a){
      var rotateMatrix = [[Math.cos(a),-Math.sin(a),0,0], [Math.sin(a),Math.cos(a),0,0],[0,0,1,0],[0,0,0,1]];
      this.multiplity(rotateMatrix);
    }

    this.scale = function(a){
      var scaler = [[a,0,0,0], [0,a,0,0], [0,0,a,0],[0,0,0,1]];
      this.multiplity(scaler);
    }

    this.transform = function(point) {
        var result = []
        if (point.length != 4)
          point = [point[0], point[1], point[2], 1];
        for (var i = 0; i < point.length; i++) {
            var add = this.matrix[i][0]*point[0]+this.matrix[i][1]*point[1]+this.matrix[i][2]*point[2]+this.matrix[i][3]*point[3];
            result.push(add);
        }
        return result;

   }

   this.multiplity = function(matB){
    // console.log(this.matrix);
    var tmp = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (var i = 0; i < 4; i++) {
      for (var j=0; j < 4; j++) {
        tmp[i][j] = this.matrix[i][0]*matB[0][j]+this.matrix[i][1]*matB[1][j]+this.matrix[i][2]*matB[2][j]+this.matrix[i][3]*matB[3][j];
      }
    }
    // console.log(tmp)
    for (var i = 0; i < this.matrix.length; i++) {
      for (var j = 0; j < this.matrix[0].length; j++) {
        this.matrix[i][j] = tmp[i][j];
        // console.log(this.matrix[i][j]);
      }
    }
  };
};

var m = new Matrix4x4();

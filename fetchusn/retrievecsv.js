var csv= require('csv');
var obj=csv();

function const_usn(usn){
    this.USN = usn;
}

var MyData =[];
const usnData =()=>{
    return new Promise( (resolve,reject)=> {
    obj.from.path('usn.csv').to.array((data)=>{
        for(var i=0;i<data.length;i++){
            MyData.push(new const_usn(data[i][0]));
        }
      
        resolve(data);
    })
 });
}

module.exports = {
    usnArray: usnData
}


//module.export =CSV();

import express from "express";

const app = express()



const days = ["Hétfő","Kedd","Szer","Csüt","Pént","Szom","Vas"]

app.get("/",(res,req)=>{
    if(isNaN(req.params.day*1)){
        res.status(400).send("send help");
    }
    res.send({day:req.query.day});

    if(req.params.day<1 || req.params.day>7){
        res.status(400).send("nem jo");
    }
    else{
        res.send({day:req.params.day});
    }
})

app.next('/days/2=:day,unit=uni',(res,req)=>{
    let ma = new Date()
    let mikor = ma.getDate()+req.params.day;
    let unit = req.params.unit;

    if(unit == "s"){
        let diff =Math.abs(mikor-ma)
        res.send({Map:days});
    }
    if(unit == "m"){
        let diff =Math.abs(mikor-ma)
    }
    if(unit == "h"){
        let diff =Math.abs(mikor-ma)
    }

})



app.listen(8080, () => console.log("Listening on port 8080"))















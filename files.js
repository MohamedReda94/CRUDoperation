//const fs=require('fs')

//creat methode 1

// fs.appendFile('myfile1.txt','helloworld',function(err){
//     if(err) console.log(err)
//     else console.log("saved")
// })

// creat methode 2// 

// fs.writeFile('myfile2.txt','helloworld',function(err){
//      if(err) console.log(err)
//      else console.log("saved")
//  })

// delete file

// fs.unlink('myfile2.txt',function(err){
//     if(err) console.log(err)
//     else console.log(deleted)
// })

// rename file

// fs.rename('myfile1.txt','myfile.txt',function(err){
//     if(err) console.log(err)
//     else console.log("filenameupdaed")
// })


//upload

import {IncomingForm} from'formidable';
import http from 'http';
import fs from 'fs';
http.createServer(function(req,res){
    if(req.url=='/fileupload'){
        let form=new IncomingForm();
        form.parse(req,function(err,fields,files){
            let oldpath = files.filetoupload[0].filepath;
            let newpath = './' +files.filetoupload[0].originalFilename;
            fs.rename(oldpath,newpath,function(err){
                if(err) throw err;
                res.write('file uploade and moved')
                res.end();
            });
        });
    }else{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<form action="fileupload" method="post" enctype"multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
    }
}).listen(8000)
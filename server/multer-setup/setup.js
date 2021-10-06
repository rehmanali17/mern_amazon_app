const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + '-'+ Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req,file, cb)=>{
        const filter = /csv/
        const extCheck = filter.test(path.extname(file.originalname).toLowerCase())
        if(extCheck){
            cb(null,true)
        }else{
            cb("Only csv files are allowed")
        }
    }
}).single('storeFile')

module.exports = upload
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const { Test } = require('../model/imageModel')







const showPage = async (req, res) => {
    const allImage = await Test.find()



    res.render('index', { allImage: allImage })
}


const uploadImage = (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {

        var oldpath = files.image[0].filepath;
        var newpath = path.join(__dirname, '../', 'public', 'images', files.image[0].originalFilename)

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;

            res.end();
        });
        res.redirect('/')
        const test = new Test({ imageName: files.image[0].originalFilename })
        test.save()

    });
}



module.exports = {
    showPage,
    uploadImage,
}



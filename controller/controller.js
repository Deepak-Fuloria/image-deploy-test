const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const { Test } = require('../model/imageModel')







const showPage = async (req, res) => {
    const allImage = await Test.find()



    res.render('index', { allImage: allImage })
}


// const uploadImage = (req, res) => {

//     var form = new formidable.IncomingForm();
//     uploadDir: path.join(__dirname, '../public', 'images', 'temp'),
//         form.parse(req, async (err, fields, files) => {

//             var oldpath = files.image[0].filepath;
//             var newpath = path.join(__dirname, '../public', 'images', files.image[0].originalFilename);

//             fs.rename(oldpath, newpath, function (err) {

//                 if (err) throw err;
//                 res.end();
//             });


//             const test = new Test({ imageName: files.image[0].originalFilename })
//             test.save()

//             res.redirect('/')

//         });
// }

const uploadImage = (req, res) => {
    const form = new formidable.IncomingForm({
        uploadDir: path.join(__dirname, '../public', 'images', 'temp'),
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Form parsing error:', err);
            return res.status(500).send('Error while processing form.');
        }

        var oldpath = files.image[0].filepath;
        const newpath = path.join(__dirname, '../public', 'images', files.image[0].originalFilename);

        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                console.error('File rename error:', err);
                return res.status(500).send('Error while renaming file.');
            }

            const test = new Test({ imageName: files.image[0].originalFilename });
            test.save()
            res.redirect('/');
        });
    });
};




module.exports = {
    showPage,
    uploadImage,
}



const express = require('express');
const ProductBL = require('../Models/ProductBL')
const uplodaMiddleware = require('../Middlewares/uploadImage');


const router = express.Router();

router.route('/').get((req,res)=>
{
    try{
        ProductBL.GetAll().then(data => {
            res.send(data);
        });
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"});   
    }
   
})

router.route('/:id').get((req,res)=>
{
    let id = req.params.id
    ProductBL.GetProduct(id).then(data =>
        {
            res.send(data);
        })
})

router.route('/').post(uplodaMiddleware.array("ProductImage"),(req,res)=>
{
    try{
        let images = req.files.map(x => x.path);
        let obj = req.body;
         ProductBL.CreateProduct(obj,images).then(data =>
        {
            res.status(200).send(data);
        });  
    }
    catch
    {
        res.status(401).send("The File Is Not Support! Or Something went wrong during the process");    
    }
});

router.route('/:id').put((req,res)=>{
    try{
        let id = req.params.id;
        let obj = req.body;
        ProductBL.UpdateProduct(id,obj).then(data =>
            {
                res.send(data);
            });
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
    
});

router.route('/:id').delete((req,res)=>
{
    try{
        let id = req.params.id;
        ProductBL.DeleteProduct(id).then(data =>
            {
                res.send(data);
            });
    }
    catch
    {
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
   
});

router.route('/saller/:id').get((req,res)=>
{
    try{
        let id = req.params.id;
        ProductBL.GetSallerProducts(id).then(data =>
            {
                res.send(data);
            });
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
});

router.route('/saller/:id').delete((req,res)=>
{
    let id = req.params.id;
    try{
        ProductBL.DeleteSallerProducts(id).then(data =>
            {
                res.send(data);
            });
    }
    catch
    {
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
});


router.route('/deleteimage/:id').put((req,res)=>
{
    try{
        let id = req.params.id;
        let imageToDelete = req.body.Image;
        ProductBL.DeleteImage(id,imageToDelete).then(data =>
            {
                res.status(200).send(data);
            })
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
})

router.route('/addimage/:id').put(uplodaMiddleware.single('ProductImage'),(req,res)=>
{
    try{
        let id = req.params.id;
        let image = req.file.path;
        ProductBL.AddImage(id,image).then(data =>
            {
                res.status(200).send(data);
            })
    }
    catch{
        res.status(401).send({message:"Sory Something went wrong during the process"})
    }
})

// router.route('/updateimages/:id').put(uplodaMiddleware.array("ProductImage"),(req,res)=>{

//     try{
//         let id = req.params.id;
//         let newImages = req.files.map(x => x.path);
//         let oldImages = [req.body.oldImages];
//         let deleteImages = [req.body.deleteImages];
//         let updateImages = oldImages.concat(newImages);
//         // ProductBL.UpdateProductsImages(id,updateImages,deleteImages).then(data =>
//         //     {
//         //         res.send(data);
//         //     });
//     }
//     catch{
//         res.status(401).send({message:"Sory Something went wrong during the process"})
//     }
// });

module.exports = router;


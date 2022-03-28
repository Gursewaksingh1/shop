const express = require('express');
const axios = require('axios');
const session = require('express-session');
const conn = require('../connection');
const router = express.Router();
router.get('/',(req, res) => {
   if(session.admin_email !== undefined) {
      res.render('admin/adminHome')
   
     } else{
        res.redirect('/admin/admin-login')
     }
});

router.get('/admin-login',(req, res) => {
   res.render('admin/adminLogin')
});

router.post('/admin-login',(req, res) => {
   //console.log(req.body)
   const email = req.body.email;
   const password = req.body.password
   sql = 'SELECT *FROM admin where email="'+email+'" AND password="'+password+'"';
   conn.query(sql,(err,data) => {
      if(err) throw err;
      console.log(data)
      if(data.length >0){
         //console.log(data[0].email)
         session.admin_email = data[0].email;
         res.send('success')
      } else {
         res.send('invalid email or password');
      }
   })
});

router.get('/admin-logout',(req, res) => {
   session.admin_email = undefined;
   res.redirect('/admin/admin-login')
});
router.get('/admin-change-password',(req, res) => {
  if(session.admin_email !== undefined) {
   res.render('admin/changePassword')

  } else{
     res.redirect('/admin/admin-login')
  }
});

router.post('/admin-change-password',(req, res) => {
   console.log(req.body)
   const oldpassword = req.body.oldPassword
   const newpassword = req.body.newpassword
console.log(session.admin_email)
// sql = 'SELECT *FROM admin where email="'+email+'" AND password="'+password+'"';

   sql = 'SELECT *FROM  admin WHERE email ="'+session.admin_email+'" AND password="'+oldpassword+'"';
   conn.query(sql, (err,data) => {
      if(err) throw err;
      if(data.length>0) {
         console.log(data);
         // sqlUpdate = 'UPADTE admin SET password="'+newpassword+'" WHERE email="'+session.admin_email+'"';
         // conn.query(sqlUpdate,(error) => {
         //    if(error) throw error
         //    res.send('password updated')
         // })
      }
   })
});

router.get('/manage-product',(req, res) => {
   if(session.admin_email !== undefined) {
      res.render('admin/manageproduct',{
         productid: ''
      })
   } else{
      res.redirect('/admin/admin-login')
   }
   
 });

 router.get('/get-category',(req, res) => {
   const sql = "SELECT *FROM category"
   conn.query(sql, (err, data) => {
      if(err) throw err;
     // console.log(data)
      res.send(data)
   });
});

router.get('/get-subcategory',(req, res) => {
   const category = req.query.category;
   const sql = 'SELECT *FROM subcategory WHERE categoryName="'+category+'"';
   conn.query(sql, (err, data) => {
      if(err) throw err;
     // console.log(data)
      res.send(data)
   });
});

router.post('/add-product',(req, res) => {
   //sconsole.log(req.body)
   let {category,subcategory,productname,productprice,discount} = req.body;
   let file = req.files.photo
   const databasePath = 'images/'+file.name;
   const serverPath ='public/images/'+file.name;
   file.mv(serverPath,(err) => {
      if(err) throw err;
   })

   let sql = "INSERT INTO `product`(`id`, `productname`, `productprice`, `discount`, `productPhoto`, `subcategoryid`)"+
   " VALUES(null,'"+productname+"','"+productprice+"','"+discount+"','"+databasePath+"','"+1+"')";
   conn.query(sql,(err) => {
      if(err) throw err;
      res.send('added')
   })
});

router.get('/get-product', (req, res) => {   
   let sql = 'SELECT *FROM product';
   conn.query(sql,(err,data) => {
      if(err) throw err;
      //console.log(data)
      res.send(data);
   })
})
router.post('/delete-product', (req, res) => {   
   //console.log(req.body)
   sql = 'DELETE FROM product WHERE id = "'+req.body.id+'"';
   conn.query(sql,(err) => {
      if(err) throw err;
      res.send('record deleted')
   })
})

router.post('/update-product', (req, res) => {   
   //console.log(req.body)
   sql = 'SELECT * FROM product WHERE id ="'+req.body.id+'"';
   conn.query(sql,(err, data) => {
      if(err) throw err;
      console.log(data)
      res.send(data);
   })
   

})

router.post('/update-product1', (req, res) => {     
console.log(req.body)
let productid = req.body.productId;
let productname = req.body.productname;
let productprice = req.body.productprice;
let discount = req.body.discount;
let sql;
if(req.files === null) {
    sql = "UPDATE `product` SET `productname`='" + productname + "',`productprice`='" + productprice + "',`discount`='" + discount + "' WHERE `id`='" + productid + "'"
//   sql = 'UPDATE `product` SET `productname`="'+productname+'",`productprice`="'+productprice+'",`discount`="'+discount+'", WHERE id="'+productid+'"';   
} else {
let photo = req.files.productphoto;
   let databasePath = '/images'+productphoto.name;
   let serverPath = '/public/images/'+productphotophoto.name;
   photo.mv(serverPath,(err) => {
      if(err) throw err;
   })
   sql = 'UPDATE product SET `productname`='+productname+',`productprice`='+productprice+',`discount`='+discount+',`productPhoto`='+databasePath+' WHERE id="'+productid+'"';

}
console.log('sssssssssssss')
   conn.query(sql,(err) => {
      if(
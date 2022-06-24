const router = require('express').Router();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



router.get('/categories', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: { products:true}//includes the category of product in the response
    })
    res.json(categories)
  }
  catch(error) {
    next(error)
  }
  
});

router.get('/category/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await prisma. category.findUnique({
      where: {
        id:Number(id)
      },include: { products:true}
    })
    res.json(category)
  } catch (error) {
    next(error)
  }
});

router.post('/categories', async (req, res, next) => {
  //validate user input?? is user admin?
  try {
    const category = await prisma.category.create({
      // data:req.body, or 
      data: {
        name: req.body.name,
      },
    })
    res.json(category) 
  } catch (error) {
    next(error)
  }
});


router.delete('/category/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedCategory = await prisma.category.delete({
      where: {
        id:Number(id)
      }
    })
    res.json(deletedCategory)
  } catch (error) {
    next(error)
  }
});

router.patch('/category/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedCategory = await prisma.category.update({
      where: {
        id:Number(id)
      }, data: req.body,
    })
    res.json(updatedCategory)
  } catch (error) {
    next(error)
  }
});

module.exports = router;

import Category from './../schema/Category'

export default(req, res) => {
  Category
  .find({})
  .then((category) => {
    if(!category || !category.length){
      return res.status(404).json({
        status: false,
        data: []
      })
    }
    return res.status(200).json({
      status: true,
      data: category
    })
  })
  .catch(error => res.status(500).json({
    status: false,
    data: []
  }))
}
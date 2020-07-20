(function ($) {
  console.clear()

  $(document).ready(function () {

    const listData = function () {
      $.get('http://localhost:3000/bills/', function (result) {
        console.log(result)
        $('#list_table tbody').empty()
        if (!result.data.length && !result.status) {
          return
        }
        result.data.forEach(function (bill) {
          let tmpl =
            '<tr>' +
            '<td>' + bill.title + '</td>' +
            '<td>' + bill.price + '</td>' +
            '<td> <a href="http://localhost:3000/address/'+ bill.cep + '" target="_blank">' + bill.cep + '</a></td>' +
            '<td><button type="button" id="btn_delete" class="btn btn-danger btn-small" data-id='+ bill._id +'>Delete</button></td>' +
            '</tr>'
          $('#list_table tbody').append(tmpl)
        })

      })
    }

    const populateCategory = function(){
      $('#select_category').empty()
      $.get('http://localhost:3000/categories/', function(result){
        if (!result.data.length && !result.status) {
          return
        }
        result.data.forEach(function (category) {
          let tmpl =
            '<option value="'+ category._id +'">' + category.name + '</option>'
          $('#select_category').append(tmpl)
        })
      })
    }
    
    const createData = function () {
      let title = $('input[name="title"]').val()
      let price = $('input[name="price"]').val()
      let category = $('#select_category').val()
      let cep = $('input[name="cep"]').val()

      if (!title || !price || !category) {
        console.log('Invalid body')
      }
      $.post('http://localhost:3000/bills/', {
        title: title,
        price: price,
        category: category,
        cep: cep
      }, function(result){
        $('input[name="title"]').val('')
        $('input[name="price"]').val('')
        $('#select_category').val('')
        $('input[name="cep"]').val('')
        listData()
      })
    }

    const createDataCat = function () {
      let name = $('input[name="name"]').val()
      if (!name) {
        console.log('Invalid body')
      }
      $.post('http://localhost:3000/categories/', {
        name: name
      }, function(result){
        $('input[name="name"]').val('')
        populateCategory()
      })
    }

    const removeData = function(){
      let id = $(this).data('id')
      $.ajax({
        url: `http://localhost:3000/bills/${id}`,
        type: `DELETE`,
        success: function(result){
          listData()
        }
      })
    }

    listData()
    populateCategory()
    $('#btn_create').on('click', createData)
    $('#btn_create_cat').on('click', createDataCat)
    $('#list_table tbody').on('click', '#btn_delete', removeData)
  })

})(jQuery)
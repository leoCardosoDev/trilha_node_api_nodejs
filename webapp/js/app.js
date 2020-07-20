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
            '<td></td>' +
            '<td><button type="button" id="btn_delete" class="btn btn-danger btn-small" data-id='+ bill._id +'>Delete</button></td>' +
            '</tr>'
          $('#list_table tbody').append(tmpl)
        })

      })
    }
    
    const createData = function () {
      let title = $('input[name="title"]').val()
      let price = $('input[name="price"]').val()

      if (!title || !price) {
        console.log('Invalid body')
      }
      $.post('http://localhost:3000/bills/', {
        title: title,
        price: price
      }, function(result){
        $('input[name="title"]').val('')
        $('input[name="price"]').val('')
        listData()
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
    $('#btn_create').on('click', createData)
    $('#list_table tbody').on('click', '#btn_delete', removeData)
  })

})(jQuery)
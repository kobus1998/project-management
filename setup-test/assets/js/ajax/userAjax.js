var authPromises = {

  register: function(data) {
    return $.ajax({
      url: 'users/create',
      method: 'POST',
      data: data
    })
  },

  login: function(data) {
    return $.ajax({
      url: 'users/login',
      method: 'POST',
      data: data
    })
  }
}

$('').on('submit', function(e) {
  var data = $(this).serializeArray()
  var registerPromise = authPromises.register(data)

  registerPromise.done(function(result) {
    console.log(result)
  })

  registerPromise.fail(function(x, result) {
    console.log(result)
  })

  e.preventDefault()
})

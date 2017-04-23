$('#toggle-settings-tab').on("click", function() {
  $('.tab-content').removeClass('tab-content-active')
  $('#settings-tab').addClass('tab-content-active')
})

$('#toggle-roles-tab').on("click", function() {
  $('.tab-content').removeClass('tab-content-active')
  $('#roles-tab').addClass('tab-content-active')
})

$('#toggle-overview-tab').on("click", function() {
  $('.tab-content').removeClass('tab-content-active')
  $('#overview-tab').addClass('tab-content-active')
})

$('#toggle-software-tab').on("click", function() {
  $('.tab-content').removeClass('tab-content-active')
  $('#software-tab').addClass('tab-content-active')
})

$('#toggle-todo-tab').on("click", function() {
  $('.tab-content').removeClass('tab-content-active')
  $('#todo-tab').addClass('tab-content-active')
})

$('#toggle-users-tab').on("click", function() {
  $('.tab-content').removeClass('tab-content-active')
  $('#users-tab').addClass('tab-content-active')
})

$('#toggle-settings-tab').on("click", function() {
  $('.tab-content').removeClass('tab-content-active')
  $('#settings-tab').addClass('tab-content-active')
})

$('#toggle-new-software').on('click', function() {
  $('.settings-content').removeClass('settings-content-active')
  $('#new-software').addClass('settings-content-active')
})

$('#toggle-new-todos').on('click', function() {
  $('.settings-content').removeClass('settings-content-active')
  $('#new-todos').addClass('settings-content-active')
})

$('#toggle-invite-users').on('click', function() {
  $('.settings-content').removeClass('settings-content-active')
  $('#invite-users').addClass('settings-content-active')
})

$('#toggle-project-settings').on('click', function() {
  $('.settings-content').removeClass('settings-content-active')
  $('#project-settings').addClass('settings-content-active')
})

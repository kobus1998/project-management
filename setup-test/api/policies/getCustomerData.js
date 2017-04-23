module.exports = (req, res, next) => {
  Customers.getCustomerData(req.params.customerId, (err, result) => {
    req.customerData = result
    next()
  })
}

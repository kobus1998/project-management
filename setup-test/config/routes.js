/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // Greeting pages

  'POST /user/upload': 'Users.uploadAvatar',

  'GET /test': 'Pages.tester',

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  // AUTH
  // login page
  'GET /login': 'UnguardedPagesController.loginPage',
  // register page
  'GET /register': 'UnguardedPagesController.registerPage',
  // register function
  'POST /auth/register': 'AuthController.register',
  // login function
  'POST /auth/login': 'AuthController.login',
  // logout function
  'POST /auth/logout' : 'AuthController.logout',

  // USERS
  // dashboard page
  'GET /dashboard': 'UsersController.dashboardPage',
  // user settings page
  'GET /dashboard/settings': 'UsersController.userSettingsPage',
  // company create page
  'GET /company/create': 'UsersController.createCompanyPage',
  // company list page
  'GET /company/list': 'UsersController.companyListPage',
  // search company page
  'GET /company/search': 'UsersController.companySearchPage',
  // project list page
  'GET /user/projects': 'UsersController.projectsListPage',
  // seaarch projects
  'GET /user/searchproject': 'UsersController.searchProjectsPage',

  // user update function
  'POST /users/update/:userId': 'UsersController.updateUser',
  // user delete function
  'DELETE /users/delete/:userId' : 'UsersController.deleteUser',
  // user reminders create function
  'POST /users/reminders/create' : 'UsersController.createReminder',
  // user reminder delete function
  'POST /users/reminders/delete/:reminderId' : 'UsersController.deleteReminder',

  // companies
  // company view page
  'GET /company/view/:companyId': 'CompaniesController.companyPage',
  // company settings page
  'GET /company/settings/:companyId': 'CompaniesController.companySettingsPage',
  // customer create page
  'GET /customer/create/:companyId': 'CompaniesController.customerCreatePage',
  // company invite user page
  'GET /company/invite/:companyId': 'CompaniesController.inviteMemberPage',
  // search company customers page
  'GET /company/:companyId/customerssearch': 'CompaniesController.searchCustomersPage',
  // project list page
  'GET /company/:companyId/projectlist': 'CompaniesController.projectListPage',
  // search project page
  'GET /company/:companyId/projectsearch': 'CompaniesController.projectSearchPage',
  // company member page
  'GET /company/:companyId/members': 'CompaniesController.membersPage',
  // company search member page
  'GET /company/:companyId/searchmembers': 'CompaniesController.searchMembers',

  // company member role update function
  'POST /companies/updaterole/:companyId/:userId': 'CompaniesController.updateCompanyRole',
  // add user to company function
  'POST /companies/adduser/:companyId/:userId' : 'CompaniesController.addUserToCompany',
  // remove user from company function
  'POST /companies/removeuser/:companyId/:userId': 'CompaniesController.removeUserFromCompany',
  // create company function
  'POST /companies/create/:userId' : 'CompaniesController.createCompany',
  // update company function
  'POST /companies/update/:companyId' : 'CompaniesController.updateCompany',

  // Customers
  // view customer page
  'GET /customer/view/:companyId/:customerId': 'CustomersController.customerViewPage',
  // view list customers page
  'GET /company/customer/:companyId': 'CustomersController.customerCompanyListPage',

  // create customer function
  'POST /customers/create/:companyId' : 'CustomersController.createCustomer',
  // update customer function
  'POST /customers/update/:customerId' : 'CustomersController.updateCustomer',
  // delete customer function
  'DELETE /customers/delete/:customerId' : 'CustomersController.deleteCustomer',

  // Projects
  // create project page
  'GET /project/create/:companyId': 'ProjectsController.createProjectPage',
  // view project page
  'GET /project/view/:companyId/:customerId/:projectId': 'ProjectsController.viewProjectPage',
  // project settings page
  'GET /project/settings/:companyId/:customerId/:projectId': 'ProjectsController.settingsProjectPage',

  // create project function
  'POST /projects/create' : 'ProjectsController.createProject',
  // update project function
  'POST /projects/update/:projectId' : 'ProjectsController.updateProject',
  // delete project function
  'DELETE /projects/delete/:projectId' : 'ProjectsController.deleteProject',
  // add user to project function
  'POST /projects/adduser/:projectId/:userId' : 'ProjectsController.addUserToProject',

  // create software project function
  'POST /projects/software/create/:projectId': 'ProjectsController.createSoftware',
  // delete software project function
  'POST /projects/software/delete/:projectId/:softwareId': 'ProjectsController.deleteSoftware',

  // create todo project function
  'POST /projects/todos/create/:projectId': 'ProjectsController.createTodo',
  // change state todo project function
  'POST /projects/todos/changeSate/:projectId/:todoId': 'ProjectsController.changeStateTodo',
  // delete todo project function
  'POST /projects/todos/delete/:projectId/:todoId': 'ProjectsController.deleteTodo',

};

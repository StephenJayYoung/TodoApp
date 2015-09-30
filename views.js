var GUI = (function(){ //IIFE for all Views

var IssueView = Backbone.View.extend({
  // render: function () {
		// var title = this.model.get("title");
		// var description = this.model.get("description");
		// var creator = this.model.get("creator");
		// var assignee = this.model.get("assignee");
		// var status = this.model.get("status");
  //       this.$el.html("<div>Task:<br>" + title + " " + description + "</div>");
  //   },
});

var CreateTaskView = Backbone.View.extend({

    render: function(){
      // var $form = $('<form>');
      var $title = $('<input type="text" name="Task" id="title">');
      var $submit = $('<button id="submit">Submit</button>');
      $form.append([$title, $submit] );
      this.$el.html($form);
    },



});

var UnassignedTasksView = Backbone.View.extend({
	// render: function () {
	// 	var issues = this.collection;
	// 	var self = this;
	// 	issues.forEach(function(issue){
	// 		var issueView = new IssueView({model: issue});
	// 		issueView.render();
	// 		self.$el.append(issueView.$el);
	// 	});
	// }
});

var UserTasksView = Backbone.View.extend({

});

var UserView = Backbone.View.extend({
	events: {
		'click #logoutButton' : 'logOutUser',
		'click #addTaskButton': 'addTask'
	},

//Added this functionlity to allow for logging out the user. This calls 
//the GUI function (at the bottom), and switches to the Login View
	logOutUser: function() {
		 $('#app').html('');
  		app.gui.switchToLogin();
	},


	addTask:function() {

		//this is going to have to take us to the TaskView, and it should
		// maintain the UserView
      var addTask = new CreateTaskView();
      addTask.render();
      this.$el.append(addTask.$el);
	},

	// initialize: function() {
	// 	console.log(this.collection);
	// 	console.log(this.collection.findWhere({status: 'unassigned'}));
	// 	console.log('hello');
	// 	this.render();
	// },

	render: function() {
		var taskSelf = this;
		var logoutButton = '<button id ="logoutButton">Logout</button>';
		var addTaskButton= '<button id="addTaskButton">Add Task</button>';
		var form = '<input type="text" id="typedName" value=" Add a Task!  " />'
		taskSelf.$el.html(form + addTaskButton + logoutButton);
		$("#app").append(this.$el);
	}

});

var LoginView = Backbone.View.extend ({
	
	events : {
		'click #nameButton': 'goLoginFunction'

	},

	goLoginFunction: function() {
		// console.log(($('#typedName').val()));
		var certainUserName = ($('#typedName').val());
		var userValid = this.collection.findWhere({username: certainUserName});
		var certainUserPassword = ($('#typedPassword').val());

		if(userValid.attributes.password == certainUserPassword) {
			console.log("Success");
			this.remove();
			var userView = new UserView({collection: app.issues});
			userView.render();
			}
		else {
			alert("Nope");
		}	


	},
	initialize: function() {
		//This is just to see processes-- doesn't actually move project forward//
		// console.log(this.collection);
		// console.log(this.collection.findWhere({username:'Person1'}));
		// var username=this.collection.findWhere({username:'Person1'});
		// console.log(username.attributes.password);
		// console.log($(this.el));
	},
	render: function () {
		var userSelf = this;
		
		// var username = this.collection.findWhere({username:'Person1'}).attributes.username;
		var inputUsername = '<input type="text" id="typedName" value=" input username  " />'
		console.log($('#typedName'));
		var inputPassword = '<input type="text" id="typedPassword" value=" input password " />'
		var userButton = '<button id ="nameButton">Enter</button>';
		userSelf.$el.html("<br><div id ='loginArea'><div>Login:<br>" + inputUsername + "</div>" +
			 "<div>Password:<br>" + inputPassword + "</div>" + userButton + "</div>")
	},



});


// generic ctor to represent interface:

function GUI(users,issues,el) {
// 	var unAssignedTasks = new UnassignedTasksView({collection: issues});
// 	unAssignedTasks.render();
// 	$(el).append(unAssignedTasks.$el);

	var login = new LoginView({collection: users});
	login.render();
	$(el).append(login.$el);

	 this.switchToLogin = function() {
	 var login = new LoginView();
	 login.render();
	 $("#app").append(login.$el);
 };



//commented this out, as it renders this view before it is necessary.
	// var userPage = new UserView({collection: issues});
	// $(el).append(userPage.$el); 
};

return GUI;
}())

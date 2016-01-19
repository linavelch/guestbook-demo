Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
    Meteor.subscribe("messages");

    Session.setDefault('counter', 0);

  Template.guestBook.helpers({
    'messages':function() {
      return Messages.find({}, {sort: {createdOn: -1 }}) || {};
    },
    'formatDate':function(date) {
      return moment(date).format('MM-DD-YYYY');
    },
    'counter': function () {
      return Session.get('counter');
    }
  });

  Template.guestBook.events({
    'submit form':function(event) {
     event.preventDefault();

      var messageBox = $(event.target).find('textarea[name=guestBookMessage]');
      var messageText = messageBox.val();

      var nameBox = $(event.target).find('input[name=guestName]');
      var name = nameBox.val();

      Messages.insert({message: messageText, name: name, createdOn: Date.now() });

      messageBox.val('');
      nameBox.val('');

      //'click.button': function (){
      //Session.set('counter', Session.get('counter') + 1);

    //"click.delete":function() {
      //event.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
      // code to run on server at startup
    });
    Meteor.publish("messages", function () {
      return Messages.find();
    });
}

(function()
{
var app=angular.module('myNotes', ['ionic','mynotes.notestore']);

app.config(function($stateProvider,$urlRouterProvider)
{
     $stateProvider.state('list',
     {
      url:'/list',
      templateUrl:'templates/list.html'
     });

     $stateProvider.state('edit',{
       url:'/edit/:noteId',
       templateUrl:'templates/edit.html',
       controller:'EditCtrl'

     });
     $stateProvider.state('add',{
      url:'/add',
      templateUrl:'templates/edit.html',
      controller:'AddCtrl'
     });

     $urlRouterProvider.otherwise('/list');
    
});

  
 
    /* {
      id:'1',
      title:"First Note",
      desc:"This is my first note"
      },
      {
        id:'2',
        title:"Second Note",
        desc:"This is my second note"
      }
  ];*/
app.controller('ListCtrl',function($scope,NoteStore)
{
  $scope.notes=NoteStore.list();

})
/*function getNote(noteId)
{
  for(var i=0;i<notes.length;i++)
  {
    if(notes[i].id==noteId)
      return notes[i];
  }
  return undefined;
}
function updateNote(note)
{
  for(var i=0;i<notes.length;i++)
  {
    if(notes[i].id==note.id)
    {
      notes[i]=note;
      return
    }
  }
}
function createNote(note)
{
  notes.push(note);
}*/
app.controller('AddCtrl',function($scope,$state,NoteStore)
{
  $scope.note={
    id: new Date().getTime().toString(),
    title: '',
    desc: ''
  }
   $scope.save=function()
  {
    NoteStore.create($scope.note);
    $state.go('list');

  };

});




app.controller('EditCtrl',function($scope,$state,NoteStore)
{
  $scope.note=angular.copy(NoteStore.get($state.params.noteId));
  $scope.save=function()
  {
    NoteStore.update($scope.note);
    $state.go('list');

  };

});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());
var firebaseConfig = {
    apiKey: "AIzaSyBsWtFgEr5L2n-k5S7NyjHuMV1nsRP87Z0",
    authDomain: "todolist-1c6c4.firebaseapp.com",
    databaseURL: "https://todolist-1c6c4.firebaseio.com",
    projectId: "todolist-1c6c4",
    storageBucket: "todolist-1c6c4.appspot.com",
    messagingSenderId: "216871147365",
    appId: "1:216871147365:web:3398965e6a7858fff1b38c",
    measurementId: "G-QLFVPGTPVH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function add_tarefa(){
      input = document.querySelector(".mdl-textfield__input")

      if(input.value.length != 0){
          var key = firebase.database().ref().child("unfinished_task").push().key
          var task = {
              title: input.value,
              key: key
          }
          var updates = {}
          updates["/unfinished_tasks/" + key] = task;
          firebase.database().ref().update(updates)
          create_unfinished_task()
      }
  }

  function create_unfinished_task(){
    unfinished_task_container = document.getElementsByClassName("list")[0]
    unfinished_task_container.innerHTML = ""
    task_array = []
    firebase.database().ref("unfinished_tasks").once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key
            var childData = childSnapshot.val()
            task_array.push(Object.values(childData))
        })
        for(var i, i = 0; i < task_array.length; i++){
          task_key = task_array[i][0]
          task_title = task_array[i][1]

          task_container = document.createElement('div')
          task_container.setAttribute('class', 'task_container')
          task_container.setAttribute('data-key', task_key)

          task_data = document.createElement('div')
          task_data.setAttribute('id', 'task_data')

          title = document.createElement('div')
          title.setAttribute('id', 'title')
          title.setAttribute('contenteditable', false)
          title.innerHTML = task_title

          task_tool = document.createElement('div')
          task_tool.setAttribute('id', 'task_tool')

          task_button_delete = document.createElement('button')
          task_button_delete.setAttribute('id', 'task_button_delete')
          task_button_delete.setAttribute('onclick', 'delete_tarefa(this.parentElement.parentElement)')
          fa_delete = document.createElement('span')
          fa_delete.setAttribute('class', 'material-icons')
          fa_delete.innerHTML = 'delete'

          unfinished_task_container.append(task_container)
          task_container.append(task_title)
          task_container.append(task_tool)
          task_tool.append(task_button_delete)
          task_button_delete.append(fa_delete)
        }
    })
  }

  function delete_tarefa(task){
    key = task.getAttribute("data-key")
    task_to_remove = firebase.database().ref("unfinished_tasks/" + key)
    task_to_remove.remove()


    task.remove()
}
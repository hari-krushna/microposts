import { http } from './http';
import { ui } from './ui';

// Event listner for get posts
document.addEventListener('DOMContentLoaded', getPosts);

// Add post event listener
document.querySelector('.post-submit').addEventListener('click', postSubmit);

// listen for delete event
document.querySelector('#posts').addEventListener('click', deletePost);

// listen for enable state
document.querySelector('#posts').addEventListener('click', enableEdit);

// listen for cancel button
document.querySelector('.card-form').addEventListener('click', cancelEditState)

function getPosts() {
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

// post submit
function postSubmit() {
    const id = document.querySelector('#id').value;
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const data = {
        title: title,
        body: body
    }

    if (title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    } else {
        if (id === '') {
            // Create post
            http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post added', 'alert alert-success');
                ui.clearFields();
                getPosts();
        })
        .catch(err => console.log(err));
        } else {
            // update post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post updated', 'alert alert-success');
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err));
        }
    
        
    }
   
}


// Delete post event
function deletePost(e) {
    e.preventDefault();

    if(e.target.parentElement.classList.contains('delete')){

        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data=>{
                    ui.showAlert('Post deleted', 'alert alert-danger');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err))
        } else {
            ui.changeFormState('add');
            getPosts();
        }
    }
}

// Enable eidt function
function enableEdit(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id : id,
            title : title,
            body : body
        }

        ui.fillForm(data);
    }
}

function cancelEditState(e) {
    e.preventDefault();
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
}
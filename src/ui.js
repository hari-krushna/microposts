class UI { 
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    showPosts(posts){
        let output = '';

        posts.forEach((post)=>{
            output += `
            <div class = "card mb-3">
                <div class = "card-body">
                    <div class = "card-title">${post.title}</div>
                    <p class = "card-text">${post.body}</p>
                    <a href="#" data-id=${post.id} class="edit card-link">
                    <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" data-id=${post.id} class="delete card-link">
                    <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `;
        });

        this.post.innerHTML = output;
    }

    showAlert(message, classNames){
        const div = document.createElement('div');
        div.className = classNames;
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector('.postsContainer');

        // Get posts div
        const posts = document.querySelector('#posts');

        // Insert alert div
        container.insertBefore(div, posts);

        // clear alert after 3 seconds
        setTimeout(()=>{
            this.clearAlert();
        }, 3000);

    }

    clearAlert(){
        // get current alert
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }
    
    clearIdInput(){
        this.idInput.value = '';
    }

    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // Change form state
    changeFormState(type){
        if (type === 'edit') {
            this.postSubmit.textContent = 'Update post';
            this.postSubmit.className = 'btn btn-warning btn-block post-submit';

            // Create cancel button
            const button = document.createElement('button');
            button.className = 'btn btn-secondary btn-block post-cancel';
            button.appendChild(document.createTextNode('Cancel edit'));

            // Get parent
            const cardForm = document.querySelector('.card-form');
            // Get the element to insert before
            const formEnd = document.querySelector('.form-end');
            // Insert button
            cardForm.insertBefore(button, formEnd);
            
        } else {
            this.postSubmit.textContent = 'Add post';
            this.postSubmit.className = 'btn btn-primary btn-block post-submit';

            // Remove cancel button
            const postCancel = document.querySelector('.post-cancel');
            if (postCancel) {
                postCancel.remove();
            }
            // Clear id hidden field
            this.clearIdInput();
            // Clear form fields
            this.clearFields();
        }
    }
}

export const ui = new UI();
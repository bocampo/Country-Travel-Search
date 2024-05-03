const deleteBtn = document.getElementById('del')
const deleted = document.getElementById('deleted')

deleted.innerHTML = ""

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/saved/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/saved')
            window.alert('Successfully deleted')

        } else {
            alert('Failed to delete country');
        }
    }
};


deleteBtn.addEventListener('click', delButtonHandler)


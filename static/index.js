const togglers = ['close_modal', 'add']
const addModal = document.querySelector('.add_modal')
togglers.forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        addModal.classList.toggle('add_modal_visible')
    })
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.add_modal_form').addEventListener('submit', (e) => {
        handleAddFormSubmit(e)
    })
})

function handleAddFormSubmit(e) {
    e.preventDefault()
    const form = e.target
    const profile = {
        receiverId: form.receiverId.value,
        upiId: form.upiId.value,
        bankingName: form.bankingName.value,
        avatarChar: form.avatarChar.value,
        avatarColor: form.avatarColor.value,
    }
    addProfile(profile)
}

function loadProfiles() {
    if (!('profiles' in localStorage)) {
        localStorage.setItem('profiles', '[]')
        return []
    }
    return JSON.parse(localStorage.getItem('profiles'))
}

function addProfile({ receiverId, upiId, bankingName, avatarChar, avatarColor }) {
    let existing = loadProfiles()
    let profile = {
        id: Math.floor(Math.random() * 10000), // terrible way, but should work for now
        receiverId: receiverId,
        upiId: upiId,
        bankingName: bankingName,
        avatarChar: avatarChar,
        avatarColor: avatarColor
    }
    existing.push(profile)
    localStorage.setItem('profiles', JSON.stringify(existing))
    return profile.id
}

function deleteProfile(id) {
    let existing = loadProfiles()
    existing = existing.filter((elem) => {
        return elem.id != id
    })
    localStorage.setItem('profiles', JSON.stringify(existing))
}
function payProfile(id) {
    let existing = loadProfiles()
    existing = existing.filter((elem) => {
        return elem.id == id
    })
    if (!existing) {
        return
    }
    let profile = existing[0]
    const redirectTo = `/scan?receiverId=${profile.receiverId}&upiId=${profile.upiId}&bankingName=${profile.bankingName}&avatarChar=${profile.avatarChar}&avatarColor=${profile.avatarColor}`
    window.location.href = redirectTo
}

function mountUI(container) {
    let profiles = loadProfiles()
    profiles.forEach(profile => {
        const profileDiv = document.createElement('div')
        profileDiv.setAttribute('class', 'profile')
        profileDiv.addEventListener('click', () => {
            payProfile(profile.id)
        })
        profileDiv.innerHTML = `
            <div class="avatar" style="background-color: purple;"></div>
            <div class="receiver"></div>
        `
        const avatarChar = profileDiv.querySelector('.avatar')
        avatarChar.style.backgroundColor = profile.avatarColor
        const receiver = profileDiv.querySelector('.receiver')
        avatarChar.innerHTML = profile.avatarChar
        receiver.innerHTML = profile.receiverId
        container.appendChild(profileDiv)
    })
}

mountUI(document.getElementById('profiles'))


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    if ('serviceWorker' in navigator) {
        console.log('CLIENT: service worker registration in progress.');
        navigator.serviceWorker.register('../sw.js', {
            scope: '.'
        })
            .then(function(registration) {
                console.log('Service Worker Registered');
            })
            .catch(function(err) {
                console.log('Service Worker Failed', err);
            });
    } else {
        console.log('CLIENT: service worker is not supported.');
    }
});
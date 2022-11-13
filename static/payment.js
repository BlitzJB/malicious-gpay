
const iconBar = document.querySelector('.iconbar')
const paymentDetails = document.querySelector('.payment__details')
const chooseBank = document.querySelector('.choose')
const paying = document.querySelector('.paying')
const paid = document.querySelector('.paid__container')

const video = paid.querySelector('video')
const payButton = chooseBank.querySelector('button')
const amtInput = document.querySelector('#amt')
const amtDiv = document.querySelector('.paid__amt')
const paymentDate = document.querySelector('.paymentdate');

function getUrlParams() {
    let url = window.location.href
    url = url.split('?')[1].split('&')
    url = url.map((e) => {return e.split('=')})
    return url
}

const receiverIdPaid = document.querySelector('.receiver_id')
const upiIdPaid = document.querySelector('.upiid_paid')
const payingId = document.getElementById('receiverSpan')
const payingUpiId = document.getElementById('upiidSpan')
const bankingName = document.getElementById('bankingnameSpan')
const bankingNameDiv = document.querySelector('.bankingname')
const avatar = document.querySelector('.avatar')
const gotIt = document.querySelector('.gotit')

bankingNameDiv.style.display = 'none'

function mountData() {
    console.log(getUrlParams())
    getUrlParams().forEach(([key, val]) => {
        if (key == 'receiverId' && val != 'undefined') {
            receiverIdPaid.innerHTML = val
            payingId.innerHTML = val
        } else if (key == 'upiId' && val != 'undefined') {
            upiIdPaid.innerHTML = val
            payingUpiId.innerHTML = val
        } else if (key == 'bankingName' && val != 'undefined') {
            bankingNameDiv.style.display = 'block'
            bankingName.innerHTML = val.replace('%20', ' ')
        } else if (key == 'avatarChar' && val != 'undefined') {
            avatar.innerHTML = val
        } else if (key == 'avatarColor' && val != 'undefined') {
            avatar.style.backgroundColor = `${val}`
        }
    })
}

gotIt.addEventListener('click', () => {
    window.location.href = '/'
})

document.addEventListener('DOMContentLoaded', () => {
    mountData()
    if ('Notification' in window) {
        Notification.requestPermission()
        console.log('perms received')
    } else {
        console.log('unsupported')
    }
    
    video.pause()
    paying.style.display = 'none'
    paid.style.display = 'none'
})

function triggerPaying() {
    chooseBank.style.display = 'none'
    paying.style.display = 'flex'

    setTimeout(() => {triggerPaid(amtInput.value)}, 3000)
}

payButton.addEventListener('click', triggerPaying)

function triggerPaid(amt) {
    paying.style.display = 'none'
    paymentDetails.style.display = 'none'
    iconBar.style.display = 'none'
    paid.style.display = 'flex'
    amtDiv.innerHTML = `₹${amt}`
    const today = new Date()
    const options1 = {
        month: 'long',
        day: 'numeric'
    } 
    
    const options2 = {
        timeStyle: 'short'
    }
    paymentDate.innerHTML = `${today.toLocaleDateString('en', options1)}, ${today.toLocaleTimeString('en', options2)}`
    video.play()
    new Notification(
        "SBI UPI",
        {
            body: `Dear SBI User, yor A/c X3367-debited by Rs${amt} now transferred via UPI. If not done by you, fwd this SMS to 9223008000/Call 1810181918 to block UPI-SBI`,
        }
    )
}
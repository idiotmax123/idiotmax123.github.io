function UpdatePhoneNumber() {
    let n1 = document.querySelector('input[name="option1"]:checked').value;
    let n2 = document.querySelector('input[name="option2"]:checked').value;
    let n3 = document.querySelector('input[name="option3"]:checked').value;

    let n4 = document.querySelector('input[name="option4"]:checked').value;
    let n5 = document.querySelector('input[name="option5"]:checked').value;
    let n6 = document.querySelector('input[name="option6"]:checked').value;

    let n7 = document.querySelector('input[name="option7"]:checked').value;
    let n8 = document.querySelector('input[name="option8"]:checked').value;
    let n9 = document.querySelector('input[name="option9"]:checked').value;

    let n10 = document.querySelector('input[name="option10"]:checked').value;
    let n11 = document.querySelector('input[name="option11"]:checked').value;
    let n12 = document.querySelector('input[name="option12"]:checked').value;

    document.getElementById('phonenumber').innerHTML = "(+" + n1 + n2 + n3 + ") " + n4 + n5 + n6 + " " + n7 + n8 + n9 + " " + n10 + n11 + n12;
}

document.querySelectorAll('input').forEach(el => {
    el.addEventListener('change', function() {
        UpdatePhoneNumber();
    })
});
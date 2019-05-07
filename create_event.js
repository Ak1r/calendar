// remove modal

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('eventModal');
var head = document.getElementById("header");
var body_parag = document.getElementById("paragraphs");	
var body_text = document.getElementById("body");
var body_header_2 = document.getElementById("body_header2");
var modal_header = document.getElementById("modal_header");
var modal_footer = document.getElementById("modal_footer");
span.onclick = function() {
  modal.style.height = "0";
  modal.removeAttribute("style");
  head.innerHTML = "";
  body_parag.innerHTML = "";
  body_text.innerHTML = "";
  body_header_2.innerHTML = "";
  body_parag.className = '';
  modal_header.className = 'modal-header';
  modal_footer.className = 'modal-footer';
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.height = "0";
    modal.removeAttribute("style");
    head.innerHTML = "";
    body_parag.innerHTML = "";
    body_text.innerHTML = "";
    body_header_2.innerHTML = "";
    body_parag.className = '';
    modal_header.className = 'modal-header';
    modal_footer.className = 'modal-footer';
  }
}


function addEvent(){

}

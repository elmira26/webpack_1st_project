//dropdown
export function dropDown(){ 
    function show() {
      document.getElementById('myDropdown').classList.toggle('show');
    }
    
    //close dropdown id the user cliks outside of it
    window.onclick = function(e){
    if(!e.target.matches('.dropbtn')){
        var myDropdown = document.getElementById('myDropdown');
        if(myDropdown.classList.contains('show')){
          myDropdown.classList.remove('show');
        }
      }
    }
  }

